"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUser } from "@/api/userApi";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {login} from "@/api/halClient";

type FormValues = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        login(data.username, data.password).then(() => {
            router.push("/users");
        })
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center w-full gap-6 text-center sm:items-start sm:text-left">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="username"
                                        {...register("username", { required: "Username is required" })}
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                <Button type="submit" className="mt-2" disabled={isSubmitting}>
                                    {isSubmitting ? "loging in..." : "login"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
