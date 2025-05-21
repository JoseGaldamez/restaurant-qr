import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-16 mt-12">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <span className="font-bold text-lg">
                        <span className="text-red-400">R</span>
                        estaurant<span className="text-red-400">QR</span>
                    </span>
                    <span className="block text-sm mt-1">
                        &copy; {new Date().getFullYear()} Todos los derechos reservados.
                    </span>
                    <span className="block text-sm">
                        Hecho con ❤️ por{" "}
                        <a
                            href="https://josegaldamez.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline"
                        >
                            José Galdámez
                        </a>
                    </span>
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <GithubIcon className="w-6 h-6 hover:text-red-400 transition" />
                    </a>
                    <a
                        href={siteConfig.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <i className="fa-brands fa-x-twitter w-6 h-6 hover:text-red-400 transition" />
                    </a>
                    <a
                        href={siteConfig.links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Discord"
                    >
                        <i className="fa-brands fa-discord w-6 h-6 hover:text-red-400 transition" />
                    </a>
                </div>
            </div>
        </footer>
    );
}