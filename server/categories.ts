"use server";

import { CategoryModel } from "@/models/category.model";
import { MenuModel } from "@/models/menu.model";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getCategoriesByMenuID = async (
  menu_id: string
): Promise<CategoryModel[] | null> => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, description, menu_id, created_at")
    .eq("menu_id", menu_id)
    .eq("user_id", userData.user.id);

  if (error) {
    return null;
  }

  return data as CategoryModel[];
};

export const saveNewCategory = async (
  name: string,
  description: string,
  menu_id: string
) => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("categories")
    .insert([{ name, description, menu_id, user_id: userData?.user.id }])
    .select("id, name, description, menu_id, user_id, created_at")
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Categoría creada correctamente" };
};
