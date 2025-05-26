'use client';
import { useRef } from "react";

const testimonials = [
    {
        text: "¡Muy fácil de usar y mis clientes lo aman! Ahora pueden ver el menú desde su teléfono sin esperar. La plataforma es intuitiva y el diseño del menú es muy profesional.",
        author: "— Restaurante El Buen Sabor",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
    {
        text: "El QR se genera en segundos, excelente soporte. Cuando tuve una duda, el equipo respondió rápidamente y me ayudó a personalizar mi menú digital.",
        author: "— Café Central",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
    {
        text: "Pude actualizar mi menú en minutos, ¡muy recomendable! Me encanta que puedo agregar nuevos platillos y cambiar precios en cualquier momento sin complicaciones.",
        author: "— Pizzería Don Luigi",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
    {
        text: "La experiencia para mis clientes mejoró mucho con el menú digital. Ahora todo es más higiénico y moderno, y recibo menos preguntas sobre los ingredientes.",
        author: "— Sushi Express",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
    {
        text: "El soporte técnico es rápido y eficiente. Me ayudaron a integrar el menú con mi página web y a personalizar los colores para que coincidan con mi marca.",
        author: "— Hamburguesas La Esquina",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
    {
        text: "¡Recomiendo RestaurantQR a todos mis colegas! Es una herramienta indispensable para cualquier restaurante que quiera modernizarse y ofrecer una mejor experiencia.",
        author: "— Taquería El Patrón",
        image: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    },
];

export function TestimonialsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.75; // 75% del contenedor
            scrollRef.current.scrollTo({
                left:
                    direction === "left"
                        ? scrollLeft - scrollAmount
                        : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-36 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Testimonios</h2>
                <div className="w-56 mx-auto mb-4 bg-red-400 h-1 rounded-full">
                </div>
                <p className="m-8 p-5 text-gray-600 text-lg">Mira lo que dicen nuestros clientes sobre nuestro servicio y cómo ha mejorado su experiencia. Para que tú también puedas disfrutar de los beneficios de un menú digital.</p>
                <div className="relative">
                    <button
                        aria-label="Anterior"
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-100"
                    >
                        &#8592;
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide px-0 py-5 mx-14"
                        style={{
                            scrollSnapType: "x mandatory",
                            scrollPaddingLeft: "2rem",
                            scrollPaddingRight: "2rem",
                        }}
                    >
                        {testimonials.map((t, idx) => (
                            <blockquote
                                key={idx}
                                className="w-3/4 min-w-[75%] max-w-[75%] flex-shrink-0 p-6 bg-white rounded shadow flex flex-col items-center"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <img
                                    src={t.image}
                                    alt={t.author}
                                    className="w-36 h-36 rounded-full object-cover mb-4 border-2 border-red-400"
                                />
                                <p className="mb-2 p-5">“{t.text}”</p>
                                <footer className="text-sm text-gray-500">
                                    {t.author}
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                    <button
                        aria-label="Siguiente"
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10 hover:bg-gray-100"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
}