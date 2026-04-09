export default function Logo({ size = 22 }: { size?: number }) {
  const strokeW = size * 0.14;
  return (
    <span className="flex items-center gap-2.5 font-black text-lg tracking-tight select-none">
      {/* Slope mark icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="6" fill="#111111" />
        <line
          x1="10" y1="26" x2="18" y2="6"
          stroke="#e8ff00"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        <line
          x1="17" y1="26" x2="25" y2="6"
          stroke="#e8ff00"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <span>
        <span className="text-[var(--accent)]">Naked</span>
        <span className="text-[var(--foreground)]">Slope</span>
      </span>
    </span>
  );
}
