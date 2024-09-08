import ModeSelectContainer from "./_components/ModeSelectContainer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold my-8">ハードウェアデザインプロジェクト DEMO</h1>
      <ModeSelectContainer />
    </main>
  );
}
