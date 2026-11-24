import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  darkSurface?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  darkSurface = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${
          darkSurface
            ? 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
        } ${className}`}
      >
        <ImageOff className="w-6 h-6 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium tracking-tight max-w-[22ch]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
