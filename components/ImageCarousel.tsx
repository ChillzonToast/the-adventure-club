'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginTop: '3rem', borderRadius: '8px', overflow: 'hidden', background: 'var(--color-primary-dark)' }}>
            {/* Slider Track */}
            <div
                style={{
                    display: 'flex',
                    width: `${images.length * 100}%`,
                    height: '100%',
                    transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
                    transition: 'transform 0.5s ease-in-out'
                }}
            >
                {images.map((img, idx) => (
                    <div key={idx} style={{ width: `${100 / images.length}%`, height: '100%', position: 'relative' }}>
                        <img
                            src={img}
                            alt={`Slide ${idx}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '1rem',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '1rem',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: idx === currentIndex ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
