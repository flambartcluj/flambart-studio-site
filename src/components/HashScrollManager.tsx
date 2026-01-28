import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET_PX = 80;
const MAX_ALIGN_FRAMES = 30; // keep correcting for a short time to survive layout shifts
const MAX_WAIT_MS = 1500;

/**
 * Ensures cross-page hash navigation like `/#despre` reliably scrolls to the target section.
 *
 * Why this exists:
 * - When navigating from /servicii or /portofoliu to /#despre, content above the target
 *   (e.g. masonry images) may still be laying out, causing the final scroll position to drift.
 * - We keep re-aligning briefly so the user consistently lands on the intended section.
 */
export function HashScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const hashId = decodeURIComponent(location.hash.slice(1));
    const startedAt = performance.now();

    let rafId: number | null = null;
    const timeouts: number[] = [];

    const getTarget = () => document.getElementById(hashId);

    const alignToTarget = (behavior: ScrollBehavior) => {
      const el = getTarget();
      if (!el) return false;

      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - HEADER_OFFSET_PX;
      window.scrollTo({ top: targetTop, behavior });
      return true;
    };

    const tick = (frame: number) => {
      const el = getTarget();
      const elapsed = performance.now() - startedAt;

      if (!el) {
        if (elapsed < MAX_WAIT_MS) {
          rafId = requestAnimationFrame(() => tick(frame + 1));
        }
        return;
      }

      // If the target isn't aligned under the fixed header yet (because of layout shifts), correct it.
      const drift = el.getBoundingClientRect().top - HEADER_OFFSET_PX;
      if (Math.abs(drift) > 4) {
        // First attempt: smooth; subsequent alignment: instant to avoid restarting the smooth animation.
        alignToTarget(frame === 0 ? 'smooth' : 'auto');
      }

      if (frame < MAX_ALIGN_FRAMES && elapsed < MAX_WAIT_MS) {
        rafId = requestAnimationFrame(() => tick(frame + 1));
      }
    };

    // Try immediately + a few delayed retries (covers slower devices / images / fonts).
    alignToTarget('smooth');
    [50, 150, 300, 500, 900].forEach((ms) => {
      timeouts.push(window.setTimeout(() => alignToTarget('auto'), ms));
    });

    rafId = requestAnimationFrame(() => tick(0));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [location.hash, location.key, location.pathname]);

  return null;
}
