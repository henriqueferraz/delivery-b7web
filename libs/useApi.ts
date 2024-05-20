import { Tenant } from "@/types/Tenant";
import { Product } from "@/types/Product";
import { User } from "@/types/User";
import { CartItem } from "@/types/CartItem";
import { Address } from "@/types/Address";
import { Order } from "@/types/Orders";

const TemporaryOneProduct: Product = {
    id: 1,
    image: '/burger.png',
    categoryName: 'Tradicional',
    name: 'Golden Burger',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

const TEMPORARYorder: Order = {
    id: 123,
    status: 'preparing',
    orderDate: '2024/03/03',
    userid: '123',
    shippingAddress: {
        id: 2,
        street: 'Av. Brasil',
        number: '200',
        cep: '12345678',
        city: 'São Paulo',
        neighborhood: 'Iririu',
        state: 'RS'
    },
    shippingPrice: 9.14,
    paymentType: 'card',
    cupom: 'teste',
    cupomDiscount: 14.30,
    subtotal: 204,
    total: 198.84,
    products: [
        { product: { ...TemporaryOneProduct, id: 1 }, qt: 1 },
        { product: { ...TemporaryOneProduct, id: 2 }, qt: 2 },
        { product: { ...TemporaryOneProduct, id: 3 }, qt: 1 },
    ]
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
    },

    getUserAddresses: async (email: string) => {
        const addresses: Address[] = []
        for (let i = 0; i < 6; i++) {
            addresses.push({
                id: i + 1,
                street: 'Av. Brasil',
                number: `${i + 1}00`,
                cep: '999999999',
                city: 'Joinville',
                neighborhood: 'Iririu',
                state: 'SP',
                complement: 'Casa 04'
            })
        }
        return addresses
    },
    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Av. Brasil',
            number: `${addressid}00`,
            cep: '999999999',
            city: 'Joinville',
            neighborhood: 'Iririu',
            state: 'SP',
            complement: 'Casa 04'
        }
        return address
    },
    addUserAddress: async (address: Address) => {
        console.log(address)
        return { ...address, id: 9 }
    },
    getShippingPrice: async (address: Address) => {
        return 9.16
    },
    editUserAddress: async (newAddressData: Address) => {
        return true
    },
    deleteUserAddress: async (addresid: number) => {
        return true
    },
    setOrder: async (
        address: Address,
        paymentType: 'money' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]
    ) => {
        return TEMPORARYorder
    },
    getOrder: async (orderid: number) => {
        return TEMPORARYorder
    }
})