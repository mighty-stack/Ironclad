const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const FlameIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path
      pathLength="1"
      d="M12 2.5c.8 3.6 5 5.2 5 9.8a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.1 2 .9 3 2 3.3-.6-3 .2-5.6.8-8.3z"
    />
  </svg>
);

export const FanIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <circle pathLength="1" cx="12" cy="12" r="1.4" />
    {[0, 120, 240].map((r) => (
      <path
        key={r}
        pathLength="1"
        transform={`rotate(${r} 12 12)`}
        d="M12 10.6c-.6-3.2.4-6.2 2.6-7.2 2.2-.9 3.2 1.2 2 3.3-1 1.9-2.6 3.4-4.6 3.9z"
      />
    ))}
  </svg>
);

export const WrenchIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path
      pathLength="1"
      d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"
    />
  </svg>
);

export const SirenIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path pathLength="1" d="M7 18v-6a5 5 0 0 1 10 0v6" />
    <path pathLength="1" d="M5 18h14v3H5z" />
    <path pathLength="1" d="M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4" />
  </svg>
);

export const CheckIcon = ({ className = '', ...p }) => (
  <svg {...base} strokeWidth={2} className={className} aria-hidden="true" {...p}>
    <path pathLength="1" d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const ShieldIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path pathLength="1" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path pathLength="1" d="M9 12l2 2 4-4" />
  </svg>
);

export const ClockIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <circle pathLength="1" cx="12" cy="12" r="9" />
    <path pathLength="1" d="M12 7v5l3 2" />
  </svg>
);

export const TagIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path pathLength="1" d="M3 12V4h8l10 10-8 8z" />
    <circle pathLength="1" cx="7.5" cy="8.5" r="1" />
  </svg>
);

export const PhoneIcon = ({ className = '', ...p }) => (
  <svg {...base} className={className} aria-hidden="true" {...p}>
    <path
      pathLength="1"
      d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
    />
  </svg>
);

export const StarIcon = ({ className = '', ...p }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...p}>
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  </svg>
);

export const serviceIcons = {
  flame: FlameIcon,
  fan: FanIcon,
  wrench: WrenchIcon,
  siren: SirenIcon,
};
