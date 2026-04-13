#![cfg(test)]

//! Functional tests for the Chessellar contract.
//! These tests verify the game lifecycle and move submission.

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_create_and_join_game() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ChessellarContract);
    let client = ChessellarContractClient::new(&env, &contract_id);

    let player_white = Address::generate(&env);
    let player_black = Address::generate(&env);

    let wager = 1000;
    let game_id = client.create_game(&player_white, &wager);

    let game = client.get_game(&game_id);
    assert_eq!(game.player_white, player_white);
    assert_eq!(game.player_black, None);
    assert_eq!(game.wager, wager);
    assert_eq!(game.status, GameStatus::Open);

    client.join_game(&player_black, &game_id);

    let updated_game = client.get_game(&game_id);
    assert_eq!(updated_game.player_black, Some(player_black));
    assert_eq!(updated_game.status, GameStatus::InProgress);
}

#[test]
fn test_submit_move() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ChessellarContract);
    let client = ChessellarContractClient::new(&env, &contract_id);

    let player_white = Address::generate(&env);
    let player_black = Address::generate(&env);

    let game_id = client.create_game(&player_white, &0);
    client.join_game(&player_black, &game_id);

    let new_fen = String::from_str(&env, "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1");
    client.submit_move(&player_white, &game_id, &new_fen);

    let updated_game = client.get_game(&game_id);
    assert_eq!(updated_game.fen, new_fen);
}
