import Title from "@/components/Title";
import ModeSelectContainer from "./_components/ModeSelectContainer";
import { Cog } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Title><Cog className="opacity-60" />ハードウェアデザインプロジェクト DEMO</Title>
      <ModeSelectContainer />
    </main>
  );
}
