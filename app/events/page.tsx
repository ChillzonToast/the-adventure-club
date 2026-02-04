import { prisma } from '@/lib/prisma';
import EventsList from '@/components/EventsList';

export const dynamic = 'force-dynamic';

async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'desc' },
        });
        return events;
    } catch (error) {
        console.error("Database connection failed, using mock data:", error);
        // return mock data if DB fails
        return [
            {
                id: '1',
                title: 'Wayanad Chembra Peak Trek',
                coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
                summary: 'Join us for a thrilling trek to the highest peak in Wayanad, witnessing the heart-shaped lake and breathtaking views.',
                fullDescription: 'Experience the beauty of the Western Ghats with our Chembra Peak trek. Starting early morning, we navigate through lush tea plantations before entering the forest trail. \n\nThe highlight is the Hridaya Saras (Heart-shaped lake) which never dries up. From the top, you get a panoramic view of the entire Wayanad district.\n\nDifficulty: Moderate\nDuration: 1 Day\n\nWhat to bring:\n- Trekking shoes\n- Water bottle\n- Raincoat',
                images: [
                    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800',
                    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800'
                ],
                date: new Date('2023-11-15'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '2',
                title: 'Varkala Beach Camping',
                coverImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop',
                summary: 'A weekend getaway to the cliffs of Varkala. Bonfire, music, and sleeping under the stars.',
                fullDescription: 'Unwind after exams with our Varkala Beach Camping trip. We set up camp on the north cliff, offering a stunning view of the Arabian Sea.\n\nActivities include:\n- Beach volleyball\n- Sunset walk\n- Barbecue and Bonfire\n\nThis is a chill trip focused on community bonding.',
                images: [],
                date: new Date('2023-12-20'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '3',
                title: 'Kakkayam Valley Expedition',
                coverImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=1000&auto=format&fit=crop',
                summary: 'Explore the hidden waterfalls and dense forests of Kakkayam. A true challenge for the wild at heart.',
                fullDescription: 'Kakkayam is known for its biodiversity and rugged terrain. We will be trekking to the Urakkuzhi waterfalls.\n\nWarning: This trek involves leeches and slippery rocks. Proper gear is mandatory.',
                images: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800'],
                date: new Date('2024-01-10'),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
    }
}

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            <EventsList events={events} />
        </main>
    );
}
