import { Tenant } from "@/types/Tenant";
import { Product } from "@/types/Product";
import { User } from "@/types/User";
import { CartItem } from "@/types/CartItem";

const TemporaryOneProduct: Product = {
    id: 1,
    image: '/burger.png',
    categoryName: 'Tradicional',
    name: 'Golden Burger',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

export const useApi = (tenantSlug: string) => ({
    // Api Tenant (Nome do Cliente)
    getTenant: async () => {
        switch (tenantSlug) {
            case 'b7burger':
                return {
                    slug: 'b7burger',
                    name: 'B7Burger',
                    mainColor: '#fb9400',
                    secondColor: '#fff9f2'
                }

                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#6ab70a',
                    secondColor: 'currentColor'
                }

                break;
            default: return false;
        }
    },

    getAllProducts: async () => {
        let products = []
        for (let q = 0; q < 6; q++) {
            products.push({
                ...TemporaryOneProduct,
                id: q + 1
            })
        }
        return products
    },

    getProduct: async (id: number) => {
        return {
            ...TemporaryOneProduct,
            id
        }
    },
    autorizeToken: async (token: string): Promise<User | false> => {
        if (!token) return false

        return {
            name: 'Maria',
            email: 'ofnet@ofnet.com.br'
        }
    },
    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = []

        if (!cartCookie) return cart
        const cartJson = JSON.parse(cartCookie)
        for (let i in cartJson) {
            if (cartJson[i].id && cartJson[i].qt) {
                const product = {
                    ...TemporaryOneProduct,
                    id: cartJson[i].id
                }
                cart.push({
                    qt: cartJson[i].qt,
                    product
                })
            }
        }
        return cart
    }
})