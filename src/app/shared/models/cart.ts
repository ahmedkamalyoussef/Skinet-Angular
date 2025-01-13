import { nanoid } from "nanoid";


export type CartType = {
    id: string;
    items: CartItem[];
    deliveryMethodId?: number;
    clientSecret?: string;
    paymentIntentId?: string;
    coupon?: Coupon;
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
    deliveryMethodId?: number;
    clientSecret?: string;
    paymentIntentId?: string;
    coupon?: Coupon;
}
export type Coupon = {
    name: string;
    amountOff?: number;
    percentOff?: number;
    promotionCode: string;
    couponId: string;
 }