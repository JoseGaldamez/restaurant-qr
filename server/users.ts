"use server";

import { createClient } from "@/utils/supabase/server";

export const getLoggedUserInfo = async () => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return {
      success: false,
      message: "No hay sesión activa.",
      data: undefined,
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, uuid, email, name, picture, plan, created_at")
    .eq("uuid", userData.user.id)
    .single();

  if (error) {
    return { success: false, message: error.message, data: undefined };
  }

  if (!data) {
    return {
      success: false,
      message: "Usuario no encontrado.",
      data: undefined,
    };
  }

  return { success: true, data, message: "Usuario encontrado." };
};
