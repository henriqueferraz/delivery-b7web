import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/NewAddress.module.css";
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




export default function NewAddress(data: Props) {

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

    const [addressCep, setAddressCep] = useState<string>('')
    const [addressStreet, setAddressStreet] = useState<string>('')
    const [addressNumber, setAddressNumber] = useState<string>('')
    const [addressNeighborhood, setAddressNeighborhood] = useState<string>('')
    const [addressCity, setAddressCity] = useState<string>('')
    const [addressState, setAddressState] = useState<string>('')
    const [addressComplement, setAddressComplement] = useState<string>('')

    const [errorFields, setErrorFileds] = useState<string[]>([])

    const verifyAddress = () => {
        let newErrorFields = []
        let approved = true
        //CEP
        if (addressCep.replaceAll(/[^0-9]/g, '').length !== 8) {
            newErrorFields.push('cep')
            approved = false
        }
        //Rua
        if (addressStreet.length <= 2) {
            newErrorFields.push('street')
            approved = false
        }
        //Bairro
        if (addressNeighborhood.length <= 2) {
            newErrorFields.push('neighborhood')
            approved = false
        }
        //Cidade
        if (addressCity.length <= 2) {
            newErrorFields.push('city')
            approved = false
        }
        //Estado
        if (addressState.length < 2) {
            newErrorFields.push('state')
            approved = false
        }

        setErrorFileds(newErrorFields)
        return approved
    }
    const handleNewAdrress = async () => {
        if (verifyAddress()) {
            let address: Address = {
                id: 0,
                cep: addressCep,
                street: addressStreet,
                number: addressNumber,
                neighborhood: addressNeighborhood,
                city: addressCity,
                state: addressState,
                complement: addressComplement
            }
            let newAddress = await api.addUserAddress(address)
            if (newAddress.id > 0) {
                router.push(`/${data.tenant.slug}/myaddresses`)
            } else {
                alert('Ocorreu um erro! Tente mais tarde')
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Novo Endereço</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}/myaddresses`}
                color={data.tenant.mainColor}
                title="Novo Endereço"
            />
            <div className={styles.inputs}>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>CEP</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite seu CEP"
                            value={addressCep}
                            onChange={value => setAddressCep(value)}
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
                            value={addressStreet}
                            onChange={value => setAddressStreet(value)}
                            warning={errorFields.includes('street')}
                        />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Número</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o número"
                            value={addressNumber}
                            onChange={value => setAddressNumber(value)}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Bairro</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite um bairro"
                            value={addressNeighborhood}
                            onChange={value => setAddressNeighborhood(value)}
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
                            value={addressCity}
                            onChange={value => setAddressCity(value)}
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
                            value={addressState}
                            onChange={value => setAddressState(value)}
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
                            value={addressComplement}
                            onChange={value => setAddressComplement(value)}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Adicionar"
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