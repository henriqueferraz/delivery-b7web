import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/Myaddresses.module.css";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import { Header } from "@/components/Header";
import { useFormatter } from "@/libs/useFormatter";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { Address } from "@/types/Address";
import { AddressItem } from "@/components/AddressItem";
import { getCookie } from "cookies-next";




export default function MyAddresses(data: Props) {

    //Hucks
    const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()
    const { setToken, setUser } = useAuthContext()

    useEffect(() => {
        setTenant(data.tenant)
        setToken(data.token)
        if (data.user) setUser(data.user)
    }, [])

    const formatter = useFormatter()
    const router = useRouter()

    const api = useApi(data.tenant.slug)

    const handleAddressSelect = async (address: Address) => {
        const price = await api.getShippingPrice(address)
        if (price) {
            setShippingAddress(address)
            setShippingPrice(price)
            router.push(`/${data.tenant.slug}/checkout`)
        }

    }
    const handleAddressEdit = (id: number) => {
        router.push(`/${data.tenant.slug}/address/${id}`)
    }
    const handleAddressDelete = async (id: number) => {
        await api.deleteUserAddress(id)
        router.reload()
    }
    const handleNewAdrress = () => {
        router.push(`/${data.tenant.slug}/address/new`)
    }

    //Eventos do Menu
    const [menuOpened, setMenuOpened] = useState(0)
    const handleMenuEvent = (event: MouseEvent) => {
        const tagName = (event.target as Element).tagName
        if (!['path', 'svg'].includes(tagName)) {
            setMenuOpened(0)
        }
    }
    useEffect(() => {
        window.removeEventListener('click', handleMenuEvent)
        window.addEventListener('click', handleMenuEvent)
        return () => window.removeEventListener('click', handleMenuEvent)
    }, [menuOpened])

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Meus Endereços</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}/checkout`}
                color={data.tenant.mainColor}
                title="Meus Endereços"
            />
            <div className={styles.list}>
                {data.addresses.map((item, index) => (
                    <AddressItem
                        key={index}
                        color={data.tenant.mainColor}
                        address={item}
                        onSelect={handleAddressSelect}
                        onEdit={handleAddressEdit}
                        onDelete={handleAddressDelete}
                        menuOpened={menuOpened}
                        setMenuOpened={setMenuOpened}

                    />
                ))}
            </div>
            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Novo Endereço"
                    onClick={handleNewAdrress}
                    fill
                />
            </div>
        </div >
    )
}

type Props = {
    tenant: Tenant
    token: string
    user: User | null
    addresses: Address[]
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
    const token = getCookie('token', context)
    const user = await api.autorizeToken(token as string)
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    //Get My Address
    const addresses = await api.getUserAddresses(user.email)

    return {
        props: {
            tenant,
            user,
            token,
            addresses
        }
    }
}