import { Resource } from "halfred";

export interface Inventory extends Resource {
    name: string;
    description?: string;
    location: string;
    totalStock: number;

}
