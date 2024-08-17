import Link from "next/link";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  return (
    <nav className={`${fredoka.className} flex flex-col sm:flex-row border-r-2 mb-3 mt-2`}>
      <div className="flex items-center justify-center">
        <Link
          href="/game"
          className="md:text-4xl font-medium text-emerald-500 ml-5"
        >
          Facial Memento
        </Link>
      </div>
      <ul className="flex flex-row flex-grow px-4 items-center justify-center sm:justify-end space-x-10 text-emerald-500 md:text-2xl">
        <Link href="/game" className="hover:text-emerald-700">
          Game
        </Link>
        <Link href="/about" className="hover:text-emerald-700">
          About
        </Link>
        <Link href="/faceindex" className="hover:text-emerald-700">
          Face Index
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
