"use client";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  isOnline?: boolean;
  className?: string;
}

function getSizeClass(size: string): string {
  if (size === "xs") return "w-6 h-6";
  if (size === "sm") return "w-8 h-8";
  if (size === "lg") return "w-12 h-12";
  if (size === "xl") return "w-16 h-16";
  if (size === "2xl") return "w-24 h-24";
  return "w-10 h-10";
}

function getDotClass(size: string): string {
  if (size === "xs") return "w-1.5 h-1.5";
  if (size === "sm") return "w-2 h-2";
  if (size === "lg") return "w-3 h-3";
  if (size === "xl") return "w-3.5 h-3.5";
  if (size === "2xl") return "w-4 h-4";
  return "w-2.5 h-2.5";
}

export default function Avatar({ src, alt, size = "md", isOnline, className = "" }: AvatarProps) {
  const sizeClass = getSizeClass(size);
  const dotClass = getDotClass(size);
  const fallbackSrc = "https://ui-avatars.com/api/?name=" + encodeURIComponent(alt) + "&background=1877F2&color=fff&size=128";

  return (
    <div className={"relative inline-block flex-shrink-0 " + sizeClass + " " + className}>
      <div className={"rounded-full overflow-hidden bg-gray-200 " + sizeClass}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackSrc;
          }}
        />
      </div>
      {isOnline !== undefined && (
        <span
          className={"absolute bottom-0 right-0 " + dotClass + " rounded-full border-2 border-white " + (isOnline ? "bg-green-500" : "bg-gray-400")}
        />
      )}
    </div>
  );
}
