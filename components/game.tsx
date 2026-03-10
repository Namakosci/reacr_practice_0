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

  const [BlockData, setBlockData] = useState(Array(48).fill(true));

  const BlockLeft: number[] = [2, 62, 122, 182, 242, 302, 362, 422];
  const BlockRight: number[] = [58, 118, 178, 238, 298, 358, 418, 478];
  const BlockTop: number[] = [0, 32, 64, 96, 128, 160];
  const BlockBottom: number[] = [28, 60, 92, 124, 156, 188];

  const blockCollision = (ballLeft: number, ballRight: number, ballTop: number, ballBottom: number, copyedBlockData: boolean[]) => {
    let Xreflection: boolean = false;
    let Yreflection: boolean = false;
    const newBlockData = copyedBlockData.map((isExist, index) => {
      if (!isExist) return false;
      const rawNumber = Math.floor(index / 8);
      const columnNumber = index % 8;

      //左壁
      if (ballRight >= BlockLeft[columnNumber] &&
        ballLeft <= BlockRight[columnNumber] &&
        ballTop >= BlockTop[rawNumber] &&
        ballBottom <= BlockBottom[rawNumber]
      ) {
        Xreflection = true;
        return false;
      }
      //右壁
      if (ballLeft <= BlockRight[columnNumber] &&
        ballRight >= BlockLeft[columnNumber] &&
        ballTop >= BlockTop[rawNumber] &&
        ballBottom <= BlockBottom[rawNumber]
      ) {
        Xreflection = true;
        return false;
      }
      //上壁
      if (ballBottom >= BlockTop[rawNumber] &&
        ballTop <= BlockBottom[rawNumber] &&
        ballLeft >= BlockLeft[columnNumber] &&
        ballRight <= BlockRight[columnNumber]
      ) {
        Yreflection = true;
        return false;
      }
      //下壁
      if (ballTop <= BlockBottom[rawNumber] &&
        ballBottom >= BlockTop[rawNumber] &&
        ballLeft >= BlockLeft[columnNumber] &&
        ballRight <= BlockRight[columnNumber]
      ) {
        Yreflection = true;
        return false;
      }
      return true;
    });
    setBlockData([...newBlockData]);
    return { Xreflection, Yreflection, newBlockData};
  };

  // アニメーションの為のrefを用意
  const ballXRef = useRef(ballX);
  const ballYRef = useRef(ballY);
  const ballXSpeedRef = useRef(5);
  const ballYSpeedRef = useRef(-5);
  const playerXRef = useRef(playerX);
  const BlockDataRef = useRef(BlockData);

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!gameStarted) return;

    const ballAnimate = () => {
      const ballLeft = ballXRef.current;
      const ballRight = ballXRef.current + ballSize;
      const ballTop = ballYRef.current;
      const ballBottom = ballYRef.current + ballSize;

      let nextBallXSpeed = ballXSpeedRef.current;
      let nextBallYSpeed = ballYSpeedRef.current;

      //　壁反射
      if (ballLeft <= 0 || ballRight >= 480) {
        nextBallXSpeed *= -1;
      }
      if (ballTop <= 0) {
        nextBallYSpeed *= -1;
      }
      // プレイヤー反射
      if (
        ballBottom >= playerY &&
        ballTop <= playerY &&
        ballRight >= playerXRef.current &&
        ballLeft <= playerXRef.current + playerSize
      ) {
        nextBallYSpeed *= -1;
      }
      if (ballBottom >= 600) {
        setGameOver(true);
        return;
      }
      // ブロック反射
      const { Xreflection, Yreflection, newBlockData } = blockCollision(ballLeft, ballRight, ballTop, ballBottom, BlockDataRef.current);
      BlockDataRef.current = newBlockData;
      if (Xreflection) {
        nextBallXSpeed *= -1;
      }
      if (Yreflection) {
        nextBallYSpeed *= -1;
      }

      // ボール情報を更新
      const nextBallX = ballXRef.current + nextBallXSpeed;
      const nextBallY = ballYRef.current + nextBallYSpeed;

      ballXSpeedRef.current = nextBallXSpeed;
      ballYSpeedRef.current = nextBallYSpeed;
      ballXRef.current = nextBallX;
      ballYRef.current = nextBallY;

      setBallX(nextBallX);
      setBallY(nextBallY);

      animationIdRef.current = requestAnimationFrame(ballAnimate);
    };

    animationIdRef.current = requestAnimationFrame(ballAnimate);

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
      onClick={() => {
        setGameStarted(true);
        ballXRef.current = ballX;
        ballYRef.current = ballY;
      }}
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