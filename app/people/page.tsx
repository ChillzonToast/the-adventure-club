import { prisma } from '@/lib/prisma';
import styles from '@/components/TeamCard.module.css';

export const dynamic = 'force-dynamic';

async function getTeam() {
    try {
        const team = await prisma.teamMember.findMany();
        return team;
    } catch (error) {
        console.error("Team DB error, using mocks", error);
        return [
            {
                id: '1',
                name: 'Alex Johnson',
                position: 'President',
                photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
            },
            {
                id: '2',
                name: 'Sarah Chen',
                position: 'Secretary',
                photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
            },
            {
                id: '3',
                name: 'Mike Ross',
                position: 'Event Coordinator',
                photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
            },
            {
                id: '4',
                name: 'Emily Davis',
                position: 'Treasurer',
                photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop'
            }
        ];
    }
}

export default async function PeoplePage() {
    const team = await getTeam();

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>
                Meet Our <span className="text-gold">Team</span>
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
            }}>
                {team.map((member) => (
                    <div key={member.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img src={member.photoUrl} alt={member.name} />
                        </div>
                        <h3 className={styles.name}>{member.name}</h3>
                        <p className={styles.position}>{member.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
