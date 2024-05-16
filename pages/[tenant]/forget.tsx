import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { Header } from "@/components/Header";
import styles from '@/styles/Forget.module.css'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import Head from "next/head";



export default function Forget(data: Props) {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    const router = useRouter()

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/forgetSuccess`)
    }
    const [email, setEmail] = useState('')


    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Recuperar Senha</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}/login`}
                color={data.tenant.mainColor}
            />
            <div className={styles.header}>{data.tenant.name}</div>
            <div className={styles.title}>Esqueceu sua senha?</div>
            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Preencha o campo com seu e-mail e receba as intruções necessárias para redefinir sua senha.</div>
            <div className={styles.line}></div>
            <div className={styles.formArea}>

                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={setEmail}
                    />
                </div>
                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label='Enviar'
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