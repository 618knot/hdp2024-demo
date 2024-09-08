"use client";

import { Button } from "@/components/ui/button";
import { requestDevice } from "@/util/ble/connect";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "@/p5/sketch.js";
import { useState } from "react";

export default function Home() {
  const [xVal, setXVal] = useState<number>(0);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => {
        const dev = requestDevice();
        console.log(dev);
      }}>
        ジョイスティックと接続する(予定)
      </Button>
      <p>wasdか十字キーでも操作できます</p>
      <NextReactP5Wrapper sketch={p5 => sketch(p5, xVal)} />
    </main>
  );
}
