import Title from "@/components/Title";
import { Braces } from "lucide-react";
import HTTPForm from "./_components/HTTPForm";

export default function Page() {
  return(
    <main className="flex flex-col items-center justify-center h-screen">
      <Title>Web API<Braces className="ml-0.5 opacity-60" /></Title>
      <section className="flex w-full justify-center items-center">
        <div className="w-5/12 flex justify-center">
        <HTTPForm />
        </div>
        <div className="w-5/12 flex justify-center">
          aaaaaa
        </div>
      </section>
    </main>
  );
}
