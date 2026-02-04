'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from './EventCard.module.css';
import Modal from './Modal';
import ImageCarousel from './ImageCarousel';

// Type mirroring the Prisma model
type Event = {
    id: string;
    title: string;
    coverImage: string;
    summary: string;
    fullDescription: string;
    images: string[];
    date: Date; // Serialization might make this string, handling both
};

interface EventsListProps {
    events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <>
            <div className="container section-padding">
                <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Our <span className="text-gold">Adventures</span></h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {events.map((event) => (
                        <div key={event.id} className={styles.card} onClick={() => setSelectedEvent(event)}>
                            <div className={styles.imageWrapper}>
                                <img src={event.coverImage} alt={event.title} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.date}>
                                    {format(new Date(event.date), 'MMM d, yyyy')}
                                </div>
                                <h3 className={styles.title}>{event.title}</h3>
                                <p className={styles.summary}>{event.summary}</p>
                                <div className={styles.readMore}>
                                    Read More <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
                {selectedEvent && (
                    <div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <img
                                src={selectedEvent.coverImage}
                                alt={selectedEvent.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-accent-gold)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} />
                                    <span>{format(new Date(selectedEvent.date), 'EEEE, MMMM d, yyyy')}</span>
                                </div>
                                {/* Location could be added to schema if needed */}
                            </div>

                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-text-light)' }}>
                                {selectedEvent.title}
                            </h2>

                            <div style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                                {selectedEvent.fullDescription}
                            </div>

                            {selectedEvent.images && selectedEvent.images.length > 0 && (
                                <ImageCarousel images={selectedEvent.images} />
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default EventsList;
