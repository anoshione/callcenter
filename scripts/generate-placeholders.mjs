import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/placeholders');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createSvg(width, height, title, subtitle, iconType = 'chat', bgStyle = 'light') {
  const bgGrad = bgStyle === 'navy' 
    ? `<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#00203C" />
         <stop offset="100%" stop-color="#00162B" />
       </linearGradient>`
    : bgStyle === 'green'
    ? `<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#009966" />
         <stop offset="100%" stop-color="#007A52" />
       </linearGradient>`
    : `<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
         <stop offset="0%" stop-color="#F2F2F2" />
         <stop offset="100%" stop-color="#DEDEDE" />
       </linearGradient>`;

  const textColor = bgStyle === 'light' ? '#00203C' : '#FFFFFF';
  const subtextColor = bgStyle === 'light' ? '#273854' : '#B3E0D1';
  const accentColor = '#009966';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    ${bgGrad}
    <linearGradient id="orb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00203C" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${bgStyle === 'light' ? '#949494' : '#575757'}" stroke-width="0.5" stroke-opacity="0.25"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" rx="16"/>
  <rect width="${width}" height="${height}" fill="url(#grid)" rx="16"/>
  <circle cx="${width * 0.8}" cy="${height * 0.3}" r="${width * 0.35}" fill="url(#orb)"/>
  
  <g transform="translate(${width * 0.1}, ${height * 0.45})">
    <rect x="-12" y="-36" width="48" height="48" rx="12" fill="${bgStyle === 'light' ? '#00203C' : '#009966'}" fill-opacity="0.12"/>
    <circle cx="12" cy="-12" r="14" fill="${accentColor}" fill-opacity="0.2"/>
    <circle cx="12" cy="-12" r="6" fill="${accentColor}"/>
    <text x="0" y="40" font-family="Roboto, sans-serif" font-weight="700" font-size="22" fill="${textColor}">${title}</text>
    <text x="0" y="68" font-family="Roboto, sans-serif" font-weight="400" font-size="14" fill="${subtextColor}">${subtitle}</text>
  </g>
