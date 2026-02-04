import Link from 'next/link';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
            backgroundColor: 'var(--color-primary-dark)'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', letterSpacing: '2px' }}>THE ADVENTURE CLUB NITC</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Explore, Discover, and Experience Thrilling Outdoor Adventures.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                    <a href="#" style={{ color: 'var(--color-text-light)', transition: 'color 0.3s' }} className="hover:text-[var(--color-accent-gold)]">
                        <Instagram size={24} />
                    </a>
                    <a href="#" style={{ color: 'var(--color-text-light)', transition: 'color 0.3s' }}>
                        <Mail size={24} />
                    </a>
                    <a href="#" style={{ color: 'var(--color-text-light)', transition: 'color 0.3s' }}>
                        <Phone size={24} />
                    </a>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    © {new Date().getFullYear()} The Adventure Club NITC. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
