"use server";

import { createClient } from "@/utils/supabase/server";

export const getLoggedUserInfo = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, uuid, email, name, picture, restaurant, created_at")
    .eq("uuid", id)
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
