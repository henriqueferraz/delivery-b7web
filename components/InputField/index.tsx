import styles from './styles.module.css'
import BtnEyeOn from '@/public/EyeOn.svg'
import BtnEyeOff from '@/public/EyeOff.svg'
import { useState } from 'react'

type Props = {
    color: string
    placeholder: string
    value: string
    onChange: (newValue: string) => void
    password?: boolean
}

export const InputField = ({ color, placeholder, value, onChange, password }: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)

    return (
        <div
            className={styles.container}
            style={{
                borderColor: focused ? color : '#f9f9fb',
                backgroundColor: focused ? '#fff' : '#f9f9fb'
            }}
        >
            <input
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {password &&
                <div
                    className={styles.showPassword}
                    onClick={() => { setShowPassword(!showPassword) }}
                >
                    {showPassword && <BtnEyeOn color="#bbb" />}
                    {!showPassword && <BtnEyeOff color="#bbb" />}
                </div>
            }
        </div>
    )
}