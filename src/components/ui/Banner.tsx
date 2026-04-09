import Image from "next/image";
import { unsplashUrl, type BannerImage } from "@/lib/banners";

interface BannerProps {
  image: BannerImage;
  height?: "sm" | "md" | "lg";
  children?: React.ReactNode; // overlay content
}

const HEIGHT_CLASS = {
  sm: "h-48 md:h-64",
  md: "h-64 md:h-80",
  lg: "h-80 md:h-[480px]",
};

export default function Banner({ image, height = "md", children }: BannerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${HEIGHT_CLASS[height]}`}>
      <Image
        src={unsplashUrl(image.id)}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Dark gradient overlay — bottom-weighted so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Optional overlay content (text, CTAs) */}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 md:px-10 md:pb-10">
          {children}
        </div>
      )}

      {/* Photo credit — unobtrusive, bottom-right */}
      <a
        href={image.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-3 text-[10px] text-white/40 hover:text-white/70 transition-colors"
        tabIndex={-1}
      >
        Photo: {image.credit} / Unsplash
      </a>
    </div>
  );
}
