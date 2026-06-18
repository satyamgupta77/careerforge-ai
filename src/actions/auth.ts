"use server";

import * as z from "zod";
import { registerSchema } from "@/validations/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export async function register(values: z.infer<typeof registerSchema>, role: "CANDIDATE" | "COMPANY" = "CANDIDATE") {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email }
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: existingToken.identifier,
          token: existingToken.token,
        }
      }
    });
  }

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/new-verification?token=${token}`;

  // TODO: Send email using provider (e.g., Resend)
  console.log(`[MOCK EMAIL] Verification link for ${email}: ${confirmLink}`);

  return { success: "Confirmation email sent!" };
}

export async function login(values: any) {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
