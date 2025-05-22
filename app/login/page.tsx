'use client';
import { motion } from 'framer-motion';
import { Login } from "@/components/Auth/Login";
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className='w-full flex items-center justify-center border-t-5 border-red-500 md:border-t-0'>
            <section className="bg-red-400 w-1/2 h-screen overflow-hidden hidden md:block">
                <Image priority src="/images/fondo-login.jpg" className='h-screen w-full object-center object-cover opacity-20' width={1000} height={1000} alt="Fondo Login" />
            </section>
            <section className='w-full md:w-1/2 flex items-center justify-center pt-10 md:pt-0'>
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.4 }}
                    className='w-full'
                >
                    <Login />
                </motion.div>
            </section>
        </div>
    );
}
