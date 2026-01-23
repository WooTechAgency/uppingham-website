'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

type RedLineProps = {
  className?: string;
  autoFillFirstFold?: boolean;
};

export function RedLine({ className, autoFillFirstFold = true }: RedLineProps) {
  const [lineHeight, setLineHeight] = React.useState(0);

  const rafIntroRef = React.useRef<number | null>(null);
  const rafFollowRef = React.useRef<number | null>(null);

  const isIntroDoneRef = React.useRef(false);
  const currentHeightRef = React.useRef(0);
  const targetHeightRef = React.useRef(0);

  React.useEffect(() => {
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const getFirstFoldProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      return documentHeight > 0 ? clamp01(windowHeight / documentHeight) : 1;
    };

    const getScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollableHeight = documentHeight - windowHeight;
      return totalScrollableHeight > 0
        ? clamp01(scrollTop / totalScrollableHeight)
        : 0;
    };

    const computeHeightPercent = () => {
      const scrollP = getScrollProgress(); // 0..1
      if (!autoFillFirstFold) {
        return scrollP * 100;
      }
      const firstFold = getFirstFoldProgress(); // 0..1
      const combined = clamp01(firstFold + (1 - firstFold) * scrollP);
      return combined * 100;
    };

    const setImmediate = (v: number) => {
      currentHeightRef.current = v;
      targetHeightRef.current = v;
      setLineHeight(v);
    };

    const cancelIntro = () => {
      if (rafIntroRef.current !== null) {
        cancelAnimationFrame(rafIntroRef.current);
        rafIntroRef.current = null;
      }
      isIntroDoneRef.current = true;
    };

    // ---- Smooth follower (scroll) ----
    const startFollow = () => {
      if (rafFollowRef.current !== null) return;

      const follow = () => {
        const current = currentHeightRef.current;
        const target = targetHeightRef.current;

        // tốc độ bám: nhỏ hơn -> chậm hơn, mượt hơn
        const smoothing = 0.12; // thử 0.08–0.18
        const next = current + (target - current) * smoothing;

        currentHeightRef.current = next;
        setLineHeight(next);

        // nếu còn lệch đáng kể thì tiếp tục animate
        if (Math.abs(target - next) > 0.02) {
          rafFollowRef.current = requestAnimationFrame(follow);
        } else {
          // snap nhẹ về target để khỏi sai số
          currentHeightRef.current = target;
          setLineHeight(target);
          rafFollowRef.current = null;
        }
      };

      rafFollowRef.current = requestAnimationFrame(follow);
    };

    const syncToScrollSmooth = () => {
      targetHeightRef.current = computeHeightPercent();
      startFollow();
    };

    // ---- Intro: animate 0 -> first fold ----
    const runIntro = () => {
      if (!autoFillFirstFold) {
        return;
      }
      const targetHeightPercent = getFirstFoldProgress() * 100;

      // đảm bảo intro thấy rõ
      setImmediate(0);

      const durationMs = 1400;
      const start = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const tick = (now: number) => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 0) {
          cancelIntro();
          // vào chế độ follow ngay
          setImmediate(computeHeightPercent());
          return;
        }

        const t = clamp01((now - start) / durationMs);
        const eased = easeInOutCubic(t);
        const v = targetHeightPercent * eased;

        currentHeightRef.current = v;
        setLineHeight(v);

        if (t < 1) {
          rafIntroRef.current = requestAnimationFrame(tick);
        } else {
          rafIntroRef.current = null;
          isIntroDoneRef.current = true;

          // set baseline xong thì chuyển qua follow (nhưng không “reset”)
          setImmediate(targetHeightPercent);
        }
      };

      rafIntroRef.current = requestAnimationFrame(tick);
    };

    // ---- Events ----
    let ticking = false;
    const handleScroll = () => {
      if (autoFillFirstFold && !isIntroDoneRef.current) cancelIntro();

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          syncToScrollSmooth();
          ticking = false;
        });
      }
    };

    const handleResize = () => {
      // resize làm firstFold thay đổi => update target và follow mượt
      if (autoFillFirstFold && !isIntroDoneRef.current) {
        if (rafIntroRef.current !== null)
          cancelAnimationFrame(rafIntroRef.current);
        runIntro();
        return;
      }
      syncToScrollSmooth();
    };

    // Init
    const initialScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    if (!autoFillFirstFold) {
      isIntroDoneRef.current = true;
      setImmediate(computeHeightPercent());
    } else if (initialScrollTop > 0) {
      isIntroDoneRef.current = true;
      setImmediate(computeHeightPercent());
    } else {
      runIntro();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (rafIntroRef.current !== null)
        cancelAnimationFrame(rafIntroRef.current);
      if (rafFollowRef.current !== null)
        cancelAnimationFrame(rafFollowRef.current);
    };
  }, [autoFillFirstFold]);

  return (
    <div
      className={cn(
        'absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full pointer-events-none z-10 red-line mix-blend-multiply',
        className,
      )}
      style={{
        clipPath: `inset(0 0 ${100 - lineHeight}% 0)`,
      }}
    >
      <div className="w-full h-full bg-red" />
    </div>
  );
}
