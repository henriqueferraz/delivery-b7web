import { Banner } from "@/components/Banner";
import { ProductItem } from "@/components/ProductItem";
import { SearchInput } from "@/components/SearchInput/index";

import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/AppContext";

import styles from "@/styles/Home.module.css";

import { Menu } from "lucide-react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";


export default function Home(data: Props) {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])


    const handleSearch = (searchValue: string) => {
        console.log(searchValue)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>
                            Seja Bem-Vindo (a)
                            <img src="/app_header.png" alt="Delivery" width="25" height="25" />
                        </div>
                        <div className={styles.headerSubTitle}>
                            O que deseja para hoje?
                        </div>
                    </div>
                    <div className={styles.headerTopRight} style={{ color: tenant?.mainColor }}>
                        <Menu />
                    </div>
                </div>
                <div className={styles.headetButton}>
                    <SearchInput
                        onSearch={handleSearch}
                    />
                </div>
            </header>
            <div>
                <Banner />
                <div className={styles.grid}>
                    <ProductItem
                        data={{
                            id: 1,
                            image: '/burger.png',
                            categoryName: 'Tradicional',
                            name: 'Texas Burger',
                            price: 'R$25,50'
                        }}
                    />
                    <ProductItem
                        data={{
                            id: 1,
                            image: '/burger.png',
                            categoryName: 'Tradicional',
                            name: 'Texas Burger',
                            price: 'R$25,50'
                        }}
                    />
                    <ProductItem
                        data={{
                            id: 1,
                            image: '/burger.png',
                            categoryName: 'Tradicional',
                            name: 'Texas Burger',
                            price: 'R$25,50'
                        }}
                    />
                    <ProductItem
                        data={{
                            id: 1,
                            image: '/burger.png',
                            categoryName: 'Tradicional',
                            name: 'Texas Burger',
                            price: 'R$25,50'
                        }}
                    />
                    <ProductItem
                        data={{
                            id: 1,
                            image: '/burger.png',
                            categoryName: 'Tradicional',
                            name: 'Texas Burger',
                            price: 'R$25,50'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant: tenantSlug } = context.query

    const api = useApi()
    //GET Tenant
    const tenant = await api.getTenant(tenantSlug as string)
    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            tenant
        }
    }
}