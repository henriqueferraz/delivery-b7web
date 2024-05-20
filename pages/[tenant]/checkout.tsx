import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/Checkout.module.css";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import { Header } from "@/components/Header";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { useFormatter } from "@/libs/useFormatter";
import { getCookie, setCookie } from "cookies-next";
import { CartItem } from "@/types/CartItem";
import { useRouter } from "next/router";
import { CartProductItem } from "@/components/CartProductItem";
import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { Address } from "@/types/Address";



export default function Checkout(data: Props) {

    //Hucks
    const { tenant, setTenant, shippingAddress, shippingPrice } = useAppContext()
    const { setToken, setUser } = useAuthContext()

    useEffect(() => {
        setTenant(data.tenant)
        setToken(data.token)
        if (data.user) setUser(data.user)
    }, [])

    const formatter = useFormatter()
    const router = useRouter()
    const api = useApi(data.tenant.slug)

    //Controle de Produto
    const [cart, setCart] = useState<CartItem[]>(data.cart)

    //Frete

    const handleChangeAddress = () => {
        router.push(`/${data.tenant.slug}/myaddresses`)
    }

    //Pagamentos
    const [paymentType, setPaymentType] = useState<'money' | 'card'>('money')
    const [paymentChange, setPaymentChange] = useState(0)

    //Cupom
    const [cupom, setCupom] = useState('')
    const [cupomDiscount, setCupomDiscount] = useState(0)
    const [cupomInput, setCupomInput] = useState('')
    const handleSetCupom = () => {
        if (cupomInput) {
            setCupom(cupomInput)
            setCupomDiscount(15.2)
        }
    }

    //Resumo
    const [subtotal, setSubtotal] = useState(0)
    useEffect(() => {
        let sub = 0
        for (let i in cart) {
            sub += cart[i].product.price * cart[i].qt
        }
        setSubtotal(sub)
    }, [cart])
    const handleFinish = async () => {
        if (shippingAddress) {
            const order = await api.setOrder(
                shippingAddress,
                paymentType,
                paymentChange,
                cupom,
                data.cart
            )
            if (order) {
                router.push(`/${data.tenant.slug}/order/${order.id}`)
            } else {
                alert('Ocorreu um erro! Tente mais tarde!')
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Checkout</title>
            </Head>
            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title="Checkout"
            />

            <div className={styles.infoGroup}>
                <div className={styles.infoArea}>
                    <div className={styles.infoTitle}>Endereço</div>
                    <div className={styles.infoBody}>
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            leftIcon={'location'}
                            rightIcon={'rightarrow'}
                            value={shippingAddress ? `${shippingAddress.street}, ${shippingAddress.number} - ${shippingAddress.city}` : 'Selecione um endereço'}
                            onClick={handleChangeAddress}
                        />
                    </div>
                </div>
                <div className={styles.infoArea}>
                    <div className={styles.infoTitle}>Tipo de Pagamento</div>
                    <div className={styles.infoBody}>
                        <div className={styles.paymentsTypes}>
                            <div className={styles.paymentBtn}>
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    leftIcon={'money'}
                                    value={'Dinheiro'}
                                    onClick={() => setPaymentType('money')}
                                    fill={paymentType === 'money'}
                                />
                            </div>
                            <div className={styles.paymentBtn}>
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    leftIcon={'card'}
                                    value={'Cartão'}
                                    onClick={() => setPaymentType('card')}
                                    fill={paymentType === 'card'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {paymentType === 'money' &&
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>Troco</div>
                        <div className={styles.infoBody}>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder='Quanto tem em dinheiro?'
                                value={paymentChange ? paymentChange.toString() : ''}
                                onChange={newValue => setPaymentChange(parseInt(newValue))}
                            />
                        </div>
                    </div>
                }
                <div className={styles.infoArea}>
                    <div className={styles.infoTitle}>Cupom de desconto</div>
                    <div className={styles.infoBody}>
                        {cupom &&
                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                leftIcon="cupom"
                                rightIcon="checked"
                                value={cupom.toUpperCase()}
                            />
                        }
                        {!cupom &&
                            <div className={styles.cupomInput}>
                                <InputField
                                    color={data.tenant.mainColor}
                                    placeholder="Tem um cupom?"
                                    value={cupomInput}
                                    onChange={newValue => setCupomInput(newValue)}
                                />
                                <Button
                                    color={data.tenant.mainColor}
                                    label="OK"
                                    onClick={handleSetCupom}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.productsQuantity}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>
            <div className={styles.productsList}>
                {cart.map((cartItem, index) => (
                    <CartProductItem
                        key={index}
                        color={data.tenant.mainColor}
                        quantity={cartItem.qt}
                        product={cartItem.product}
                        onChange={() => { }}
                        noEdit
                    />
                ))}
            </div>
            <div className={styles.resumeArea}>
                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Subtotal</div>
                    <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
                </div>
                {cupomDiscount > 0 &&
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Desconto</div>
                        <div className={styles.resumeRight}>-{formatter.formatPrice(cupomDiscount)}</div>
                    </div>
                }
                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Frete</div>
                    <div className={styles.resumeRight}>
                        {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
                    </div>
                </div>
                <div className={styles.resumeLine}></div>
                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Total</div>
                    <div
                        className={styles.resumeRightBig}
                        style={{ color: data.tenant.mainColor }}
                    >
                        {formatter.formatPrice((shippingPrice - cupomDiscount) + subtotal)}
                    </div>
                </div>
                <div className={styles.resumeButton}>

                    <Button
                        color={data.tenant.mainColor}
                        label="Finalizar Pedido"
                        onClick={handleFinish}
                        fill
                        disabled={!shippingAddress}
                    />
                </div>
            </div>
        </div >
    )
}

type Props = {
    tenant: Tenant
    token: string
    user: User | null
    cart: CartItem[]
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

    //GET Cart Products
    const cartCookie = getCookie('cart', context)
    const cart = await api.getCartProducts(cartCookie as string)

    return {
        props: {
            tenant,
            user,
            token,
            cart
        }
    }
}