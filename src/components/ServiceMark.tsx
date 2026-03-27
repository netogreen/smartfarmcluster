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
      <circle cx="24" cy="24" r="22" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
      <path d="M10 28L18 18L26 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7" />
      <path d="M22 28L30 18L38 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7" />
      <line x1="9" y1="28" x2="39" y2="28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <rect x="21" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <rect x="29" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <text x="24" y="38" textAnchor="middle" fill="#16a34a" fontSize="6" fontWeight="700" fontFamily="sans-serif">CLUSTER</text>
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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="스마트팜 클러스터"
    >
      <circle cx="24" cy="24" r="22" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
      <path d="M10 28L18 18L26 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7" />
      <path d="M22 28L30 18L38 28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#dcfce7" />
      <line x1="9" y1="28" x2="39" y2="28" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <rect x="21" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <rect x="29" y="30" width="5" height="3.5" rx="0.5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <text x="24" y="38" textAnchor="middle" fill="#16a34a" fontSize="6" fontWeight="700" fontFamily="sans-serif">CLUSTER</text>
    </svg>
  );
}
