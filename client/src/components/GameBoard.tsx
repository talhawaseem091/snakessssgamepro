import { useEffect, useRef, useState, useCallback } from "react";
import { useSubmitScore } from "@/hooks/use-scores";
import { motion, AnimatePresence } from "framer-motion";

// Game Constants
const CANVAS_SIZE = 600;
const GRID_SIZE = 20; // Size of one cell
const CELL_COUNT = CANVAS_SIZE / GRID_SIZE;
const SPEED_INITIAL = 120; // ms per tick

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameBoardProps {
  onGameOver: (score: number) => void;
  gameActive: boolean;
  setGameActive: (active: boolean) => void;
}

export function GameBoard({ onGameOver, gameActive, setGameActive }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game State
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Audio Refs (simulated with HTML5 Audio if files existed, or just visual feedback)
  
  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    let isColliding;
    do {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      isColliding = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
    } while (isColliding);
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setGameActive(true);
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) {
        if (e.code === 'Space' || e.code === 'Enter') resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameActive]);

  // Game Loop
  useEffect(() => {
    if (!gameActive) return;

    const moveSnake = () => {
      setDirection(nextDirection); // Commit direction change for this tick
      
      const head = snake[0];
      const newHead = { ...head };

      switch (nextDirection) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check Walls
      if (
        newHead.x < 0 || 
        newHead.x >= CELL_COUNT || 
        newHead.y < 0 || 
        newHead.y >= CELL_COUNT
      ) {
        handleGameOver();
        return;
      }

      // Check Self Collision
      if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        handleGameOver();
        return;
      }

      const newSnake = [newHead, ...snake];

      // Check Food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
        // Don't pop tail = grow
      } else {
        newSnake.pop(); // Remove tail = move
      }

      setSnake(newSnake);
    };

    const handleGameOver = () => {
      setGameActive(false);
      if (score > highScore) setHighScore(score);
      onGameOver(score);
    };

    const gameInterval = setInterval(moveSnake, Math.max(50, SPEED_INITIAL - Math.floor(score / 50) * 5));
    
    return () => clearInterval(gameInterval);
  }, [snake, nextDirection, gameActive, food, score, onGameOver, generateFood, highScore]);

  // Drawing Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Board
    ctx.fillStyle = '#0a0a0a'; // Dark background
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid Lines (Subtle)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for(let i=0; i<=CELL_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw Food (Pixel Apple)
    ctx.fillStyle = '#ff0055'; // Neon Red Food
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0055';
    ctx.fillRect(
      food.x * GRID_SIZE + 2, 
      food.y * GRID_SIZE + 2, 
      GRID_SIZE - 4, 
      GRID_SIZE - 4
    );
    ctx.shadowBlur = 0;

    // Draw Snake
    snake.forEach((seg, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#00ff00' : '#00cc00'; // Neon Green
      
      if (isHead) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff00';
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(
        seg.x * GRID_SIZE + 1, 
        seg.y * GRID_SIZE + 1, 
        GRID_SIZE - 2, 
        GRID_SIZE - 2
      );
    });

  }, [snake, food]);

  return (
    <div className="relative border-4 border-primary/30 p-1 rounded-lg bg-black shadow-[0_0_20px_rgba(0,255,0,0.2)]">
      <div className="absolute top-4 left-4 z-10 font-arcade text-white text-xs md:text-sm pointer-events-none">
        SCORE: <span className="text-primary">{score}</span>
      </div>
      <div className="absolute top-4 right-4 z-10 font-arcade text-white text-xs md:text-sm pointer-events-none">
        HI-SCORE: <span className="text-primary">{highScore}</span>
      </div>
      
      <canvas 
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="block max-w-full h-auto cursor-crosshair bg-background"
      />

      <AnimatePresence>
        {!gameActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm"
          >
            <motion.h2 
              initial={{ scale: 0.5, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className="text-4xl md:text-6xl font-arcade text-primary mb-8 neon-text"
            >
              {score > 0 ? "GAME OVER" : "SNAKE"}
            </motion.h2>
            
            <p className="font-arcade text-white/70 mb-8 text-sm md:text-base animate-pulse">
              PRESS <span className="text-white border border-white px-2 py-1 mx-1 rounded-sm">SPACE</span> TO START
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-muted-foreground mt-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-current flex items-center justify-center">↑</div>
                <span>MOVE UP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-current flex items-center justify-center">↓</div>
                <span>MOVE DOWN</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-current flex items-center justify-center">←</div>
                <span>MOVE LEFT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-current flex items-center justify-center">→</div>
                <span>MOVE RIGHT</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
