'use client';

import { CircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OptionItem<T extends string> {
  label: string;
  priceLabel?: number;
  value?: T;
}

interface LevelSelectProps<T extends string> {
  title: string;
  subTitle: string;
  options: OptionItem<T>[];
  value?: T;
  onChange: (val: T) => void;
  required?: boolean;
  error?: boolean;
}

export const LevelSelect = <T extends string>({
  title,
  subTitle,
  options,
  value,
  onChange,
  required = false,
  error = false,
}: LevelSelectProps<T>) => {
  const [selected, setSelected] = useState<T | undefined>(value);
  const [done, setDone] = useState(false);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [flipBadge, setFlipBadge] = useState(false);

  // ✅ sync with parent
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (val: T) => {
    setSelected(val);
    onChange(val);

    if (required && !done) {
      setAnimateOverlay(true);
      setFlipBadge(true);
    }
  };

  const containerClass = error
    ? 'border border-red-500 bg-[#fefce8] px-3'
    : required
      ? done || animateOverlay
        ? 'bg-[#f8f8f8] px-3 border relative overflow-hidden'
        : 'bg-[#fefce8] px-3 border relative overflow-hidden'
      : 'bg-none border-none px-0 relative';

  const badgeClass = done
    ? 'bg-white border text-black'
    : required
      ? 'bg-[#facc15] text-white'
      : 'bg-[#e8e9ea] text-[#6c7175] font-semibold';

  return (
    <div className={`pt-6 pb-3 rounded-lg ${containerClass}`}>
      {/* Overlay */}
      {required && animateOverlay && !done && (
        <div className="absolute bottom-0 left-0 w-full h-full bg-[#fefce8] animate-fall z-0" />
      )}

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-3 px-2">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">{title}</p>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full transform w-20 text-center ${
                flipBadge ? 'animate-flip' : ''
              } ${badgeClass}`}
              onAnimationEnd={() => {
                if (flipBadge) {
                  setDone(true);
                  setAnimateOverlay(false);
                  setFlipBadge(false);
                }
              }}
            >
              {required ? (done ? 'Completed' : 'Required') : 'Optional'}
            </span>
          </div>

          <p className="text-sm text-gray-600">
            {required ? (done ? 'Done' : subTitle) : `${subTitle} (optional)`}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="relative z-10 flex flex-col">
        {options.map((opt) => {
          const isSelected = selected === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => {
                if (opt.value !== undefined) {
                  handleSelect(opt.value);
                }
              }}
              className={`group cursor-pointer flex justify-between items-center w-full rounded-md px-2 py-4 text-left transition-all duration-150
                ${
                  required
                    ? done
                      ? 'hover:bg-gray-200'
                      : 'hover:bg-yellow-200'
                    : 'hover:bg-[#f7f8f8]'
                }
              `}
            >
              <span className="text-[#1f2937] text-sm font-semibold">
                {opt.label}
              </span>

              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {opt.priceLabel ? `+ $${opt.priceLabel}` : 'Free'}
                </span>

                <CircleIcon
                  className={`size-5 stroke-1 stroke-[#6b7280] ${
                    isSelected
                      ? 'stroke-4 stroke-[#030712]'
                      : 'group-hover:stroke-3 group-hover:stroke-[#374151]'
                  }`}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fall {
          0% {
            height: 100%;
          }
          100% {
            height: 0%;
          }
        }
        .animate-fall {
          animation: fall 0.75s ease-in-out forwards;
        }

        @keyframes flipBadge {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        .animate-flip {
          animation: flipBadge 0.75s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};
