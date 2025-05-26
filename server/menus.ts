"use server";

import { MenuModel } from "@/models/menu.model";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getMenuByUserID = async (): Promise<MenuModel | null> => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("menus")
    .select("id, name, user_id, created_at")
    .eq("user_id", userData.user.id)
    .single();

  if (error) {
    return null;
  }

  return data as MenuModel;
};

export const saveNewMenu = async (name: String) => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("menus")
    .insert([{ name, user_id: userData?.user.id }])
    .select("id, name, user_id, created_at")
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
