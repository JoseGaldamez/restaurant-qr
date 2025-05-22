"use server";

import { LoginDTO } from "@/models/loginDTO.model";
import { RegisterDTO } from "@/models/registerDTO.model";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: RegisterDTO) {
  const supabase = await createClient();
  const data = {
    email: formData.email,
    password: formData.password,
  };

  // check if user already exists
  const user = await supabase
    .from("users")
    .select("*")
    .eq("email", formData.email);
  console.log({ user });

  if (user.data && user.data.length > 0) {
    return { success: false, message: "Este usuario ya existe" };
  }

  const { error, data: userData } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        name: formData.name,
      },
    },
  });
  if (error) {
    return { success: false, message: error.message };
  }

  if (userData.user && userData.user.id) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        { email: formData.email, name: formData.name, uuid: userData.user.id },
      ]);
    if (insertError) {
      return { success: false, message: insertError.message };
    }
    return { success: true, message: "User created successfully" };
  }

  // create user in database
  return { success: false, message: "Error desconocido." };
}

export async function login(formData: LoginDTO) {
  const supabase = await createClient();
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const result = await supabase.auth.signInWithPassword(data);

  if (result.error) {
    return { success: false, message: result.error.message };
  }
  return { success: true, message: "User logged in successfully" };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: "User logged out successfully" };
}
