import { useState } from 'react'
import styles from './styles.module.css'
import Searchicon from '@/public/search.svg'
import { useAppContext } from '@/contexts/app'

type Props = {
    onSearch: (serchValue: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
    const { tenant } = useAppContext()

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
            style={{ borderColor: focused ? tenant?.mainColor : '#ffffff' }}
        >
            <div
                className={styles.button}
                onClick={() => onSearch(serchValue)}
            >
                <Searchicon color={tenant?.mainColor} />
            </div>
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