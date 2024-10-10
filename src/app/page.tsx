"use client";

import { Button } from "@/components/ui/button";
import { requestDevice } from "@/util/ble/connect";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import sketch from "@/p5/sketch.js";
import { useState } from "react";
import Title from "@/components/Title";
import { Bluetooth, Flame } from "lucide-react";

const SERVICE_UUID = '96a3093b-708c-4abd-97d2-9d8b10c122ec';
const CHAR_UUID = '206ff6bf-5f3e-4c9e-902f-b7762595ddd8';
const NAME_PREFIX = "hdp2024-";

let device: any;

export default function Home() {
  const [characteristic, setCharacteristic] = useState<Object>({});
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isConnecting, setisConnecting] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Title>Bluetooth<Bluetooth className="ml-0.5 opacity-60" /></Title>
      {
        isPending
        ? <Button onClick={() => {
          device.gatt.disconnect();
          setisConnecting(false);
          setIsPending(false);
        }}
        disabled={!isConnecting}
        >
            接続を停止
          </Button>
        : <Button onClick={async () => {
          device = await requestDevice({
            filters: [
              { services: [SERVICE_UUID] },
              { namePrefix: NAME_PREFIX }
            ],
            optionalServices: [SERVICE_UUID]
          });
          await setIsPending(true);
          await device.gatt.connect();
          await console.log(isPending)
          const primary = await device.gatt.getPrimaryService(SERVICE_UUID);
          setCharacteristic(await primary.getCharacteristic(CHAR_UUID));
          await setisConnecting(true);
        }}
        >
          ジョイスティックと接続
        </Button>
      }
      <p>wasdか十字キーでも操作できます</p>
      <NextReactP5Wrapper sketch={p5 => sketch(p5, characteristic)} />
    </main>
  );
}
