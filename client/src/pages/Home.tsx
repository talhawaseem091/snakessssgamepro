import { useState } from "react";
import { GameBoard } from "@/components/GameBoard";
import { Leaderboard } from "@/components/Leaderboard";
import { ScoreModal } from "@/components/ScoreModal";

export default function Home() {
  const [gameActive, setGameActive] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGameOver = (score: number) => {
    setLastScore(score);
    if (score > 0) {
      setTimeout(() => setIsModalOpen(true), 500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative">
      {/* Scanline Overlay */}
      <div className="scanlines pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-primary/20 bg-black/50 backdrop-blur-sm p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
            <h1 className="text-xl md:text-2xl font-arcade text-primary neon-text tracking-widest">
              NEO_SNAKE_OS
            </h1>
          </div>
          <div className="font-mono text-xs md:text-sm text-muted-foreground hidden sm:block">
            V.1.0.4 // ONLINE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8 overflow-hidden">
        
        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <GameBoard 
            onGameOver={handleGameOver} 
            gameActive={gameActive}
            setGameActive={setGameActive}
          />
        </div>

        {/* Sidebar / Leaderboard */}
        <aside className="w-full lg:w-96 shrink-0 h-[400px] lg:h-auto border border-primary/20 bg-black/50 backdrop-blur-sm relative overflow-hidden flex flex-col shadow-lg">
          <Leaderboard />
          
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
        </aside>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-primary/20 p-4 bg-black text-center">
        <p className="font-mono text-xs text-muted-foreground uppercase">
          INSERT COIN TO PLAY • © 2024 RETRO SYSTEMS
        </p>
      </footer>

      {/* Modals */}
      <ScoreModal 
        score={lastScore} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
