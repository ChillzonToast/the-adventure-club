'use client';

import { useState, useEffect } from 'react';

const messages = [
    "Checking Compass...",
    "Tying Knots...",
    "Packing Gear...",
    "Scouting Trails...",
    "Spotting Wildlife...",
    "Setting Up Camp...",
    "Filling Water Bottles...",
    "Studying Maps..."
];

export default function LoadingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <p style={{
            marginTop: '1.5rem',
            color: 'var(--color-accent-gold)',
            fontFamily: 'var(--font-montserrat)',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '1px',
            minHeight: '1.5rem', // Prevent layout shift
            animation: 'pulse 2s infinite'
        }}>
            {messages[index]}
        </p>
    );
}
