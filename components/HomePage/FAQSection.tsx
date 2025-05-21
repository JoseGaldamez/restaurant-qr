'use client';
import { useState } from "react";

export function FAQSection() {
    const faqs = [
        {
            question: "¿Cómo creo mi menú digital?",
            answer:
                "Crear tu menú digital es muy sencillo. Primero, regístrate en nuestra plataforma proporcionando algunos datos básicos de tu restaurante. Luego, accede a tu panel de administración donde podrás agregar cada platillo, su descripción, precio y una imagen si lo deseas. Una vez que hayas terminado de cargar tu menú, la plataforma generará automáticamente un código QR único que podrás imprimir y colocar en las mesas de tu restaurante. Tus clientes solo tendrán que escanearlo para ver el menú completo desde sus dispositivos móviles, sin necesidad de descargar ninguna aplicación.",
        },
        {
            question: "¿Puedo actualizar mi menú?",
            answer:
                "¡Por supuesto! Nuestro sistema está diseñado para que puedas modificar tu menú en cualquier momento y de manera muy fácil. Puedes agregar nuevos platillos, cambiar precios, actualizar descripciones o eliminar productos que ya no ofrezcas. Todos los cambios que realices se reflejarán de inmediato en el menú digital que ven tus clientes, sin necesidad de generar un nuevo código QR. Así, siempre tendrás tu carta actualizada y lista para tus comensales.",
        },
        {
            question: "¿El menú digital funciona en cualquier dispositivo?",
            answer:
                "Sí, el menú digital está optimizado para funcionar perfectamente en cualquier dispositivo con acceso a internet, ya sea un smartphone, tablet o computadora. No importa si tus clientes usan Android, iOS o cualquier otro sistema operativo, podrán visualizar el menú de forma clara y rápida. Además, la interfaz es responsiva, lo que garantiza una experiencia cómoda y agradable sin importar el tamaño de la pantalla.",
        },
        {
            question: "¿Puedo personalizar el diseño del menú?",
            answer:
                "Claro que sí. Sabemos lo importante que es la imagen de tu restaurante, por eso te ofrecemos varias opciones de personalización. Puedes elegir los colores que mejor representen tu marca, subir el logo de tu restaurante y seleccionar entre diferentes estilos de presentación para el menú. Incluso puedes destacar platillos especiales o agregar secciones personalizadas. Todo esto lo puedes hacer desde tu panel de administración de manera intuitiva y sin conocimientos técnicos.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="py-36 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                    Preguntas Frecuentes
                </h2>
                <div className="w-56 mx-auto mb-4 bg-red-400 h-1 rounded-full">
                </div>
                <div className="rounded-lg shadow bg-white mt-10 divide-y divide-gray-200">
                    {faqs.map((faq, idx) => (
                        <div key={idx}>
                            <button
                                className="w-full flex justify-between items-center py-6 px-6 text-left focus:outline-none"
                                onClick={() => toggle(idx)}
                                aria-expanded={openIndex === idx}
                                aria-controls={`faq-answer-${idx}`}
                            >
                                <span className="font-semibold text-lg text-red-500">
                                    {faq.question}
                                </span>
                                <span className="ml-4 text-gray-400 text-2xl">
                                    {openIndex === idx ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                id={`faq-answer-${idx}`}
                                className={`px-6 pb-4 text-gray-700 transition-all duration-300 ${openIndex === idx
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}