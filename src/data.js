export const PHONE = '020 8123 9988';
export const PHONE_HREF = 'tel:+442081239988';

export const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/emergency', label: 'Emergency Repair' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/areas', label: 'Service Areas' },
];

export const services = [
  {
    icon: 'flame',
    title: 'Boiler Repair',
    blurb: 'Fast diagnosis and repair for all major boiler brands.',
    detail:
      'Most boiler faults are traced and fixed on the first visit. The engineer carries common parts on the van, so you are not waiting a week for a pump or a diverter valve.',
    points: [
      'Fault diagnosis on arrival',
      'Common parts carried on every van',
      'Pressure, leak and ignition faults',
      'Flat-rate price quoted before work starts',
    ],
  },
  {
    icon: 'fan',
    title: 'AC Installation',
    blurb: 'Full system installs with a 5-year workmanship warranty.',
    detail:
      'We survey the property, size the system to the rooms and fit it in one visit where the layout allows. Every install carries a 5-year workmanship warranty.',
    points: [
      'Site survey and system sizing',
      'Single-room and multi-room systems',
      'Neat pipework and condensate routing',
      '5-year workmanship warranty',
    ],
  },
  {
    icon: 'wrench',
    title: 'Annual Servicing',
    blurb: 'Keep your system efficient and covered under warranty.',
    detail:
      'A yearly service keeps efficiency up, catches small faults before they become breakdowns and keeps manufacturer warranties valid.',
    points: [
      'Full safety and efficiency check',
      'Service record for your warranty',
      'Booked at a time that suits you',
      'Written report after every visit',
    ],
  },
  {
    icon: 'siren',
    title: 'Emergency Callout',
    blurb: 'Same-day response, 7 days a week, no overtime charges.',
    detail:
      'When the heating fails in the middle of winter you need a person, not a booking form. Call the emergency line and an engineer is sent the same day, at the same rate as a weekday.',
    points: [
      'Same-day response, 7 days a week',
      'No overtime or weekend surcharge',
      'Price quoted before work begins',
      'Licensed, insured, background-checked',
    ],
  },
];

export const reasons = [
  {
    icon: 'tag',
    title: 'Flat-rate pricing',
    text: 'Upfront, flat-rate pricing quoted before any work begins, so there are no surprises on the invoice.',
  },
  {
    icon: 'shield',
    title: 'Licensed and insured',
    text: 'Fully licensed and insured technicians, background-checked before entering your home.',
  },
  {
    icon: 'clock',
    title: 'Same-day appointments',
    text: 'Same-day appointments available for urgent heating and cooling issues.',
  },
];

export const marqueeItems = [
  'Boiler repair',
  'AC installation',
  'Annual servicing',
  'Emergency callout',
  'Gas Safe registered',
  'Fully insured',
  'Same-day response',
];

/* SAMPLE CONTENT: replace with real reviews before using this for a live client. */
export const reviews = [
  {
    name: 'Priya S.',
    area: 'Walthamstow',
    service: 'Boiler Repair',
    text: 'Boiler lost pressure on a Sunday morning. The engineer was here by early afternoon, fixed it in under an hour and the invoice matched the quote exactly.',
  },
  {
    name: 'Daniel O.',
    area: 'Croydon',
    service: 'AC Installation',
    text: 'Two rooms done in a day. Pipework is tidy, they explained how to use the controls and cleaned up properly before leaving.',
  },
  {
    name: 'Mrs. Hughes',
    area: 'Ealing',
    service: 'Annual Servicing',
    text: 'Third year with the annual service. They send a written report each time and have caught a worn valve before it failed.',
  },
  {
    name: 'Tom R.',
    area: 'Clapham',
    service: 'Emergency Callout',
    text: 'No heating on a freezing evening. Someone answered the phone straight away and an engineer arrived the same night with no extra charge.',
  },
  {
    name: 'Amara K.',
    area: 'Hackney',
    service: 'Boiler Repair',
    text: 'Told me the price on the phone and it did not change when they arrived. That alone put them ahead of the other two firms I tried.',
  },
  {
    name: 'Mark & Jo',
    area: 'Richmond',
    service: 'AC Installation',
    text: 'The survey was thorough and they recommended a smaller unit than we had asked for. It cools the room perfectly.',
  },
];

export const ratingBars = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export const areaGroups = {
  Central: ['Camden', 'City of London', 'Islington', 'Kensington and Chelsea', 'Westminster'],
  North: ['Barnet', 'Brent', 'Enfield', 'Haringey', 'Harrow'],
  East: [
    'Barking and Dagenham',
    'Hackney',
    'Havering',
    'Newham',
    'Redbridge',
    'Tower Hamlets',
    'Waltham Forest',
  ],
  South: [
    'Bexley',
    'Bromley',
    'Croydon',
    'Greenwich',
    'Lambeth',
    'Lewisham',
    'Merton',
    'Southwark',
    'Sutton',
    'Wandsworth',
  ],
  West: [
    'Ealing',
    'Hammersmith and Fulham',
    'Hillingdon',
    'Hounslow',
    'Kingston upon Thames',
    'Richmond upon Thames',
  ],
};

export const coveredPrefixes = [
  'E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC',
  'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD',
];

export const faqs = [
  {
    q: 'Do you charge a call-out fee?',
    a: 'No hidden call-out fees. You are given a flat-rate price before we start, and that is the price you pay.',
  },
  {
    q: 'Is there an extra charge for evenings and weekends?',
    a: 'No. Emergency callouts run 7 days a week with no overtime charges.',
  },
  {
    q: 'Are your engineers licensed and insured?',
    a: 'Yes. Every technician is licensed, insured and background-checked before they enter your home.',
  },
  {
    q: 'How long does an AC installation take?',
    a: 'Many single-room installs are finished in one day. We confirm the timing after the site survey.',
  },
];
