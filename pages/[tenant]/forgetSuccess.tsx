import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { Header } from "@/components/Header";
import styles from '@/styles/ForgetSuccess.module.css'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { Icon } from "@/components/Icon";
import Head from "next/head";



export default function ForgetSuccess(data: Props) {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    const router = useRouter()

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/login`)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Verifique seu e-mail</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}/forget`}
                color={data.tenant.mainColor}
            />

            <div className={styles.iconArea}>
                <Icon
                    icon="emailSend"
                    color={data.tenant.mainColor}
                    width={99}
                    height={81}
                />
            </div>

            <div className={styles.title}>Verifique seu email</div>
            <div className={styles.subtitle}>
                Enviamos as instruções para recuperação de senha para o seu e-mail.
            </div>


            <div className={styles.formArea}>

                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label='Fazer Login'
                        onClick={handleSubmit}
                        fill={true}
                    />
                </div>
            </div>
        </div >
    )
}

type Props = {
    tenant: Tenant
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

    return {
        props: {
            tenant
        }
    }
}