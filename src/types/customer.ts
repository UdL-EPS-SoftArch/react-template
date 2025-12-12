import { Resource } from "halfred";

export interface CustomerEntity {
    uri?: string;
    name: string;
    phoneNumber: string;
}

export type Customer = CustomerEntity & Resource;

/** Payload de alta: JSON plano (lo que envías en POST) */
export type NewCustomerDTO = Pick<CustomerEntity, "name" | "phoneNumber">;
