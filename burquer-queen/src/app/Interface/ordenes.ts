import { Product } from "../Interface/producto";

export interface Orders {
    id: number;
    userId: number;
    client: string;
    products: { qty: number; product: Product}[];
    status: string;
    dataEntry: string;
    dateProcessed?: string; 
  }