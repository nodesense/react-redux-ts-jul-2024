import { CartItemModel } from "./CartItemModel";

export interface CartListModel {
    items: CartItemModel[];
    amount: number;
    totalItems: number;
}
