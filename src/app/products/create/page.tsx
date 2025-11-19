"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/api/productApi";
import { Product } from "@/types/product";

type FormValues = {
    name: string;
    description?: string;
    price: number;
    stock?: number;
};

export default function CreateProductPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createProduct(data as Product);
            router.push("/products");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to create product"
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center w-full gap-6 text-center sm:items-start sm:text-left">
                    <Link
                        href="/products"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to Products
                    </Link>

                    <h1 className="text-2xl font-semibold">Create New Product</h1>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters",
                                            },
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        {...register("description")}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="price">Price *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        {...register("price", {
                                            required: "Price is required",
                                            min: {
                                                value: 0,
                                                message: "Price must be positive",
                                            },
                                            valueAsNumber: true,
                                        })}
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        {...register("stock", {
                                            min: {
                                                value: 0,
                                                message: "Stock must be positive",
                                            },
                                            valueAsNumber: true,
                                        })}
                                    />
                                    {errors.stock && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.stock.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Creating..." : "Create Product"}
                                    </Button>
                                    <Link href="/products">
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
