export default function ServiceMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="스마트팜 클러스터"
    >
      {/* Greenhouse roof silhouette */}
      <path
        d="M4 28L12 16L20 28"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      <path
        d="M16 28L24 16L32 28"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      <path
        d="M28 28L36 16L44 28"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      {/* Base line */}
      <line
        x1="3"
        y1="28"
        x2="45"
        y2="28"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Module grid (2x2 squares below roof) */}
      <rect x="8" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="17" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="26" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="35" y="30" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="8" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="17" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="26" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="35" y="37" width="7" height="5" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      {/* Leaf accent */}
      <path
        d="M37 12C37 6 43 4 43 4C43 4 45 10 41 14C39 16 37 12 37 12Z"
        fill="#16a34a"
      />
      <path
        d="M43 4C40 8 38 11 37 12"
        stroke="#dcfce7"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path d="M40 7L39 9" stroke="#dcfce7" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M42 7L40.5 10" stroke="#dcfce7" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  );
}

export function ServiceMarkCompact({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="스마트팜 클러스터"
    >
      {/* Simplified greenhouse roof */}
      <path
        d="M2 18L8 10L14 18"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      <path
        d="M12 18L18 10L24 18"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      {/* Base */}
      <line x1="1" y1="18" x2="25" y2="18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      {/* 2x2 module grid */}
      <rect x="4" y="20" width="7" height="4" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
      <rect x="13" y="20" width="7" height="4" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
      <rect x="4" y="26" width="7" height="4" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
      <rect x="13" y="26" width="7" height="4" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.2" />
      {/* Leaf */}
      <path
        d="M24 8C24 3 29 1 29 1C29 1 31 6 28 9C26.5 11 24 8 24 8Z"
        fill="#16a34a"
      />
      <path d="M29 1C27 4 25 7 24 8" stroke="#dcfce7" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}
