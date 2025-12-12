import { Resource } from "halfred";

export interface BasketEntity {
    uri?: string;
    id?: string;
    customerUri: string; //TODO: change to Customer once its implemented
    created?: Date;
    updated?: Date;
}

export type Basket = BasketEntity & Resource;