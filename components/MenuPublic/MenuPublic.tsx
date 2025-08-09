'use client'
import { CategoryModel } from "@/models/category.model";
import { DishModel } from "@/models/dish.model";
import { MenuModel } from "@/models/menu.model";
import { getCategoriesByMenuID } from "@/server/categories";
import { getDishesByMenuID } from "@/server/dishes";
import { getMenuByID } from "@/server/menus";
import { realizarPedido } from "@/server/pedidos";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useEffect, useState } from "react"

export const MenuPublic = ({ menu_id }: { menu_id: string }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const mesa = searchParams.get('mesa');

    const [loading, setLoading] = useState(true);
    const [menuSelected, setmenuSelected] = useState<MenuModel | null>(null);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [dishes, setDishes] = useState<DishModel[]>([]);
    const [selectedPlates, setSelectedPlates] = useState<DishModel[]>([]);


    useEffect(() => {
        console.log(mesa);
        getMenu();
    }, [menu_id]);

    const createOrder = async () => {

        try {
            const created = await realizarPedido({
                plates: selectedPlates,
                mesa: mesa,
                pedidoNumero: 130
            });

            setSelectedPlates([]);

            router.push("/menu/complete");

        } catch (error) {

        }
    }

    const getMenu = async () => {
        setLoading(true);

        const menu = await getMenuByID(menu_id);
        if (!menu) {
            // Manejar el caso en que no se encuentra el menú
            setLoading(false);
            showToast.error("No se encontró el menú", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }

        const cats = await getCategoriesByMenuID(menu.id);
        if (!cats) {
            // Manejar el caso en que no se encuentran las categorías
            setLoading(false);
            showToast.error("No se encontraron categorías para este menú", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }


        const dish = await getDishesByMenuID(menu.id);
        if (!dish) {
            // Manejar el caso en que no se encuentran los platos
            setLoading(false);
            showToast.error("No se encontraron platos para este menú", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }


        setmenuSelected(menu);
        setCategories(cats);
        setDishes(dish);

        setLoading(false);
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Spinner classNames={{ label: "text-red-300" }} label="Cargando..." variant="dots" color="danger" size="lg" />
            </div>
        );
    }

    return (
        <div>
            <header className="text-center">
                <Image
                    src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/restaurants/c62pifzzif6p4zv7kkff"
                    alt="Logo del menú"
                    priority
                    className="mx-auto py-4 rounded-full"
                    width={100} height={100}
                />
                <h1 className="text-2xl font-bold text-center px-5">
                    {menuSelected?.name}
                </h1>
            </header>
            <section className="max-w-7xl mx-auto px-4 pt-10">
                {
                    categories.length > 0 ? (
                        categories.map((category) => (
                            <div key={category.id} className="mb-8">

                                <h2 className="text-xl font-semibold">{category.name}</h2>
                                <div className="w-full h-1 bg-red-300 rounded-lg mb-3"></div>
                                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {dishes.filter(dish => dish.category_id === category.id).map(dish => (
                                        <article key={dish.id} className={`mb-2 flex items-center justify-between border-b-1 pb-5 ${selectedPlates.some(p => p.id === dish.id) ? 'bg-red-100' : ''}`} onClick={() => {
                                            if (selectedPlates.some(p => p.id === dish.id)) {
                                                setSelectedPlates(selectedPlates.filter(p => p.id !== dish.id));
                                            } else {
                                                setSelectedPlates([...selectedPlates, dish]);
                                            }
                                        }}>
                                            <div className="w-1/3">
                                                <Image
                                                    src={"https://res.cloudinary.com/jose-galdamez-dev/image/upload/w_400/f_auto,q_auto/v1/Restaurant-QR/dishes/" + dish.id}
                                                    alt={dish.name}
                                                    width={400}
                                                    height={400}
                                                    priority
                                                    className="rounded-lg w-full aspect-square object-cover pt-3"
                                                    style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
                                                />
                                            </div>
                                            <div className="w-2/3 pl-4">
                                                <h3 className="text-lg font-semibold">
                                                    {dish.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {dish.description.substring(0, 50)}{dish.description.length > 50 ? '...' : ''}
                                                </p>

                                                <div className="text-red-500 font-bold mt-2 text-right px-5">
                                                    L. {dish.price}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </section>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay categorías disponibles en este menú.</p>
                    )
                }
            </section>
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
                <footer className="text-center p-4">
                    <Button disabled={selectedPlates.length === 0} onClick={createOrder} variant="solid" className="w-full bg-red-400 text-white text-lg py-5 disabled:bg-slate-200">Realizar pedido</Button>
                </footer>
            </div>
        </div>
    )
}
