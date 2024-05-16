import style from './styles.module.css'
import CartIcon from '@/public/assets/sacola.svg'
import ConfigIcon from '@/public/assets/configuracoes.svg'
import FavIcon from '@/public/assets/favoritos.svg'
import LogoutIcon from '@/public/assets/sair.svg'
import MenuIcon from '@/public/assets/cardapio.svg'
import OrderIcon from '@/public/assets/pedidos.svg'

type Props = {
    color?: string
    label: string
    icon: 'cart' | 'config' | 'fav' | 'logout' | 'menu' | 'order'
    onClick: () => void
    disabled?: boolean
}

export const SidebarMenuItem = ({ color, label, icon, onClick, disabled }: Props) => {
    return (
        <div className={style.container} onClick={onClick}>
            {icon === 'cart' && <CartIcon />}
            {icon === 'config' && <ConfigIcon />}
            {icon === 'fav' && <FavIcon />}
            {icon === 'logout' && <LogoutIcon />}
            {icon === 'menu' && <MenuIcon />}
            {icon === 'order' && <OrderIcon />}
            <span className={disabled ? style.disabled : ''}>{label}</span>
        </div>
    )
}