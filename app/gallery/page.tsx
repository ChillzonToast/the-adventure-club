import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function getGalleryData() {
    try {
        // Determine how to get images. 
        // Option 1: Fetch events that have images in the `images` string array.
        const events = await prisma.event.findMany({
            where: {
                images: {
                    isEmpty: false
                }
            },
            orderBy: { date: 'desc' },
            select: {
                id: true,
                title: true,
                images: true,
                coverImage: true
            }
        });
        return events;
    } catch (error) {
        console.error("Gallery DB error, using mocks", error);
        return [
            {
                id: '1',
                title: 'Wayanad Chembra Peak Trek',
                images: [
                    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000',
                    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
                    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800'
                ],
                coverImage: ''
            },
            {
                id: '3',
                title: 'Kakkayam Valley Expedition',
                images: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800'],
                coverImage: ''
            }
        ];
    }
}

export default async function GalleryPage() {
    const events = await getGalleryData();

    return (
        <div className="container" style={{ padding: '2rem 2rem 6rem' }}>
            <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>
                Adventure <span className="text-gold">Gallery</span>
            </h1>

            {events.map((event) => (
                <section key={event.id} className={styles.eventSection}>
                    <h2 className={styles.eventTitle}>{event.title}</h2>
                    <div className={styles.grid}>
                        {/* Include cover image if available as first item, or just the images array? 
                 Prompt says "Subheadings of events with images below it". 
                 I'll mix cover + images for a fuller gallery. */}
                        {[event.coverImage, ...event.images].filter(Boolean).map((img, idx) => (
                            <div key={idx} className={styles.imageItem}>
                                <img src={img} alt={`${event.title} ${idx + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {events.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No gallery images available yet.</p>
            )}
        </div>
    );
}
