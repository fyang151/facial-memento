import NavBar from '@/app/components/NavBar';
import GameTestContainer from "@/app/components/GameTestContainer";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <GameTestContainer />
      <h1>There was a page here, now it&apos;s a wasteland....</h1>
    </main>
  );
}