</svg>`;
}

const placeholders = [
  { name: 'hero-1.svg', w: 800, h: 600, t: '24/7 Frontline Operations', s: 'Omnichannel Voice, Chat & Email', bg: 'navy' },
  { name: 'hero-2.svg', w: 800, h: 600, t: 'Tier 1 - 3 Technical Desk', s: 'Escalations, Troubleshooting & Diagnostics', bg: 'navy' },
  { name: 'hero-3.svg', w: 800, h: 600, t: 'Elastic High-Capacity Pods', s: 'Ready for Scalable Enterprise Growth', bg: 'navy' },
  
  { name: 'about-1.svg', w: 600, h: 500, t: 'Operations Control Floor', s: 'Supervised 24/7 Quality Delivery', bg: 'light' },
  { name: 'about-2.svg', w: 600, h: 500, t: 'Specialized Training Lab', s: 'Calibrated Empathy & Product Mastery', bg: 'light' },

  { name: 'service-customer-support.svg', w: 600, h: 420, t: 'Customer Support', s: '24/7 Responsive Care', bg: 'light' },
  { name: 'service-technical-support.svg', w: 600, h: 420, t: 'Technical Support', s: 'Diagnostics & Systems Help', bg: 'light' },
  { name: 'service-appointment-setting.svg', w: 600, h: 420, t: 'Appointment Setting', s: 'High-Conversion Outreach', bg: 'light' },
  { name: 'service-inbound.svg', w: 600, h: 420, t: 'Inbound Call Center', s: 'Zero-Wait Routing', bg: 'light' },
  { name: 'service-outbound.svg', w: 600, h: 420, t: 'Outbound Call Center', s: 'Targeted Lead Verification', bg: 'light' },
  { name: 'service-it-services.svg', w: 600, h: 420, t: 'IT Services', s: 'Infrastructure & Cloud Uptime', bg: 'light' },
  { name: 'service-live-chat.svg', w: 600, h: 420, t: 'Live Chat & Email', s: 'Rapid Digital Resolution', bg: 'light' },
  { name: 'service-back-office.svg', w: 600, h: 420, t: 'Back-Office Operations', s: 'Data Verification & Audits', bg: 'light' },

  { name: 'team-1.svg', w: 400, h: 450, t: 'Marcus Vance', s: 'Managing Director', bg: 'light' },
  { name: 'team-2.svg', w: 400, h: 450, t: 'Elena Rostova', s: 'VP Operations', bg: 'light' },
  { name: 'team-3.svg', w: 400, h: 450, t: 'David Chen', s: 'Head of Tech Support', bg: 'light' },
  { name: 'team-4.svg', w: 400, h: 450, t: 'Sarah Jenkins', s: 'Lead Quality Specialist', bg: 'light' },
  { name: 'team-5.svg', w: 400, h: 450, t: 'Ahmed Al-Mansoor', s: 'Workforce Lead', bg: 'light' },
  { name: 'team-6.svg', w: 400, h: 450, t: 'Claire Dubois', s: 'Training Director', bg: 'light' },
  { name: 'team-7.svg', w: 400, h: 450, t: 'Carlos Rodriguez', s: 'Inbound Supervisor', bg: 'light' },
  { name: 'team-8.svg', w: 400, h: 450, t: 'Maya Patel', s: 'Customer Success', bg: 'light' },

  { name: 'blog-1.svg', w: 800, h: 480, t: 'Omnichannel Support', s: '40% Retention Uplift', bg: 'light' },
  { name: 'blog-2.svg', w: 800, h: 480, t: 'Inbound vs Outbound', s: 'Operational Strategies', bg: 'light' },
  { name: 'blog-3.svg', w: 800, h: 480, t: 'Security & Compliance', s: 'ISO & SOC 2 Ready', bg: 'light' },
  { name: 'blog-4.svg', w: 800, h: 480, t: 'First Response Times', s: 'Quality Metric Tuning', bg: 'light' },
  { name: 'blog-5.svg', w: 800, h: 480, t: 'Human + AI Teams', s: 'Augmenting Agents', bg: 'light' },
  { name: 'blog-6.svg', w: 800, h: 480, t: 'Seasonal Scalability', s: 'Managing Peak Loads', bg: 'light' },

  { name: 'gallery-1.svg', w: 800, h: 500, t: 'Main Operations Floor', s: 'Austin HQ Center', bg: 'light' },
  { name: 'gallery-2.svg', w: 600, h: 600, t: 'Simulation Lab', s: 'Agent Calibration Room', bg: 'light' },
  { name: 'gallery-3.svg', w: 600, h: 800, t: 'Monitoring Hub', s: 'Real-Time Telephony', bg: 'navy' },
  { name: 'gallery-4.svg', w: 600, h: 600, t: 'Collaborative Pods', s: 'Cross-functional Teams', bg: 'light' },
  { name: 'gallery-5.svg', w: 800, h: 500, t: 'Security Operations', s: '24/7 Access Monitoring', bg: 'navy' },
  { name: 'gallery-6.svg', w: 600, h: 800, t: 'Escalation Desk', s: 'Lead Supervisors', bg: 'light' },
  { name: 'gallery-7.svg', w: 600, h: 600, t: 'Wellness Lounge', s: 'Employee Rest Area', bg: 'light' },
  { name: 'gallery-8.svg', w: 600, h: 600, t: 'Voice Calibration', s: 'Acoustic Sound Booth', bg: 'light' },
  { name: 'gallery-9.svg', w: 800, h: 500, t: 'Strategy Boardroom', s: 'Executive Reviews', bg: 'navy' },

  { name: 'testimonial-1.svg', w: 120, h: 120, t: 'MV', s: 'CloudScale', bg: 'light' },
  { name: 'testimonial-2.svg', w: 120, h: 120, t: 'AM', s: 'Zenith', bg: 'light' },
  { name: 'testimonial-3.svg', w: 120, h: 120, t: 'SH', s: 'Horizon', bg: 'light' },
];

for (const p of placeholders) {
  const content = createSvg(p.w, p.h, p.t, p.s, 'chat', p.bg);
  fs.writeFileSync(path.join(outDir, p.name), content, 'utf8');
}

console.log(`Generated ${placeholders.length} placeholder SVGs successfully.`);
