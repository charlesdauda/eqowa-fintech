const baseStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const LinkIcon = ({ className = '' }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" strokeWidth="1.6" {...baseStroke}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const KeyIcon = ({ className = '' }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" strokeWidth="1.6" {...baseStroke}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="M10.7 12.3 21 2l-2 5 3 1-4 4-2.5-.5" />
  </svg>
);

export const CheckIcon = ({ className = '' }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" strokeWidth="2.4" {...baseStroke}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const HardwareIcon = ({ className = '' }) => (
  <svg className={className} width="36" height="36" viewBox="0 0 48 48" strokeWidth="1.2" {...baseStroke}>
    <rect x="14" y="10" width="20" height="32" rx="3" />
    <line x1="14" y1="18" x2="34" y2="18" />
    <rect x="20" y="24" width="8" height="6" rx="1" />
    <circle cx="24" cy="36" r="1.2" fill="currentColor" />
    <path d="M22 6h4v4h-4z" />
  </svg>
);

export const SealIcon = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#1e2b4a" stroke="#1e4ed8" strokeWidth="1" />
    <circle cx="24" cy="24" r="14" fill="none" stroke="#1e4ed8" strokeWidth="0.5" strokeDasharray="1 2" />
    <path d="M24 14 L28 22 L36 22 L30 27 L32 35 L24 30 L16 35 L18 27 L12 22 L20 22 Z"
          fill="#1e4ed8" opacity="0.9" />
    <text x="24" y="44" textAnchor="middle" fontSize="3" fill="#1e4ed8"
          fontFamily="serif" letterSpacing="0.5">
      REPUBLIC · GH
    </text>
  </svg>
);

export const LogoutIcon = ({ className = '' }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" strokeWidth="1.6" {...baseStroke}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const LockIcon = ({ className = '' }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" {...baseStroke}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);