import { Icon } from '../Icon'
import styles from './styles.module.css'

type Props = {
    color: string
    leftIcon?: string
    rightIcon?: string
    value: string
    onClick?: () => void
    fill?: boolean
}

export const ButtonWithIcon = ({ color, leftIcon, rightIcon, value, onClick, fill }: Props) => {
    return (
        <div
            className={styles.container}
            style={{ backgroundColor: fill ? color : '#f9f9fb' }}
            onClick={onClick}
        >
            {leftIcon &&
                <div
                    className={styles.leftSide}
                    style={{ backgroundColor: fill ? 'rgba(0,0,0, .05' : '#fff' }}
                >
                    <Icon
                        color={fill ? '#fff' : color}
                        icon={leftIcon}
                        width={24}
                        height={24}
                    />
                </div>
            }
            <div
                className={styles.centerSide}
                style={{ color: fill ? '#fff' : '#1b1b1b' }}
            >
                {value}</div>
            {rightIcon &&
                <div
                    className={styles.rightSide}
                >
                    <Icon
                        color={fill ? '#fff' : color}
                        icon={rightIcon}
                        width={24}
                        height={24}
                    />
                </div>
            }
        </div>
    )
}