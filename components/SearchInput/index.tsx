import { useState } from 'react'
import styles from './styles.module.css'

type Props = {
    mainColor: string
    onSearch: (serchValue: string) => void
}

export const SearchInput = ({ mainColor, onSearch }: Props) => {

    const [focused, setFocused] = useState(false)
    const [serchValue, setSearchValue] = useState('')

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.code === 'Enter') {
            onSearch(serchValue)
        }
    }

    return (
        <div
            className={styles.container}
            style={{ borderColor: focused ? mainColor : '#fff' }}
        >
            <div
                className={styles.button}
                onClick={() => onSearch(serchValue)}
            ></div>
            <input
                type="text"
                className={styles.input}
                placeholder='Digite o nome do produto'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
                value={serchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div >
    )
}