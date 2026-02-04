'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- Events ---
export async function createEvent(formData: FormData) {
    const imagesStr = formData.get('images') as string;
    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()) : [];

    await prisma.event.create({
        data: {
            title: formData.get('title') as string,
            coverImage: formData.get('coverImage') as string,
            summary: formData.get('summary') as string,
            fullDescription: formData.get('fullDescription') as string,
            images: images,
            date: new Date(formData.get('date') as string),
        },
    });
    revalidatePath('/events');
    revalidatePath('/gallery');
    revalidatePath('/admin');
}

export async function deleteEvent(id: string) {
    await prisma.event.delete({ where: { id } });
    revalidatePath('/events');
    revalidatePath('/gallery');
    revalidatePath('/admin');
}

export async function updateEvent(formData: FormData) {
    const id = formData.get('id') as string;
    const existingImages = formData.getAll('existingImages') as string[];
    const newImagesStr = formData.get('newImages') as string;
    const newImages = newImagesStr ? newImagesStr.split(',').filter(Boolean) : [];

    // Combine existing and new images
    const images = [...existingImages, ...newImages];

    await prisma.event.update({
        where: { id },
        data: {
            title: formData.get('title') as string,
            coverImage: formData.get('coverImage') as string,
            summary: formData.get('summary') as string,
            fullDescription: formData.get('fullDescription') as string,
            images: images,
            date: new Date(formData.get('date') as string),
        },
    });
    revalidatePath('/events');
    revalidatePath('/gallery');
    revalidatePath('/admin');
}

// --- Team ---
export async function createTeamMember(formData: FormData) {
    await prisma.teamMember.create({
        data: {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            photoUrl: formData.get('photoUrl') as string,
        },
    });
    revalidatePath('/people');
    revalidatePath('/admin');
}

export async function deleteTeamMember(id: string) {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath('/people');
    revalidatePath('/admin');
}

export async function updateTeamMember(formData: FormData) {
    const id = formData.get('id') as string;
    await prisma.teamMember.update({
        where: { id },
        data: {
            name: formData.get('name') as string,
            position: formData.get('position') as string,
            photoUrl: formData.get('photoUrl') as string,
        },
    });
    revalidatePath('/people');
    revalidatePath('/admin');
}

export async function verifyAdminPassword(password: string) {
    return password === process.env.ADMIN_PASSWORD;
}
