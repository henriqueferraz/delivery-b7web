import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/Cart.module.css";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import { Header } from "@/components/Header";



export default function Cart(data: Props) {

    //Hucks
    const { tenant, setTenant } = useAppContext()
    const { setToken, setUser } = useAuthContext()

    useEffect(() => {
        setTenant(data.tenant)
        setToken(data.token)
        if (data.user) setUser(data.user)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Sacola</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title="Sacola"
            />
            <div className={styles.productsQuantity}>x itens</div>
            <div className={styles.productsList}></div>

        </div>
    )
}

type Props = {
    tenant: Tenant
    products: Product[]
    token: string
    user: User | null
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

    //Get Logged User
    const token = context.req.cookies.token
    const user = await api.autorizeToken(token as string)

    //GET Products
    const products = await api.getAllProducts()

    return {
        props: {
            tenant,
            products,
            user,
            token
        }
    }
}