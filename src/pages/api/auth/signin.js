import { supabase } from "../../../data/supabase";

export const POST = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    const { access_token, refresh_token } = data.session;
    cookies.set("sb-access-token", access_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return redirect("/");
  } catch (err) {
    return new Response("Failed to process request", { status: 500 });
  }
};
