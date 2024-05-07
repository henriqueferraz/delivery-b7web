import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/AppContext";
import { Header } from "@/components/Header";
import styles from '@/styles/Signup.module.css'

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";



export default function SignUp(data: Props) {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [])

    const router = useRouter()

    const handleSubmit = () => {

    }

    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`)
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <div className={styles.container}>

            <Header
                backHref={`/${data.tenant.slug}/login`}
                color={data.tenant.mainColor}
            />

            <div className={styles.header}>{data.tenant.name}</div>

            <div
                className={styles.subtitle}
                style={{ borderBottomColor: data.tenant.mainColor }}
            >
                Preencha os campos para criar o seu cadastro.</div>
            <div className={styles.line}>

            </div>

            <div className={styles.formArea}>
                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={setName}
                    />
                </div>

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
                        label='Cadastrar'
                        onClick={handleSubmit}
                        fill={true}
                    />
                </div>
            </div>


            <div
                className={styles.forgetArea}
            >Já tem cadastro?
                <Link href={`/${data.tenant.slug}/login`}>Fazer Login.</Link>
            </div>
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