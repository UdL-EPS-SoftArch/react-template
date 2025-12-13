import { getHal, mergeHal, mergeHalArray, postHal } from "./halClient";
import type { AuthProvider } from "@/lib/authProvider";
import {Customer, NewCustomerDTO} from "@/types/customer";
import { postHalJson } from "./halJsonClient";

export class CustomerService {
    constructor(private readonly authProvider: AuthProvider) {
    }

    async getCustomers(): Promise<Customer[]> {
        const resource = await getHal('/customers', this.authProvider);
        const embedded = resource.embeddedArray('customers') || [];
        return mergeHalArray<Customer>(embedded);
    }


    /** Crear cliente con JSON plano (DTO) */

    async createCustomer(data: NewCustomerDTO): Promise<Customer> {
        const resource = await postHalJson("/customers", data, this.authProvider);
        return mergeHal<Customer>(resource);
    }



    async getCustomerById(id: string): Promise<Customer> {
        const resource = await getHal(`/customers/${id}`, this.authProvider);
        return mergeHal<Customer>(resource);
    }



    async getCustomerRelation<T>(customer: Customer, relation: string): Promise<T>
    {
        const link = customer.link(relation);
        if (!link?.href) {
            throw new Error(`Relación '${relation}' no encontrada en Customer`);
        }
        const resource = await getHal(link.href, this.authProvider);
        return mergeHal<T>(resource);
    }

}