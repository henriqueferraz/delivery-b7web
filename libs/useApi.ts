import { Tenant } from "@/types/Tenant";
import { Product } from "@/types/Product";

const TemporaryOneProduct: Product = {
    id: 1,
    image: '/hamb-2.png',
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
                    mainColor: '#ff0000',
                    secondColor: '#FB9400'
                }

                break;
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#0000ff',
                    secondColor: '#ff0000'
                }

                break;
            default: return false;
        }
    },

    getAllProducts: async () => {
        let products = []
        for (let q = 0; q < 10; q++) {
            products.push(TemporaryOneProduct)
        }
        return products
    },

    getProduct: async (id: string) => {
        return TemporaryOneProduct
    }
})