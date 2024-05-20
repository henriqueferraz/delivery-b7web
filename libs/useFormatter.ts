export const useFormatter = () => ({

    formatPrice: (price: number) => {
        return price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        })
    },
    formatQuantity: (qt: number, digits: number) => {
        if (qt < 10) {
            return `${'0'.repeat(digits)}${qt}`
        } else {
            return qt
        }
    },
    formatDate: (date: string) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(`${date} 00:00:00`))
    }
})