import Link from 'next/link'
import React from 'react'

export const HeroSection = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-36 my-10 mx-10">
            <div className="inline-block max-w-xl text-center justify-center text-3xl md:text-5xl font-bold leading-tight">
                <span >Crea tu&nbsp;</span>
                <span className="text-red-400" >menú digital&nbsp;</span>
                <br />
                <span>
                    y compartelo con un&nbsp;
                </span>
                <span className="text-red-400">código QR.&nbsp;</span>
            </div>
            <div>
                Fácil, rápido y 100% administrable.
            </div>

            <div className="flex gap-3">
                <Link
                    className="bg-red-400 text-white hover:bg-red-600 active:bg-red-600 px-4 py-2 rounded"
                    href="/register"
                >
                    Registrate
                </Link>

                <Link
                    className="bg-gray-50 text-gray-800 hover:bg-gray-100 active:bg-gray-100 px-4 py-2 rounded"
                    href="examples"
                >
                    <i className="fa-solid fa-qrcode mr-2"></i>
                    Ver ejemplos
                </Link>
            </div>
        </section>
    )
}
