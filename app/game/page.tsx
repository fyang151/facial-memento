import NavBar from "../components/NavBar";
import GameContainer from "../components/GameContainer";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <GameContainer />
    </main>
  );
}
