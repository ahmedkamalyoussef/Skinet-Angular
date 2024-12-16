import { nanoid } from "nanoid";


export type CartType = {
    id: string;
    items: CartItem[];
}
export type CartItem = {
    productId: number;
    quantity: number;
    productName: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Cart implements CartType {
    id = nanoid();
    items: CartItem[] = [];
}