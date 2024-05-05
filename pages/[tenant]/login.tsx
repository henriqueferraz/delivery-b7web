import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/AppContext";
import { Header } from "@/components/Header";
import styles from '@/styles/Login.module.css'

import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Head from "next/head";



export default function Login(data: Props) {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | {data.tenant.name}</title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
            />
        </div >
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