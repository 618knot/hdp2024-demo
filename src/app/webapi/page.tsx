"use client";

import Title from "@/components/Title";
import { Braces } from "lucide-react";
import HTTPForm from "./_components/HTTPForm";
import ResultCard from "./_components/ResultCard";
import { useState } from "react";
import { ResultProps } from "./_types/ResultProps";

export default function Page() {
  const [result, setResult] = useState<ResultProps>();
  const [isPending, setIsPending] = useState<boolean>(false);

  return(
    <main className="flex flex-col items-center justify-center h-screen">
      <Title>Web API<Braces className="ml-0.5 opacity-60" /></Title>
      <section className="flex w-full justify-center h-96">
        <div className="w-5/12 flex justify-center">
        <HTTPForm setResult={setResult} setIsPending={setIsPending} isPending={isPending} />
        </div>
        <div className="w-5/12 flex justify-center">
          <ResultCard result={result} />
        </div>
      </section>
    </main>
  );
}
