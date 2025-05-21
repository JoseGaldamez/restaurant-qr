'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Register = () => {

    const router = useRouter();

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            restaurant: formData.get('restaurant'),
            email: formData.get('email'),
            password: formData.get('password'),
        };
        console.log(data);

        // validate data

        if (data.name && data.restaurant && data.email && data.password) {
            router.push('/verify-email');
        }

    };

    return (
        <div className='w-full max-w-lg mx-auto bg-white p-8'>
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Registro</h1>
            <form className="space-y-5" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Tu nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="restaurant" className="block text-gray-700 font-semibold mb-2">
                        Nombre del restaurante
                    </label>
                    <input
                        id="restaurant"
                        name="restaurant"
                        type="text"
                        placeholder="Ejemplo: La Parrilla de Juan"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Crea una contraseña"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg shadow hover:bg-red-600 transition"
                >
                    Registrarse
                </button>
            </form>
            <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-4 text-gray-400">o</span>
                <div className="flex-grow h-px bg-gray-200" />
            </div>
            <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            // onClick={handleGoogleRegister} // Aquí puedes agregar tu lógica de Google
            >
                <i className="fa-brands fa-google"></i>
                Registrarse con Google
            </button>
            <p className="mt-6 text-center text-gray-600 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-red-500 font-semibold hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </div>
    )
}
