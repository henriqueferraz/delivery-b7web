import { Banner } from "@/components/Banner";
import { ProductItem } from "@/components/ProductItem";
import { SearchInput } from "@/components/SearchInput/index";
import { useApi } from "@/libs/useApi";
import { Tenant } from "@/types/Tenant";
import { useAppContext } from "@/contexts/app";
import styles from "@/styles/Home.module.css";
import { Menu } from "lucide-react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import Head from "next/head";
import { Sidebar } from "@/components/Sidebar";
import { User } from "@/types/User";
import { useAuthContext } from "@/contexts/auth";
import NoItenmsIcon from '@/public/noitems.svg'


export default function Home(data: Props) {

    //Hucks
    const { tenant, setTenant } = useAppContext()
    const { setToken, setUser } = useAuthContext()

    useEffect(() => {
        setTenant(data.tenant)
        setToken(data.token)
        if (data.user) setUser(data.user)
    }, [])

    const [products, setProducts] = useState<Product[]>(data.products)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    //àrea Search
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [searchText, setSearchText] = useState('')
    const handleSearch = (value: string) => {
        setSearchText(value)
    }
    useEffect(() => {
        let newFilteredProducts: Product[] = []
        for (let product of data.products) {
            if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                newFilteredProducts.push(product)
            }
        }
        setFilteredProducts(newFilteredProducts)
    }, [searchText])


    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} | Principal</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>
                            Seja Bem-Vindo (a)
                            <img src="/app_header.png" alt="Delivery" width="25" height="25" />
                        </div>
                        <div className={styles.headerSubTitle}>
                            O que deseja para hoje?
                        </div>
                    </div>
                    <div className={styles.headerTopRight} style={{ color: tenant?.mainColor }}>
                        <Menu
                            onClick={() => setSidebarOpen(true)}
                        />
                        <Sidebar
                            tenant={data.tenant}
                            open={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
                <div className={styles.headetButton}>
                    <SearchInput
                        onSearch={handleSearch}
                    />
                </div>
            </header>
            {searchText &&
                <>
                    <div className={styles.searchText}>
                        Procurando por: <strong>{searchText}</strong>
                    </div>
                    {filteredProducts.length > 0 &&
                        <div className={styles.grid}>
                            {filteredProducts.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    data={item}
                                />
                            ))}
                        </div>
                    }
                    {filteredProducts.length === 0 &&
                        <div className={styles.noProdutcs}>
                            <NoItenmsIcon color='#e0e0e0' />
                            <div className={styles.noProdutcsText}>Ops! não há itens com este nome.</div>
                        </div>
                    }

                </>
            }

            {!searchText &&
                <>
                    <Banner />
                    <div className={styles.grid}>
                        {products.map((item, index) => (
                            <ProductItem
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
                </>
            }

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