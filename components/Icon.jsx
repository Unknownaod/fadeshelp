const ICONS = {
  spark: (<><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m12 8 1.6 2.4L16 12l-2.4 1.6L12 16l-1.6-2.4L8 12l2.4-1.6z" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 8 8 5.5L20 8" /></>),
  browser: (<><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /><circle cx="6.5" cy="6.5" r=".6" /><circle cx="9" cy="6.5" r=".6" /></>),
  chat: (<><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M8 10h8M8 13h5" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9z" /></>),
  user: (<><circle cx="12" cy="8.5" r="3.5" /><path d="M4.5 20c.8-3.6 3.7-5.5 7.5-5.5s6.7 1.9 7.5 5.5" /></>),
  users: (<><circle cx="9" cy="9" r="3" /><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" /><path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 14.7c2 .5 3.3 2 3.8 4.3" /></>),
  rocket: (<><path d="M14 4c3.5 0 6 2.5 6 6-2.2 4-5 6.5-8 8l-4-4c1.5-3 4-5.8 6-10z" /><circle cx="14.5" cy="9.5" r="1.4" /><path d="M8 14c-2 .5-3.500 2-4 5 3-.5 4.5-2 5-4M6 10l3-1M14 18l-1 3" /></>),
  key: (<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2" /></>),
  shield: (<><path d="M12 3 5 6v5.5c0 4.4 2.8 7.6 7 9.5 4.2-1.9 7-5.1 7-9.5V6z" /><path d="m9 12 2.3 2.3L15.5 10" /></>),
  card: (<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18M7 15h3" /></>),
  wrench: (<><path d="M14.5 6.5a4 4 0 0 0 4.9 5l-1.3-1.3-2.4.5-.5-2.4L14 6.5z" /><path d="M14 7.5 5 16.5a1.8 1.8 0 0 0 2.5 2.5L16.5 10" /></>),
  code: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.2 5.5l-2.4 13" />,
  discord: (<><path d="M8.2 6.6c1.2-.4 2.5-.6 3.8-.6s2.6.2 3.8.6c1.6 2.3 2.5 5 2.7 8.4-1.2.9-2.4 1.5-3.7 1.9l-.9-1.5c.5-.2 1-.4 1.4-.7-2.3 1-4.8 1-7.2 0 .4.3.9.5 1.4.7l-.9 1.5c-1.3-.4-2.5-1-3.7-1.9.2-3.4 1.1-6.1 2.7-8.4z" /><circle cx="9.5" cy="12.2" r="1.1" /><circle cx="14.5" cy="12.2" r="1.1" /></>),
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  x: (<><path d="M4.5 4.5h3.8l11.2 15h-3.8z" /><path d="m4.8 19.5 6.1-6.7M13.2 11.2l6-6.7" /></>),
  youtube: (<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.3 5 2.7-5 2.7z" /></>),
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>),
  arrow: (<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>),
  external: (<><path d="M14 5h5v5" /><path d="m19 5-8 8" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>),
  chevron: <path d="m6 9 6 6 6-6" />,
  book: (<><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z" /><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3" /></>),
  lifebuoy: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" /></>),
  ticket: (<><path d="M4 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a2 2 0 0 1 0-4v0a2 2 0 0 0 0-4V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1z" /><path d="M14 6v12" strokeDasharray="1.5 2.5" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="8" r=".6" /></>),
  alert: (<><path d="M12 4 3 19h18z" /><path d="M12 10v4" /><circle cx="12" cy="16.5" r=".6" /></>),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  refresh: (<><path d="M20 12a8 8 0 1 1-2.4-5.7" /><path d="M20 4v4h-4" /></>),
  lock: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  trash: (<><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="m6 7 1 13h10l1-13" /><path d="M10 11v6M14 11v6" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  bell: (<><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.500 2h-15z" /><path d="M10 21h4" /></>),
  gamepad: (<><rect x="3" y="7" width="18" height="11" rx="5" /><path d="M8 10.500v4M6 12.500h4" /><circle cx="15.500" cy="11.500" r=".8" /><circle cx="17.500" cy="13.500" r=".8" /></>),
  download: (<><path d="M12 4v11" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" /></>),
  link: (<><path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1" /><path d="M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  thumbsUp: (<><path d="M7 11v9H4v-9z" /><path d="M7 11l4-7c1.700 0 2.500 1.300 2 3l-.7 3H19a2 2 0 0 1 2 2.300l-1 6a2 2 0 0 1-2 1.700H7" /></>),
  thumbsDown: (<><path d="M7 13V4H4v9z" /><path d="m7 13 4 7c1.700 0 2.500-1.300 2-3l-.7-3H19a2 2 0 0 0 2-2.300l-1-6A2 2 0 0 0 18 3.700H7" /></>),
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.book}
    </svg>
  );
}
