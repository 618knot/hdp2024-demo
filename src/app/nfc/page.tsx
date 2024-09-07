"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction, useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Promise<any>[]>([]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => handleNFC(results, setResults)}>Scan your card</Button>
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h3>Results</h3>
          {
            results?.map((result, index) => (
              <>
                <div key={index}>
                  {result}
                </div>
                <Separator />
              </>
            ))
          }
        </div>
      </ScrollArea>
    </main>
  );
};

const handleNFC = (results: Promise<any>[], setResults: Dispatch<SetStateAction<Promise<any>[]>>) => {
  const ndef = new NDEFReader();

  ndef.scan().then(
    (msg: any) => console.log(msg)
    // (msg: any) => setResults(msg)
  ).catch(
    (msg: any) => console.log(msg)
    // (err: any) => setResults(err)
  );
};