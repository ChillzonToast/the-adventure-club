import { prisma } from '@/lib/prisma';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    let events: any[] = [];
    let team: any[] = [];

    try {
        events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
        team = await prisma.teamMember.findMany();
    } catch (e) {
        console.error("DB Error in admin", e);
        // If DB fails, events/team stay empty, which is fine for Admin (shows nothing)
    }

    return (
        <AdminDashboard events={events} team={team} />
    );
}
