import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground} />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Welcome to <span className="text-gold">The Adventure Club</span> NITC
                </h1>
                <p className={styles.subtitle}>
                    Explore, Discover, and Experience Thrilling Outdoor Adventures.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/events" className="btn-primary">
                        Explore Events
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
