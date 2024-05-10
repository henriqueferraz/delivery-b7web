import { Banner } from "@/components/Banner";
import { ProductItem } from "@/components/ProductItem";
import { SearchInput } from "@/components/SearchInput/index";

import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/AppContext";

import styles from "@/styles/Home.module.css";

import { Menu } from "lucide-react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";


export default function Home(data: Props) {

    //Hucks
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    const [products, setProducts] = useState<Product[]>(data.products)


    const handleSearch = (searchValue: string) => {
        console.log(searchValue)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Principal</title>
            </Head>
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

                    {products.map((item, index) => (
                        <ProductItem
                            key={index}
                            data={item}
                        />
                    ))}


                </div>
            </div>
        </div>
    )
}

type Props = {
    tenant: Tenant,
    products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant: tenantSlug } = context.query

    const api = useApi(tenantSlug as string)

    //GET Tenant
    const tenant = await api.getTenant()
    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    //GET Products
    const products = await api.getAllProducts()

    return {
        props: {
            tenant,
            products
        }
    }
}