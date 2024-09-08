import Title from "@/components/Title";
import { Braces } from "lucide-react";

export default function Page() {
  return(
    <main className="flex flex-col items-center justify-center h-screen">
      <Title>Web API<Braces className="ml-0.5 opacity-60" /></Title>
    </main>
  );
}
