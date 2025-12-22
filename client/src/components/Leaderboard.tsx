import { useScores } from "@/hooks/use-scores";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal } from "lucide-react";

export function Leaderboard() {
  const { data: scores, isLoading, error } = useScores();

  // Sort scores locally just in case, though backend might handle it
  const sortedScores = scores?.sort((a, b) => b.score - a.score).slice(0, 10);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center font-mono text-primary animate-pulse">
        LOADING HIGH SCORES...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center font-mono text-destructive">
        ERROR LOADING SCORES
      </div>
    );
  }

  if (!sortedScores || sortedScores.length === 0) {
    return (
      <div className="h-full flex items-center justify-center font-mono text-muted-foreground">
        NO SCORES YET. BE THE FIRST!
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="border-b border-primary/30 p-4 bg-black/40">
        <h2 className="font-arcade text-primary text-lg flex items-center gap-3">
          <Trophy className="w-5 h-5" />
          LEADERBOARD
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        <div className="grid grid-cols-12 gap-2 text-xs font-mono text-muted-foreground mb-4 px-2 uppercase tracking-wider">
          <div className="col-span-2">Rank</div>
          <div className="col-span-7">Player</div>
          <div className="col-span-3 text-right">Score</div>
        </div>

        {sortedScores.map((score, index) => (
          <motion.div
            key={score.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              grid grid-cols-12 gap-2 items-center p-3 border border-transparent hover:border-primary/50 hover:bg-primary/5 transition-colors group
              ${index === 0 ? 'bg-primary/10 border-primary/30 neon-border' : 'bg-secondary/30'}
            `}
          >
            <div className="col-span-2 font-arcade text-xs">
              {index === 0 && <Crown className="w-4 h-4 text-yellow-500 inline mr-1" />}
              {index === 1 && <Medal className="w-4 h-4 text-gray-400 inline mr-1" />}
              {index === 2 && <Medal className="w-4 h-4 text-amber-600 inline mr-1" />}
              <span className={index < 3 ? "text-white" : "text-muted-foreground"}>
                #{index + 1}
              </span>
            </div>
            <div className="col-span-7 font-mono text-sm truncate text-white group-hover:text-primary transition-colors">
              {score.username}
            </div>
            <div className="col-span-3 text-right font-arcade text-xs text-primary">
              {score.score}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
