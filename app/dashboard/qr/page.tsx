'use client';
import { MenuModel } from "@/models/menu.model";
import { uploadImageToCloudinary } from "@/server/cloudinary";
import { getMenuByUserID, updateMenu } from "@/server/menus";
import { generateQRCode } from "@/server/qr";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import Link from "next/link";
import { showToast } from "nextjs-toast-notify";
import { useEffect, useState } from "react";

export default function QRPage() {
    const [loading, setloading] = useState(true)
    const [loadingQR, setloadingQR] = useState(false)
    const [menus, setMenus] = useState<MenuModel | null>(null);

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = async () => {
        setloading(true);
        const menusFound = await getMenuByUserID();
        setMenus(menusFound);
        setloading(false);
    }

    const generateQR = async () => {
        if (!menus) return;

        try {

            setloadingQR(true);

            const response = await generateQRCode(menus.id);
            console.log("QR Code URL:", response);
            if (response) {

                const file = new File([response], `qr_code_${menus.id}.png`, { type: "image/png" });

                const urlCloudinary = await uploadImageToCloudinary(
                    file,
                    "Restaurant-QR/qr_codes", // Carpeta donde se guardará el QR
                    `qr_code_${menus.id}` // Nombre del archivo QR
                );

                await updateMenu({ ...menus, url_qr: urlCloudinary });

                setMenus({ ...menus, url_qr: urlCloudinary }); // Actualiza el menú con el nuevo QR
                setloadingQR(false);
            } else {
                showToast.error("Error al generar el código QR. Por favor, inténtalo de nuevo.", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setloadingQR(false);
            }
        } catch (error) {
            showToast.error("Error al generar el código QR. Por favor, inténtalo de nuevo.", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            setloadingQR(false);
        }

    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Spinner color="danger" classNames={{ label: "text-gray-400" }} label="Cargando..." variant="dots" />
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto py-6">

            {
                menus === null && !loading && (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-800">No tienes menús creados</h2>
                        <p className="mt-2 text-gray-600">Crea un menú para generar códigos QR.</p>
                        <Link href="/dashboard/menu"
                            className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            Ir a crear menú
                        </Link>
                    </div>
                )
            }

            {
                menus !== null && !loading && (
                    <div className="text-center">
                        <span className="bg-gray-400 text-white text-xs px-4 py-2 rounded-3xl mb-16">
                            Menú disponible
                        </span>
                        <h2 className="text-2xl font-semibold text-gray-800 my-8">
                            {
                                menus.name
                            }
                        </h2>

                        <hr />

                        <div>
                            {
                                menus.url_qr ? (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Código QR</h3>
                                        <img src={menus.url_qr} alt="QR Code" className="mx-auto w-72 h-72" />
                                        <p className="mt-2 text-gray-600">Escanea el código QR para acceder al menú.</p>
                                        <Link href={menus.url_qr} download target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-red-400 transition">
                                            Descargar QR <i className="fa-solid fa-circle-down"></i>
                                        </Link>
                                    </div>
                                ) : (
                                    <Button
                                        disabled={loadingQR}
                                        isLoading={loadingQR}
                                        className="mt-8 bg-red-500 text-white hover:bg-red-600 transition"
                                        onClick={generateQR}
                                    >
                                        {
                                            loadingQR ? "Generando QR..." : "Generar Código QR"
                                        }
                                    </Button>
                                )
                            }
                        </div>


                    </div>
                )
            }

        </div>
    );
}