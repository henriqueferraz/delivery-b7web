import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import { Header } from "@/components/Header";
import styles from '@/styles/Login.module.css'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuthContext } from "@/contexts/auth";

export default function Login(data: Props) {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    const router = useRouter()

    const handleSubmit = () => {
        setToken('1234')
        setUser({
            name: 'Maria',
            email: 'ofnet@ofnet.com.br'
        })
        router.push(`/${data.tenant.slug}`)
    }

    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={styles.container}>
            <Head  >
                <title>{data.tenant.name} | Login</title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
            />

            <div className={styles.header}>{data.tenant.name}</div>

            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Use suas credenciais para realizar o login.</div>
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
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={setPassword}
                        password
                    />
                </div>
                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label='Entrar'
                        onClick={handleSubmit}
                        fill={true}
                    />
                </div>
            </div>


            <div
                className={styles.forgetArea}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Esqueceu sua senha?
                <Link href={`/${data.tenant.slug}/forget`}>Clique aqui.</Link>
            </div>
            <div className={styles.line}></div>

            <div className={styles.signupArea}>
                <Button
                    color={data.tenant.mainColor}
                    label='Quero me cadastrar'
                    onClick={handleSignUp}
                />
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