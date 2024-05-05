import { Tenant } from "@/types/Tenant"
import { createContext, ReactNode, useContext, useState } from "react"

type appConttextType = {
    tenant: Tenant | null
    setTenant: (newTenant: Tenant) => void
}

const defaultValues: appConttextType = {
    tenant: null,
    setTenant: () => null
}

const appContext = createContext<appConttextType>(defaultValues)

export const useAppContext = () => {
    return useContext(appContext)
}

type Props = {
    children: ReactNode
}

export const AppContextProvider = ({ children }: Props) => {

    const [tenant, setTenant] = useState<Tenant | null>(null)

    return (
        <appContext.Provider value={{ tenant, setTenant }}>
            {children}
        </appContext.Provider>
    )
}