export interface Order {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shippingAddress: ShippingAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subTotal: number;
    total: number;
    discount?: number
    status: string;
    paymentSummary: PaymentSummary;
    paymentIntentId: string;
}



export interface ShippingAddress {
    name: string;
    line1: string;
    line2?: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface PaymentSummary {
    last4: number;
    expMonth: number;
    expYear: number;
    brand: string;
}

export interface OrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface OrderToCreate {
    cartId: string;
    deliveryMethodId: number;
    shippingAddress: ShippingAddress;
    paymentsummary: PaymentSummary;
    discount?: number
}