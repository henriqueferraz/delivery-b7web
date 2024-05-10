import MailSend from '@/public/emailSend.svg'

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
        </div>
    )
}