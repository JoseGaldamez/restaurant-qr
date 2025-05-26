import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";

const team = [
  {
    name: "José Galdámez",
    role: "Desarrollador Full Stack",
    img: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/nq0mfsahi60l8xjbmptm",
    bio: "Apasionado por el diseño y la experiencia de usuario. José busca crear interfaces intuitivas que ayuden a los emprendedores a destacar en el mundo digital.",
  },
  {
    name: "Linda Nolasco",
    role: "Analista de Sistemas",
    img: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/e9efw9nlcmmxnbmoyojo",
    bio: "Apasionada por la tecnología, actualmente desarrollando un proyecto que busca optimizar procesos mediante soluciones tecnológicas eficientes.",
  },
  {
    name: "Maryory Rodríguez",
    role: "Desarrollador de Soluciones Digitales",
    img: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/aomzddqlsb4jjf9mh49l",
    bio: "Me gusta crear tecnología para mejorar cómo los clientes interactúan en un restaurante. Busco siempre la mejor experiencia para el usuario. Soy una persona creativa y me gusta aprender cosas nuevas.",
  },
  {
    name: "José Ramón",
    role: "Product Manager",
    img: "https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/i10ym7x9b5wwnjafhmim",
    bio: "No solo coordina cada etapa del desarrollo, sino que también anticipa tendencias y oportunidades, guiando al equipo hacia soluciones innovadoras y alineadas con los objetivos del negocio.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          ¿Quiénes somos?
        </h2>
        <div className="w-32 mx-auto mb-8 bg-red-400 h-1 rounded-full"></div>
        <p className="text-lg text-gray-600 text-center mb-12">
          Somos un equipo de estudiantes universitarios apasionados por la
          tecnología y el emprendimiento. Nuestro objetivo es ayudar a los
          emprendedores de restaurantes del país a digitalizar sus negocios y
          crecer en el mundo moderno.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {team.map((person) => (
            <div
              key={person.name}
              className="rounded-xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-red-400 mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {person.name}
              </h3>
              <span className="text-red-500 font-semibold mb-2">
                {person.role}
              </span>
              <p className="text-gray-600 text-sm">{person.bio}</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="mt-36 text-center">

          <i className="fa-solid fa-building text-7xl text-red-400 mb-16"></i>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nuestra misión
          </h2>
          <div className="w-32 mx-auto mb-8 bg-red-400 h-1 rounded-full">
          </div>
          <p className="text-lg text-gray-600">
            Ayudar a los emprendedores de restaurantes a digitalizar sus
            negocios, facilitando la creación de menús digitales y QR para
            mejorar la experiencia del cliente.
          </p>
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nuestra visión
          </h2>
          <div className="w-32 mx-auto mb-8 bg-red-400 h-1 rounded-full">
          </div>
          <p className="text-lg text-gray-600">
            Ser la plataforma líder en digitalización de restaurantes en el
            país, ofreciendo herramientas innovadoras y un servicio al cliente
            excepcional.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
