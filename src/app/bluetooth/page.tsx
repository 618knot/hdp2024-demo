"use client";

import { Button } from "@/components/ui/button";
import { requestDevice } from "@/util/ble/connect";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => {
        const dev = requestDevice();
        console.log(dev);
      }}>
        connect to the peripheral
      </Button>
    </main>
  );
}
