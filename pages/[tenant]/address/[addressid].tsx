import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/EditAddress.module.css";
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
import { getCookie } from "cookies-next";
import { InputField } from "@/components/InputField";




export default function EditAddress(data: Props) {

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

    const [errorFields, setErrorFileds] = useState<string[]>([])
    const [address, setAddress] = useState<Address>(data.address)

    const changeAddressField = async (
        field: keyof Address,
        value: typeof address[keyof Address]
    ) => {
        setAddress({ ...address, [field]: value })
    }

    const verifyAddress = () => {
        let newErrorFields = []
        let approved = true
        //CEP
        if (address.cep.replaceAll(/[^0-9]/g, '').length !== 8) {
            newErrorFields.push('cep')
            approved = false
        }
        //Rua
        if (address.street.length <= 2) {
            newErrorFields.push('street')
            approved = false
        }
        //Bairro
        if (address.neighborhood.length <= 2) {
            newErrorFields.push('neighborhood')
            approved = false
        }
        //Cidade
        if (address.city.length <= 2) {
            newErrorFields.push('city')
            approved = false
        }
        //Estado
        if (address.state.length < 2) {
            newErrorFields.push('state')
            approved = false
        }

        setErrorFileds(newErrorFields)
        return approved
    }
    const handleSaveAddress = async () => {
        if (verifyAddress()) {
            await api.editUserAddress(address)
            router.push(`/${data.tenant.slug}/myaddresses`)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Editar Endereço</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}/myaddresses`}
                color={data.tenant.mainColor}
                title="Editar Endereço"
            />
            <div className={styles.inputs}>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>CEP</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite seu CEP"
                            value={address.cep}
                            onChange={value => changeAddressField('cep', value)}
                            warning={errorFields.includes('cep')}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Rua</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite uma rua"
                            value={address.street}
                            onChange={value => changeAddressField('street', value)}
                            warning={errorFields.includes('street')}
                        />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Número</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o número"
                            value={address.number}
                            onChange={value => changeAddressField('number', value)}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Bairro</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite um bairro"
                            value={address.neighborhood}
                            onChange={value => changeAddressField('neighborhood', value)}
                            warning={errorFields.includes('neighborhood')}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Cidade</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite uma cidade"
                            value={address.city}
                            onChange={value => changeAddressField('city', value)}
                            warning={errorFields.includes('city')}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Estado</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite um estado"
                            value={address.state}
                            onChange={value => changeAddressField('state', value)}
                            warning={errorFields.includes('state')}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Complemento</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite um complemento"
                            value={address.complement ?? ''}
                            onChange={value => changeAddressField('complement', value)}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Atualizar"
                    onClick={handleSaveAddress}
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
    address: Address
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { tenant: tenantSlug, addressId } = context.query
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
    //Get Address
    const address = await api.getUserAddress(parseInt(addressId as string))
    if (!address) {
        return {
            redirect: {
                destination: '/myaddresses',
                permanent: false
            }
        }
    }

    return {
        props: {
            tenant,
            user,
            token,
            address
        }
    }
}