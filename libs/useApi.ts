import { Tenant } from "@/types/Tenant";

export const useApi = () => ({
    // Api Tenant (Nome do Cliente)
    getTenant: (tenantSlug: string): boolean | Tenant => {
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
    }
})