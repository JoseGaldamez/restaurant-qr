'use client';
import { LoginDTO } from '@/models/loginDTO.model';
import { login } from '@/server/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';
import { useState } from 'react';

export const Login = () => {

    const router = useRouter();

    const [dataForm, setdataForm] = useState<LoginDTO>({
        email: '',
        password: '',
    });


    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Aquí puedes agregar la lógica para manejar el inicio de sesión
        const result = await login(dataForm);
        if (result.success) {
            //setLoading(false);
            router.push("/dashboard");
        } else {
            showToast.error(result.message, {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            setLoading(false);
        }

    };

    return (
        <div className='w-full max-w-md mx-auto bg-white p-8'>

            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h1>
            <form className="space-y-5" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={dataForm.email}
                        onChange={(e) => setdataForm({ ...dataForm, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={dataForm.password}
                            onChange={(e) => setdataForm({ ...dataForm, password: e.target.value })}
                            placeholder="Tu contraseña"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-12"
                            required
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showPassword ? (
                                <i className="fa-regular fa-eye-slash"></i>
                            ) : (
                                <i className="fa-regular fa-eye"></i>
                            )}
                        </button>
                    </div>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg shadow hover:bg-red-600 transition disabled:bg-gray-300"
                >
                    Iniciar sesión
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
            // onClick={handleGoogleLogin} // Aquí puedes agregar tu lógica de Google
            >
                <i className="fa-brands fa-google"></i>
                Iniciar sesión con Google
            </button>
            <p className="mt-6 text-center text-gray-600 text-sm">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-red-500 font-semibold hover:underline">
                    Regístrate
                </Link>
            </p>
        </div>
    )
}
