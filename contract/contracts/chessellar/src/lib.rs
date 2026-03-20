#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, String, Address};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum GameStatus {
    Open,
    InProgress,
    Finished,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Game {
    pub player_white: Address,
    pub player_black: Option<Address>,
    pub fen: String,
    pub wager: i128,
    pub status: GameStatus,
}

#[contract]
pub struct ChessellarContract;

#[contractimpl]
impl ChessellarContract {
    pub fn create_game(env: Env, creator: Address, wager: i128) -> u64 {
        creator.require_auth();
        
        let game_id = env.ledger().sequence() as u64;
        let initial_fen = String::from_str(&env, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        
        let game = Game {
            player_white: creator,
            player_black: None,
            fen: initial_fen,
            wager,
            status: GameStatus::Open,
        };

        env.storage().instance().set(&symbol_short!("game"), &game);
        game_id
    }

    pub fn join_game(env: Env, opponent: Address, game_id: u64) {
        opponent.require_auth();
        
        let mut game: Game = env.storage().instance().get(&symbol_short!("game")).unwrap();
        
        if game.status != GameStatus::Open {
            panic!("Game is not open");
        }

        game.player_black = Some(opponent);
        game.status = GameStatus::InProgress;
        
        env.storage().instance().set(&symbol_short!("game"), &game);
    }

    pub fn submit_move(env: Env, player: Address, game_id: u64, new_fen: String) {
        player.require_auth();
        
        let mut game: Game = env.storage().instance().get(&symbol_short!("game")).unwrap();
        
        if game.status != GameStatus::InProgress {
            panic!("Game is not in progress");
        }

        // In a real implementation, we would validate the move here
        // using a chess logic library compiled to WASM or by verifying evidence.
        game.fen = new_fen;
        
        env.storage().instance().set(&symbol_short!("game"), &game);
    }

    pub fn get_game(env: Env, game_id: u64) -> Game {
        env.storage().instance().get(&symbol_short!("game")).unwrap()
    }
}
