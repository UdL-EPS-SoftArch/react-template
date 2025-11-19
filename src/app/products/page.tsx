import { getProducts } from "@/api/productApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center w-full gap-6 text-center sm:items-start sm:text-left">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="text-2xl font-semibold">Products</h1>
                        <Link href="/products/create">
                            <Button>Create Product</Button>
                        </Link>
                    </div>

                    <ul className="space-y-3 w-full">
                        {products.map((product, i) => (
                            <li
                                key={i}
                                className="p-4 w-full border rounded-lg bg-white shadow-sm hover:shadow transition dark:bg-black"
                            >
                                <div className="font-medium">{product.name}</div>

                                {product.description && (
                                    <div className="text-gray-600 text-sm mt-1">
                                        {product.description}
                                    </div>
                                )}

                                <div className="text-gray-900 font-semibold mt-2">
                                    ${product.price.toFixed(2)}
                                </div>

                                {product.stock !== undefined && (
                                    <div className="text-gray-500 text-xs mt-1">
                                        Stock: {product.stock}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
