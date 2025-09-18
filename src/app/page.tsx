import Scene from "./components/Scene"
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white h-screen relative">
      <Scene />
      <div className="flex flex-row items-center justify-center absolute top-40 right-60">
        <div className="pr-2">
          <h1 className="text-black-500 text-4xl">Ethan Zhou</h1>
          <p>Description</p>
        </div>
        <ul>
          <li>About</li>
          <li>Projects</li>
          <li className="hover:animate-wiggle"><Link href="/blogs">Blogs</Link></li>
        </ul>
      </div>
    </div>
  );
}
