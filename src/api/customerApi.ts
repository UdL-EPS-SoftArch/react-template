import { getHal, mergeHal, mergeHalArray, postHal } from "./halClient";
import type { AuthProvider } from "@/lib/authProvider";
import {Customer} from "@/types/customer";

export class CustomerService {
    constructor(private readonly authProvider: AuthProvider) {
    }

    async getCustomers(): Promise<Customer[]> {
        const resource = await getHal('/customers', this.authProvider);
        const embedded = resource.embeddedArray('customers') || [];
        return mergeHalArray<Customer>(embedded);
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        const resource = await postHal('/customers', customer, this.authProvider);
        return mergeHal<Customer>(resource);
    }

    async getCustomerById(id: string): Promise<Customer> {
        const resource = await getHal(`/customers/${id}`, this.authProvider);
        return mergeHal<Customer>(resource);
    }
    async getCustomerByPhoneNumber(phone: string): Promise<Customer[]> {
        const resource = await getHal(
            `/customers/search/findByPhoneNumber?phone=${encodeURIComponent(phone)}`,
            this.authProvider
        );
        const embedded = resource.embeddedArray('customers') || [];
        return mergeHalArray<Customer>(embedded);
    }
    async getCustomerByName(name: string): Promise<Customer[]> {
        const resource = await getHal(
            `/customers/search/findByName?name=${encodeURIComponent(name)}`,
            this.authProvider
        );
        const embedded = resource.embeddedArray('customers') || [];
        return mergeHalArray<Customer>(embedded);
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