'use client';

import { useState } from 'react';
import Link from 'next/link';
import { XIcon, GraduationCap } from 'lucide-react';

export default function AnnocementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      style={{ background: 'linear-gradient(90deg, #0d5c2f 0%, #16a34a 50%, #0d5c2f 100%)' }}
    >
      {/* Decorative blur orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            background: 'rgba(255,255,255,0.15)',
          }}
          className="aspect-[577/310] w-[36rem] opacity-30"
        />
      </div>

      {/* Content */}
      <div className="flex flex-nowrap items-center gap-x-3 sm:gap-x-4 gap-y-2">
        <GraduationCap className="size-5 text-emerald-200 flex-shrink-0" aria-hidden="true" />
        <p className="text-xs sm:text-sm leading-6 text-white font-medium">
          <strong className="font-bold text-emerald-100">Oasis of Arabic</strong>
          {' — '}
          Master Arabic from home with live Zoom classes &amp; expert-guided courses.
        </p>
        <Link
          href="/courses"
          className="flex-none rounded-full bg-white px-3 py-1 text-xs sm:text-sm font-semibold text-green-700 shadow-sm hover:bg-emerald-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
        >
          Explore Courses <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="-m-3 p-3 focus-visible:outline-offset-[-4px] hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <span className="sr-only">Dismiss</span>
          <XIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
}
