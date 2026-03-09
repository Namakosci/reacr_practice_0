'use client';
import { useState } from "react";

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
  const [playerX, setPlayerX] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(530);
  const [ballXSpeed, setBallXSpeed] = useState(0);
  const [ballYSpeed, setBallYSpeed] = useState(0);
  const [BlockData, setBlockData] = useState(Array(48).fill(true));

  return (
    <div
      className="h-150 w-120 bg-black"
      onMouseMove={x => {
        setPlayerX((x.clientX < 480) ? (x.clientX - playerSize / 2) : (480 - playerSize / 2));
        if(!gameStarted){
          if(x.clientX > 480 - ballSize){
            setBallX(480 - ballSize);
          }else if(x.clientX < ballSize){
            setBallX(0);
          }else{
            setBallX(x.clientX - ballSize / 2);
          }
        }
      }}
      onClick={() =>{
        setGameStarted(true);
        setBallXSpeed(2);
        setBallYSpeed(2);
      }}
    >
      {BlockData.map((isExist, index) => (
        BlockData[index] && <Block blockNumber={index} key={index} />
      ))}
      <div
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
          transform: `translate(${playerX}px, 550px)`
        }}
      />
    </div>
  );
}