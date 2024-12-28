import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon } from './Icons';

interface Event {
  id: string;
  name: string;
  flyerUrl: string;
  date: string;
  location: string;
}

interface EventCarouselProps {
  events: Event[];
}

export default function EventCarousel({ events }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const event = events[currentIndex];

  return (
    <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden">
      <Image
        src={event.flyerUrl || '/images/event-placeholder.jpg'}
        alt={event.name}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-4xl font-bold text-white mb-4">{event.name}</h3>
        <div className="flex items-center text-gray-200 mb-2">
          <CalendarIcon className="h-6 w-6 mr-2" />
          {new Date(event.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <div className="flex items-center text-gray-200">
          <MapPinIcon className="h-6 w-6 mr-2" />
          {event.location}
        </div>
        <Link
          href={`/events/${event.id}`}
          className="mt-6 inline-block px-6 py-3 bg-accent-purple hover:bg-accent-pink text-white font-semibold rounded-lg transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>

      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            ❯
          </button>
        </>
      )}

      {events.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
