import NavBar from '@/app/components/NavBar';
import FacesList from '../components/FacesList';

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <FacesList />
    </main>
  );
}
