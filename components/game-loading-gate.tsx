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
    const assets = new Map<string, { settled: boolean; image?: HTMLImageElement }>();
    const pending: string[] = [];
    const resourceTimers = new Set<number>();
    let active = 0;
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
    // Loading progress must not force every full-resolution sprite into decoded memory.
    // Bound probes and release them as soon as the browser finishes the resource.
    const pump = () => {
      while (!stopped && active < 4 && pending.length) {
        const url = pending.shift()!;
        const asset = assets.get(url)!;
        const image = new Image();
        asset.image = image;
        active++;
        const deadline = window.setTimeout(settle, 30000);
        resourceTimers.add(deadline);
        function settle() {
          if (stopped || asset.settled) return;
          window.clearTimeout(deadline);
          resourceTimers.delete(deadline);
          asset.settled = true;
          image.onload = null;
          image.onerror = null;
          asset.image = undefined;
          active--;
          schedule();
          pump();
        }
        image.onload = settle;
        image.onerror = settle;
        image.decoding = 'async';
        image.src = url;
      }
    };
    const track = (url: string) => {
      if (assets.has(url)) return;
      assets.set(url, { settled: false });
      pending.push(url);
      pump();
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
            resourceTimers.forEach(id => window.clearTimeout(id));
            assets.forEach(({ image }) => { if (image) { image.onload = null; image.onerror = null; } });
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
      resourceTimers.forEach(id => window.clearTimeout(id));
      assets.forEach(({ image }) => { if (image) { image.onload = null; image.onerror = null; } });
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
