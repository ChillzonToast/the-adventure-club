import Image from "next/image";
import LoadingText from "@/components/LoadingText";

export default function Loading() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--color-primary-dark)',
            zIndex: 9999
        }}>
            <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                <Image
                    src="/loading.gif"
                    alt="Loading..."
                    fill
                    style={{
                        objectFit: 'contain',
                        filter: 'invert(1)',
                        mixBlendMode: 'screen'
                    }}
                    unoptimized
                />
            </div>
            <LoadingText />
        </div>
    );
}
