'use client';

import { useEffect, useState } from 'react';
import styles from './loading-preview.module.css';
import LoadingSquare3D from './loading-square-3d';

/** Demo progress stays here so the eventual loading screen can receive real progress. */
export default function LoadingPreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = (performance.now() - started) % 12000;
      setProgress(Math.min(100, Math.floor(elapsed / 100)));
    }, 100);
    return () => window.clearInterval(timer);
  }, []);

  return <LoadingScreen progress={progress} />;
}

export function LoadingScreen({ progress }: { progress: number }) {
  const percent = Number.isFinite(progress) ? Math.round(Math.max(0, Math.min(100, progress))) : 0;

  return (
    <main className={styles.screen} aria-label="Carregando a vila">
      <div className={styles.content}>
        <div className={styles.scene}>
          <LoadingSquare3D />
        </div>
          <div
            className={styles.percent}
            role="progressbar"
            aria-label="Carregamento"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            {percent}%
          </div>
      </div>
    </main>
  );
}
