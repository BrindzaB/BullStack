"use server"

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function registerAction(prevState: unknown, formData: FormData) {
    const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "At least 8 characters"),
    });

    const parsed = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return { errors: parsed.error.flatten().fieldErrors};
    }

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) {
        return { errors: { email: ["Email already in use"] } };
    };

    const hashed = await bcrypt.hash(parsed.data.password, 12);
    await prisma.user.create({
        data: {
            name: parsed.data.name,
            email: parsed.data.email,
            password: hashed,
        }
    });

    redirect("/login");
}

export async function loginAction(prevState: unknown, formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Invalid email or password"}
        }
        throw error;
    }
}