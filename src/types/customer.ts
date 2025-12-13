import { Resource } from "halfred";

export interface CustomerEntity {
    uri?: string;
    name: string;
    email?: string;
    password?: string
    phoneNumber: string;

}

export type Customer = CustomerEntity & Resource;
