"use server";

import { DishModel } from "@/models/dish.model";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getDishesByMenuID = async (menu_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dishes")
    .select(
      "id, name, description, price, picture_url, category_id, menu_id, user_id, created_at"
    )
    .eq("menu_id", menu_id);

  if (error) {
    return null;
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data as DishModel[];
};

export const saveNewDish = async (
  name: string,
  description: string,
  price: string,
  category_id: string,
  menu_id: string
) => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("dishes")
    .insert({
      name,
      description,
      price: parseFloat(price),
      category_id,
      menu_id,
      user_id: userData.user.id,
    })
    .select(
      "id, name, description, price, picture_url, category_id, menu_id, user_id, created_at"
    )
    .single();

  if (error) {
    console.log("Error al crear el plato:", error);
    return { success: false, message: error.message };
  }
  if (!data) {
    return { success: false, message: "No se pudo crear el plato." };
  }

  return { success: true, message: "Plato creado correctamente" };
};
