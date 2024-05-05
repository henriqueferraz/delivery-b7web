import { Product } from '@/types/Product'
import styles from './styles.module.css'
import Link from 'next/link'
import { useAppContext } from '@/contexts/AppContext'

type Props = {
    data: Product

}

export const ProductItem = ({ data }: Props) => {
    const { tenant } = useAppContext()

    return (
        <Link href={`/${tenant?.slug}/product/${data.id}`} className={styles.container}>
            <div className={styles.container}>
                <div className={styles.head} style={{ backgroundColor: tenant?.secondColor }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image} alt="" />
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.nameName}>{data.name}</div>
                    <div className={styles.priceName} style={{ color: tenant?.mainColor }}>{data.price}</div>
                </div>
            </div>
        </Link>
    )
}