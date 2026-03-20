import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Trophy, Swords, Zap, Wallet, History, Settings } from 'lucide-react';

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: any) {
    try {
      const result = game.move(move);
      setGame(new Chess(game.fen()));
      return result;
    } catch (e) {
      return null;
    }
  }

  function onDrop({ sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) {
    if (!targetSquare) return false;
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });

    if (move === null) return false;
    return true;
  }

  return (
    <div className="w-full max-w-[600px] aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative group">
      <div className="absolute inset-0 bg-accent/5 pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />
      <Chessboard
        options={{
          position: game.fen(),
          onPieceDrop: onDrop,
          boardOrientation: 'white',
          darkSquareStyle: { backgroundColor: 'rgb(46, 48, 58)' },
          lightSquareStyle: { backgroundColor: 'rgba(255,255,255,0.05)' },
          boardStyle: {
            borderRadius: '4px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full opacity-30" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-500/10 blur-[100px] rounded-full opacity-20" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-accent blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Chessellar
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            <a href="#" className="hover:text-white transition-colors">Play</a>
            <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
            <a href="#" className="hover:text-white transition-colors">Challenges</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group active:scale-95 shadow-lg">
            <Wallet className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-semibold">Connect Wallet</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-12 gap-12">
        {/* Left Column: Game Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                  Onchain Grandmaster
                </h1>
                <p className="text-white/40 font-medium">Player vs Player • 0.5 XLM Wager</p>
              </div>
            </div>
            
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button className="px-4 py-2 bg-accent rounded-lg text-sm font-bold shadow-lg shadow-accent/20">Standard</button>
              <button className="px-4 py-2 hover:bg-white/5 rounded-lg text-sm font-bold transition-colors">Blitz</button>
            </div>
          </div>

          <ChessBoard />

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-colors group">
              <Zap className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Instant</h3>
              <p className="text-white/40 text-sm">Lightning fast transactions via Stellar</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
              <Trophy className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Secure</h3>
              <p className="text-white/40 text-sm">Funds escrowed in smart contracts</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
              <History className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-1">Transparent</h3>
              <p className="text-white/40 text-sm">Every move recorded on the ledger</p>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h2 className="text-xl font-bold">Game Stats</h2>
              <Settings className="w-5 h-5 text-white/30 hover:rotate-90 transition-transform cursor-pointer" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Opponent</span>
                <span className="font-mono text-sm">SP34...810X</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Stake</span>
                <span className="font-bold text-accent">100.00 XLM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm">Time Control</span>
                <span className="text-sm">10 min + 5s increment</span>
              </div>
            </div>

            <div className="bg-black/40 rounded-2xl p-4 font-mono text-xs text-white/40 h-48 overflow-y-auto custom-scrollbar">
              <div className="mb-2">1. e4 e5</div>
              <div className="mb-2">2. Nf3 Nc6</div>
              <div className="mb-2">3. Bb5 a6</div>
              <div className="mb-2 italic opacity-50">Waiting for white to move...</div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 active:scale-95 transition-all">
              Initiate Challenge
            </button>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-2">New to Chessellar?</h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Connect your Freighter wallet to start playing on the Stellar network. 
              Stake XLM and win against opponents worldwide.
            </p>
            <a href="#" className="text-accent text-sm font-bold hover:underline">Read the docs &rarr;</a>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/20 text-sm font-medium">
            &copy; 2026 Chessellar • Powered by Stellar Soroban
          </p>
        </div>
      </footer>
    </div>
  );
}
