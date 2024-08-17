import NavBar from '@/app/components/NavBar';
import About from '../components/About';

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <About />
    </main>
  );
}
