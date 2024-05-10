import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/AppContext";

import styles from "@/styles/Product-id.module.css";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";


export default function Products(data: Props) {

    //Hucks
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | {data.product.name}</title>
            </Head>
        </div>
    )
}

type Props = {
    tenant: Tenant,
    product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant: tenantSlug, id } = context.query

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
    const product = await api.getProduct(id as string)

    return {
        props: {
            tenant,
            product
        }
    }
}