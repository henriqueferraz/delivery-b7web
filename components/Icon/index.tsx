import MailSend from '@/public/emailSend.svg'
import Card from '@/public/assets/card.svg'
import Checked from '@/public/assets/check.svg'
import Cupom from '@/public/assets/cupon.svg'
import Location from '@/public/assets/location.svg'
import Money from '@/public/assets/money.svg'
import Rightarrow from '@/public/assets/rightarow.svg'
import Dots from '@/public/assets/dots.svg'
import Edit from '@/public/assets/edit.svg'
import Delete from '@/public/assets/delete.svg'

type Props = {
    icon: string
    color: string
    width: number
    height: number
}

export const Icon = ({ icon, color, width, height }: Props) => {
    return (
        <div style={{ width, height }}>
            {icon === 'emailSend' && <MailSend color={color} />}
            {icon === 'card' && <Card color={color} />}
            {icon === 'checked' && <Checked color={color} />}
            {icon === 'cupom' && <Cupom color={color} />}
            {icon === 'location' && <Location color={color} />}
            {icon === 'money' && <Money color={color} />}
            {icon === 'rightarrow' && <Rightarrow color={color} />}
            {icon === 'dots' && <Dots color={color} />}
            {icon === 'delete' && <Delete color={color} />}
            {icon === 'edit' && <Edit color={color} />}
        </div>
    )
}