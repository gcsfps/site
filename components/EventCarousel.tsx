import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import Link from 'next/link';

// Dados temporários dos eventos
const tempEvents = [
  {
    id: 1,
    title: 'Noite Eletrônica',
    date: '30 Dez',
    image: '/images/events/event1.jpg',
    club: 'Club X',
  },
  {
    id: 2,
    title: 'Hip Hop Night',
    date: '31 Dez',
    image: '/images/events/event2.jpg',
    club: 'Club Y',
  },
  {
    id: 3,
    title: 'Reveillon 2024',
    date: '1 Jan',
    image: '/images/events/event3.jpg',
    club: 'Club Z',
  },
];

export default function EventCarousel() {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900 z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Próximos Eventos</span>
        </h2>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full py-12"
        >
          {tempEvents.map((event) => (
            <SwiperSlide key={event.id} className="w-80">
              <Link href={`/events/${event.id}`}>
                <div className="relative group">
                  {/* Placeholder para imagem - substitua pelo flyer real */}
                  <div className="relative w-80 h-[480px] bg-dark-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="bg-dark-800/80 backdrop-blur-sm p-4 rounded-lg">
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-gray-300">{event.club}</p>
                        <p className="text-accent-purple font-semibold">{event.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
