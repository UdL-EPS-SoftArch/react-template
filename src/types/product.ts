import { Resource } from "halfred";

// Entity fields
export interface ProductEntity {
    id?: number;
    name: string;
    description?: string;
    price: number;
    stock?: number;
}

// Combine with HAL Resource
export type Product = ProductEntity & Resource;
