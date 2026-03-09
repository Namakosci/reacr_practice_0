'use client';
import { useEffect, useRef, useState } from "react";

function Block({ blockNumber }: { blockNumber: number }) {
  const blockX: number = blockNumber % 8 * 60 + 2;
  const blockY: number = Math.floor(blockNumber / 8) * 32;
  return (
    <div
      className="h-7 w-14 bg-blue-600"
      style={{
        position: 'absolute',
        transform: `translate(${blockX}px, ${blockY}px)`
      }}
    />
  );
}

export default function Game() {
  const playerSize = 60;
  const ballSize = 12;

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [playerX, setPlayerX] = useState(0);
  const playerY = 550;

  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(530);

  // Keep refs in sync for the animation loop so collision detection uses the latest values.
  const ballXRef = useRef(ballX);
  const ballYRef = useRef(ballY);
  const ballXSpeedRef = useRef(5);
  const ballYSpeedRef = useRef(-5);
  const playerXRef = useRef(playerX);

  useEffect(() => {
    ballXRef.current = ballX;
    ballYRef.current = ballY;
  }, [gameStarted]);
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  const [BlockData, setBlockData] = useState(Array(48).fill(true));

  // ここより下はAIによる実装であるため理解するタスクを済ませてから先に進む
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!gameStarted) return;

    const animate = () => {
      const ballLeft = ballXRef.current;
      const ballRight = ballXRef.current + ballSize;
      const ballTop = ballYRef.current;
      const ballBottom = ballYRef.current + ballSize;

      let nextVx = ballXSpeedRef.current;
      let nextVy = ballYSpeedRef.current;

      if (ballLeft <= 0 || ballRight >= 480) {
        nextVx *= -1;
      }
      if (ballTop <= 0) {
        nextVy *= -1;
      }
      if (
        ballBottom >= playerY &&
        ballTop <= playerY + 8 &&
        ballRight >= playerXRef.current &&
        ballLeft <= playerXRef.current + playerSize
      ) {
        nextVy *= -1;
      }
      if (ballBottom >= 600) {
        setGameOver(true);
        return;
      }
      const nextX = ballXRef.current + nextVx;
      const nextY = ballYRef.current + nextVy;

      ballXSpeedRef.current = nextVx;
      ballYSpeedRef.current = nextVy;
      ballXRef.current = nextX;
      ballYRef.current = nextY;

      setBallX(nextX);
      setBallY(nextY);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [gameStarted]);
  // ここより上はAIによる実装であるため理解するタスクを済ませてから先に進む

  return (
    <div
      className="h-150 w-120 bg-black"
      onMouseMove={x => {
        setPlayerX((x.clientX < 480) ? (x.clientX - playerSize / 2) : (480 - playerSize / 2));
        if (!gameStarted) {
          if (x.clientX > 480 - ballSize / 2) {
            setBallX(480 - ballSize - 1);
          } else if (x.clientX < ballSize / 2) {
            setBallX(1);
          } else {
            setBallX(x.clientX - ballSize / 2);
          }
        }
      }}
      onClick={() => setGameStarted(true)}
    >
      {BlockData.map((isExist, index) => (
        BlockData[index] && <Block blockNumber={index} key={index} />
      ))}
      <div    //ブロック崩しのボール
        className=" bg-white rounded-full"
        style={{
          position: 'absolute',
          width: `${ballSize}px`,
          height: `${ballSize}px`,
          transform: `translate(${ballX}px,${ballY}px)`
        }}
      />

      <div    //ブロック崩しのプレイヤー
        className={` bg-red-600`}
        style={{
          position: 'absolute',
          height: '8px',
          width: `${playerSize}px`,
          transform: `translate(${playerX}px, ${playerY}px)`
        }}
      />
    </div>
  );
}