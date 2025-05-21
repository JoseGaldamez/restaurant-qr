"use server";

import { RegisterDTO } from "@/models/registerDTO.model";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: RegisterDTO) {
  const supabase = await createClient();
  const data = {
    email: formData.email,
    password: formData.password,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return false;
  }

  return true;
}
