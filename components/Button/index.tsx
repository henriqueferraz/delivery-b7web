import styles from './style.module.css'

type Props = {
    color: string
    label: string
    onClick: () => void
    fill?: boolean
}

export const Button = ({ color, label, onClick, fill }: Props) => {
    return (
        <div
            onClick={onClick}
            className={styles.container}
            style={{
                color: fill ? '#fff' : color,
                borderColor: color,
                backgroundColor: fill ? color : 'transparent'
            }}
        >
            {label}
        </div>
    )
}