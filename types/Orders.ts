import { Address } from "./Address"
import { CartItem } from "./CartItem"

export type Order = {
    id: number
    status: 'preparing' | 'sent' | 'delivered'
    orderDate: string
    userid: string
    shippingAddress: Address
    shippingPrice: number
    paymentType: 'money' | 'card'
    paymantChange?: number
    cupom?: string
    cupomDiscount?: number
    products: CartItem[]
    subtotal: number
    total: number
}