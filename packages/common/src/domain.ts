export type OrderId = string;

export interface OrderCreated {
  orderId: OrderId;
  createdAt: Date;
  srcChain: string;
  dstChain: string;
  token: string;
  amount: number;
}

export interface OrderFulfilled {
  orderId: OrderId;
  fulfilledAt: Date;
}

export interface Order {
  orderId?: OrderId;
  createdAt: Date;
  fulfilledAt?: Date;
  srcChain: string;
  dstChain: string;
  token: string;
  amount: number;
  usdAmount: number;
}