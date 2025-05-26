'use client';
import { useEffect, useState } from "react";
import { CategoriesList } from "@/components/Dashboard/menu/CategoriesList";
import { CreateMenu } from "@/components/Dashboard/menu/CreateMenu";
import { MenuModel } from "@/models/menu.model";
import { getMenuByUserID } from "@/server/menus";
import { Spinner } from "@heroui/spinner";
import { DishedList } from "@/components/Dashboard/menu/DishedList";
import { CategoryModel } from "@/models/category.model";

export default function MenuPage() {

    const [loading, setloading] = useState(true)
    const [menus, setMenus] = useState<MenuModel | null>(null);
    const [listOfCategories, setlistOfCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        getMenus();

    }, []);

    const getMenus = async () => {
        setloading(true);
        const menus = await getMenuByUserID();
        setMenus(menus);
        setloading(false);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Spinner color="danger" classNames={{ label: "text-gray-400" }} label="Cargando..." variant="dots" />
            </div>
        );
    }


    if (menus === null && !loading) {
        return (
            <CreateMenu getMenu={getMenus} />
        );
    }


    return (
        <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 my-10">
                Menú de {menus?.name || "Tu Restaurante"}
            </h1>

            <hr className="my-4" />
            <CategoriesList menu_id={menus?.id || ""} setCats={setlistOfCategories} />
            <DishedList menu_id={menus?.id || ""} categories={listOfCategories} />
        </div>
    );
}