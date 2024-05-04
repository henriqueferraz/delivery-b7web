import styles from './styles.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
            >
                <SwiperSlide>
                    <img src="/banner 01.png" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/banner 02.png" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}