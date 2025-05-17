import { Navbar } from "@/components/navbar";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>
        <h2>¿Quiénes somos?</h2>
      </main>
    </div>
  );
}
