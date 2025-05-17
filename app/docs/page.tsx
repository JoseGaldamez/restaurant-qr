import { Navbar } from "@/components/navbar";
import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>
        <h2>Documentación</h2>
      </main>
    </div>
  );
}
