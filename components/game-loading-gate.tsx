'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { LoadingScreen } from './loading-preview';

/** Keep the game mounted so SVG assets and visible map tiles can load normally. */
export default function GameLoadingGate({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current!;
    const assets = new Map<string, { settled: boolean; image: HTMLImageElement }>();
    let stopped = false;
    let timer = 0;
    let frame = 0;
    let revision = 0;
    let fontReady = false;

    const schedule = () => {
      if (stopped) return;
      revision++;
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 100);
    };
    const track = (url: string) => {
      if (assets.has(url)) return;
      const image = new Image();
      const asset = { settled: false, image };
      assets.set(url, asset);
      // Failed resources are terminal too: a missing image must not lock the game.
      const settle = () => {
        if (stopped || asset.settled) return;
        asset.settled = true;
        schedule();
      };
      image.onerror = settle;
      image.onload = () => { image.decode().then(settle, settle); };
      image.src = url;
    };
    function scan() {
      if (stopped) return;
      const urls = new Set<string>();
      element.querySelectorAll('img, image').forEach(node => {
        const src = node instanceof HTMLImageElement
          ? node.currentSrc || node.src
          : node.getAttribute('href') || node.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
        if (src) urls.add(new URL(src, document.baseURI).href);
      });
      urls.forEach(track);
      const completed = [...urls].filter(url => assets.get(url)?.settled).length;
      setProgress(urls.size ? Math.min(99, Math.floor(completed / urls.size * 100)) : 0);
      // The map is dynamically imported; portraits alone do not mean it is ready.
      const mapMounted = element.querySelector('.modular-map, .optimized-map img');
      if (!mapMounted || !fontReady || !urls.size || completed !== urls.size) return;
      const currentRevision = revision;
      timer = window.setTimeout(() => {
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (stopped || revision !== currentRevision) return;
            setProgress(100);
            setReady(true);
            observer.disconnect();
            stopped = true;
            assets.forEach(({ image }) => { image.onload = null; image.onerror = null; });
            assets.clear();
          });
        });
      }, 250);
    }
    const observer = new MutationObserver(schedule);
    observer.observe(element, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset', 'href'] });
    document.fonts.ready.then(() => { fontReady = true; schedule(); });
    schedule();
    return () => {
      stopped = true;
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      assets.forEach(({ image }) => { image.onload = null; image.onerror = null; });
    };
  }, []);

  return <>
    <div ref={host} inert={!ready} aria-hidden={!ready} aria-busy={!ready} style={{ opacity: ready ? 1 : 0 }}>
      {children}
    </div>
    {!ready && <div style={{ position: 'fixed', inset: 0, zIndex: 10000, overflow: 'auto', background: '#fffef9' }}>
      <LoadingScreen progress={progress} />
    </div>}
  </>;
}
