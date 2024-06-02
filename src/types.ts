import {
  USER_ROLE,
  PRODUCT_STATUS,
  ORDER_STATUS,
  PAYMENT_STATUS,
  SIZES,
  COLORS,
} from "@prisma/client";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: USER_ROLE;
}

export interface Product {
  id?: string;
  name: string;
  // price: number;
  // discount?: number;
  description: string;
  isFeatured?: boolean;
  allowOrderWhenEmpty: boolean;
  variants: {
    variantId?: string;
    size: SIZES;
    color: COLORS;
    stock: number;
    price: number;
    discount?: number;
  }[];
  // TODO: Image add schema fields
  categoryId?: string;
  status: PRODUCT_STATUS;
  createdAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  imageUrl?: string;
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
