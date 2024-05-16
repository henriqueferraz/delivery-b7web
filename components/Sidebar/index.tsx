import { useAuthContext } from '@/contexts/auth'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Tenant } from '@/types/Tenant'
import { SidebarMenuItem } from '../SidebarMenuItem'
import { useRouter } from 'next/navigation'

type Props = {
    tenant: Tenant
    open: boolean
    onClose: () => void
}

export const Sidebar = ({ tenant, open, onClose }: Props) => {

    const { user, setToken } = useAuthContext()
    const router = useRouter()
    return (
        <div
            className={styles.container}
            style={{ width: open ? '100vw' : '0' }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div
                        className={styles.loginArea}
                        style={{ borderBottomColor: tenant.mainColor }}
                    >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Último pedido ha X semanas
                            </div>
                        }
                        {!user &&
                            <Button
                                color={tenant.mainColor}
                                label='Fazer login'
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                                fill
                            />
                        }
                    </div>
                    <div
                        className={styles.closeBtn}
                        style={{ color: tenant.mainColor }}
                        onClick={onClose}
                    >X</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    <SidebarMenuItem
                        label='Cardápio'
                        icon='menu'
                        onClick={onClose}
                    />
                    <SidebarMenuItem
                        label='Sacola'
                        icon='cart'
                        onClick={() => router.push(`/${tenant.slug}/cart`)}
                    />
                    <SidebarMenuItem
                        label='Favoritos'
                        icon='fav'
                        onClick={() => { }}
                        disabled
                    />
                    <SidebarMenuItem
                        label='Meus Pedidos'
                        icon='order'
                        onClick={() => router.push(`/${tenant.slug}/orders`)}
                    />
                    <SidebarMenuItem
                        label='Configurações'
                        icon='config'
                        onClick={() => { }}
                        disabled
                    />
                </div>
                <div className={styles.munuButton}>
                    {user &&
                        <SidebarMenuItem
                            label='Sair'
                            icon='logout'
                            onClick={() => {
                                setToken('')
                                onClose()
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}