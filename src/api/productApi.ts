import {fetchHal, mergeHal, mergeHalArray, postHal} from "./halClient";
import {Product} from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    const resource = await fetchHal("/products");
    const embedded = resource.embeddedArray("products") || [];
    return mergeHalArray<Product>(embedded);
}

export async function getProductById(id: string): Promise<Product> {
    const resource = await fetchHal(`/products/${id}`);
    return mergeHal<Product>(resource);
}

export async function createProduct(product: Product): Promise<Product> {
    const resource = await postHal('/products', product);
    return mergeHal<Product>(resource);
}
