import styles from './style.module.css'

type Props = {
    color: string
    label: string
    onClick: () => void
    fill?: boolean
    disabled?: boolean
}

export const Button = ({ color, label, onClick, fill, disabled }: Props) => {
    return (
        <div
            onClick={!disabled ? onClick : () => { }}
            className={styles.container}
            style={{
                color: fill ? '#fff' : color,
                borderColor: color,
                backgroundColor: fill ? color : 'transparent',
                opacity: disabled ? .4 : 1
            }}
        >
            {label}
        </div>
    )
}