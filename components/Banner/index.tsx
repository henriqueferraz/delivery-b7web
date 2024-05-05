import styles from './styles.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
                className={styles.swiper}
            >
                <SwiperSlide className={styles.slide}>
                    <img src="/banner 01.png" alt='' />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <img src="/banner 02.png" alt='' />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}