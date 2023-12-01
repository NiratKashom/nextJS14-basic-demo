"use server";
import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData): Promise<any> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (email !== "eiei@eiei.com" && password !== "123456") {
    return {
      message: "Login failed",
    };
  } else {
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    };
    const secretKey = await importJWK(secretJWK, "HS256");
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secretKey);
    // set cookie
    cookies().set("token", token);
    redirect("/manage/user");
  }
}
