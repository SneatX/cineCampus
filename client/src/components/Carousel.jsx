import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../css/components/Carousel.css';

import { FreeMode, Pagination } from 'swiper/modules';

export function Carousel() {

    let [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            let res = await fetch("http://localhost:3000/caso2");
            res = await res.json();
            let { data: [...moviesArray] } = res
            setMovies(moviesArray)
        };

        getMovies();
    }, []);
    return (
        <>
            <Swiper
                slidesPerView={1.7}
                spaceBetween={0}
                centeredSlides={true}
                freeMode={false} //false = auto centred
                //grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index} className='swiperSlide'>
                        <img 
                            className='swiperSlide-img' 
                            src={movie.img}  
                            alt={`Imagen ${movie.titulo}`}
                        />
                        <p className='swiperSlide-title'>{movie.titulo}</p>
                        <p className='swiperSlide-genre'>{movie.generos[0]}</p>
                    </SwiperSlide>
                ))}

                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>
                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>
                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>
                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>
                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>
                <SwiperSlide className='swiperSlide'>otra peli </SwiperSlide>

            </Swiper>
        </>
    );
}
