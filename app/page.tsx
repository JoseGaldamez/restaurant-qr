import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { FeaturesSection } from "@/components/HomePage/FeaturesSection";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/HomePage/HeroSection";


export default function Home() {
  return (
    <>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
        </main>
      </div>
    </>
  );
}
