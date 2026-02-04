import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

import styles from './contact.module.css';

export default function ContactPage() {
    const contactLinks = [
        {
            icon: <Instagram size={32} />,
            label: 'Instagram',
            value: '@adventureclubnitc',
            href: 'https://instagram.com'
        },
        {
            icon: <Phone size={32} />,
            label: 'WhatsApp',
            value: '+91 98765 43210',
            href: 'https://wa.me/919876543210'
        },
        {
            icon: <Mail size={32} />,
            label: 'Email',
            value: 'adventure@nitc.ac.in',
            href: 'mailto:adventure@nitc.ac.in'
        }
    ];

    return (
        <div className="container section-padding">
            <div className={`glass-panel ${styles.panel}`}>
                <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>
                    Get in <span className="text-gold">Touch</span>
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {contactLinks.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                transition: 'background 0.3s'
                            }}
                            className="hover:bg-white/10"
                        >
                            <div style={{ color: 'var(--color-accent-gold)' }}>
                                {link.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{link.label}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{link.value}</p>
                            </div>
                        </a>
                    ))}

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ color: 'var(--color-accent-gold)' }}>
                            <MapPin size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Location</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                National Institute of Technology Calicut,<br />
                                Kattangal, Kerala 673601
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
