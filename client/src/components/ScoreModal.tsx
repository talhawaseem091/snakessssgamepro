import { useState } from "react";
import { useSubmitScore } from "@/hooks/use-scores";
import { motion } from "framer-motion";

interface ScoreModalProps {
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ScoreModal({ score, isOpen, onClose }: ScoreModalProps) {
  const [username, setUsername] = useState("");
  const submitScore = useSubmitScore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    submitScore.mutate(
      { username, score },
      {
        onSuccess: () => {
          setUsername("");
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-secondary border-2 border-primary p-6 relative shadow-[0_0_50px_rgba(0,255,0,0.2)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-primary hover:text-white font-mono text-xl"
        >
          ✕
        </button>

        <h3 className="font-arcade text-xl text-primary mb-6 text-center">NEW SCORE RECORD</h3>

        <div className="text-center mb-8">
          <p className="font-mono text-muted-foreground mb-2">FINAL SCORE</p>
          <p className="font-arcade text-4xl text-white neon-text">{score}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="font-mono text-sm text-primary uppercase block">
              Enter Initials
            </label>
            <input
              id="username"
              type="text"
              maxLength={10}
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              placeholder="PLAYER_1"
              className="w-full bg-black border-2 border-muted focus:border-primary text-white font-arcade p-4 outline-none transition-colors text-center uppercase tracking-widest placeholder:text-muted-foreground/30"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={submitScore.isPending || !username.trim()}
            className="w-full bg-primary text-black font-arcade py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {submitScore.isPending ? "SAVING..." : "SUBMIT SCORE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
