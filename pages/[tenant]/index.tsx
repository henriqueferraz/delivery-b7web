import { Banner } from "@/components/Banner";
import { SearchInput } from "@/components/SearchInput/index";
import styles from "@/styles/Home.module.css";
import { Menu } from "lucide-react";

export default function Home() {

    const handleSearch = (searchValue: string) => {
        console.log(searchValue)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>
                            Seja Bem-Vindo (a)
                            <img src="/app_header.png" alt="Delivery" width="25" height="25" />
                        </div>
                        <div className={styles.headerSubTitle}>O que deseja para hoje?</div>
                    </div>
                    <div className={styles.headerTopRight}>
                        <Menu />
                    </div>
                </div>
                <div className={styles.headetButton}>
                    <SearchInput
                        mainColor="#fb9400"
                        onSearch={handleSearch}
                    />
                </div>
            </header>
            <div>
                <Banner />
            </div>
        </div>
    );
}
