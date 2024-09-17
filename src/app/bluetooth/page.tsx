"use client";

import { Button } from "@/components/ui/button";
import { requestDevice } from "@/util/ble/connect";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "@/p5/sketch.js";
import { useState } from "react";
import Title from "@/components/Title";
import { Bluetooth, Flame } from "lucide-react";
import { toast } from "sonner";

let intervalID: NodeJS.Timeout;

export default function Home() {
  const [xVal, setXVal] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Title>Bluetooth<Bluetooth className="ml-0.5 opacity-60" /></Title>
      <Button onClick={async () => {
        const device = await requestDevice({
          filters: [
            { services: ["12345678-1234-5678-1234-56789abcdef0"] }
          ],
          optionalServices: ["12345678-1234-5678-1234-56789abcdef0"]
        });
        setIsPending(true);
        await device.gatt.connect();
        console.log(isPending)
        // if (!device.gatt.connected) {
        //   toast("デバイスとの接続に失敗しました" ,{
        //     icon: <Flame />,
        //     style: { background: "#dc2626", color: "#fff" },
        //   });
        //   isPending = false;
        //   return;
        // }
        const primary = await device.gatt.getPrimaryService("12345678-1234-5678-1234-56789abcdef0");
        const characteristic = await primary.getCharacteristic("12345678-1234-5678-1234-56789abcdef1");
        if(!intervalID) {
          intervalID = setInterval(
            async () => {
              const value: DataView = await characteristic.readValue();
          
              const decoder = new TextDecoder("utf-8");
              const decodedJson = JSON.parse(decoder.decode(value))
              console.log(decodedJson)
            },
            500
          );
        }
      }}
      disabled={isPending}
      >
        ジョイスティックと接続する(予定)
      </Button>
      <p>wasdか十字キーでも操作できます</p>
      <NextReactP5Wrapper sketch={p5 => sketch(p5, xVal)} />
    </main>
  );
}
