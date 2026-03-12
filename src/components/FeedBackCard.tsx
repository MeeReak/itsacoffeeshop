'use client';

import Image from 'next/image';
import Avatar from 'boring-avatars';
import { useState } from 'react';

interface FeedBackCardProps {
  text: string;
  name: string;
  avatar?: string;
  rating?: number;
}

export const FeedBackCard = ({
  text,
  name,
  avatar,
  rating = 5,
}: FeedBackCardProps) => {
  const [imgError, setImgError] = useState(false);

  const showFallback = !avatar || imgError;

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 relative">
      {/* speech bubble arrow */}
      <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white rotate-45 shadow-md"></div>

      <span className="absolute top-4 left-4 text-4xl text-black opacity-50">
        “
      </span>

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Feedback text */}
      <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
        “{text}”
      </p>

      {/* User section */}
      <div className="flex items-center justify-center gap-3">
        <div className="w-10 h-10">
          {showFallback ? (
            <Avatar
              size={40}
              name={name}
              variant="beam"
              colors={['#f5dc50', '#060709', '#C4A484', '#A47148', '#3E2723']}
            />
          ) : (
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="text-left">
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-400">Coffee Lover</p>
        </div>
      </div>
    </div>
  );
};
