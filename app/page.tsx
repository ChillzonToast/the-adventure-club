import Hero from '@/components/Hero';
import styles from './home.module.css';

export default function Home() {
  return (
    <>
      <Hero />

      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <h2>Who We Are</h2>
              <p>
                The Adventure Club NITC is a community of thrill-seekers, explorers, and nature lovers.
                Founded with the mission to bring students closer to nature, we organize expeditions,
                trekking camps, and adventure spots that challenge your limits and broaden your horizons.
              </p>
              <p>
                We stand for camaraderie, resilience, and the relentless pursuit of the unknown.
                Whether you are seasoned mountaineer or a first-time hiker, there is a place for you here.
              </p>
            </div>

            <div className={styles.imageGrid}>
              <div className={styles.imageCard}>
                <img src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800&auto=format&fit=crop" alt="Hiking group" />
              </div>
              <div className={styles.imageCard} style={{ marginTop: '2rem' }}>
                <img src="https://images.unsplash.com/photo-1504280390367-361c6d9e38f4?q=80&w=800&auto=format&fit=crop" alt="Camping" />
              </div>
              <div className={styles.imageCard}>
                <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop" alt="Mountain view" />
              </div>
              <div className={styles.imageCard} style={{ marginTop: '2rem' }}>
                <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop" alt="Campfire" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
