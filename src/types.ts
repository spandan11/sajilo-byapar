import {
  USER_ROLE,
  PRODUCT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@prisma/client";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: USER_ROLE;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  inventory: string;
  status: PRODUCT_STATUS;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerName: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
  createdAt: number;
}
