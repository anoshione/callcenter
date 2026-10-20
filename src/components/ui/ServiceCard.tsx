import React from 'react';
import {
  LucideIcon,
  Clock,
  Languages,
  ShieldCheck,
  RefreshCw,
  Layers,
  Activity,
  BookOpen,
  LifeBuoy,
  Users,
  CalendarCheck,
  Filter,
  PhoneForwarded,
  PhoneIncoming,
  CreditCard,
  Zap,
  Workflow,
  PhoneOutgoing,
  BarChart3,
  HeartHandshake,
  Scale,
  Server,
  Lock,
  HardDrive,
  Cpu,
  Timer,
  Inbox,
  Sparkles,
  Smile,
  Target,
  FileText,
  Gauge,
  CheckCheck,
  Check,
} from 'lucide-react';
import { Button } from './Button';

export interface ServicePointerItem {
  text: string;
  iconName?: string;
}

export interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  pointers: (string | ServicePointerItem)[];
  image: string;
  tags?: string[];
  rating?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

// Icon registry for service deliverable pointers
const pointerIconMap: Record<string, LucideIcon> = {
  Clock,
  Languages,
  ShieldCheck,
  RefreshCw,
  Layers,
  Activity,
  BookOpen,
  LifeBuoy,
  Users,
  CalendarCheck,
  Filter,
  PhoneForwarded,
  PhoneIncoming,
  CreditCard,
  Zap,
  Workflow,
  PhoneOutgoing,
  BarChart3,
  HeartHandshake,
  Scale,
  Server,
  Lock,
  HardDrive,
  Cpu,
  Timer,
  Inbox,
  Sparkles,
  Smile,
  Target,
  FileText,
  Gauge,
  CheckCheck,
  Check,
};

// Keyword fallback to detect best semantic icon if pointers are strings
function resolvePointerIcon(text: string, iconName?: string): LucideIcon {
  if (iconName && pointerIconMap[iconName]) {
    return pointerIconMap[iconName];
  }
  const lower = text.toLowerCase();
  if (lower.includes('24/7') || lower.includes('coverage') || lower.includes('hour') || lower.includes('time')) return Clock;
  if (lower.includes('bilingual') || lower.includes('language') || lower.includes('multilingual')) return Languages;
  if (lower.includes('sla') || lower.includes('security') || lower.includes('quality') || lower.includes('audit')) return ShieldCheck;
  if (lower.includes('crm') || lower.includes('sync') || lower.includes('helpdesk')) return RefreshCw;
  if (lower.includes('escalation') || lower.includes('tier')) return Layers;
  if (lower.includes('diagnostic') || lower.includes('logging')) return Activity;
  if (lower.includes('knowledge') || lower.includes('base') || lower.includes('doc')) return BookOpen;
  if (lower.includes('incident') || lower.includes('triage') || lower.includes('tracking')) return LifeBuoy;
  if (lower.includes('decision') || lower.includes('outreach') || lower.includes('b2b') || lower.includes('user')) return Users;
  if (lower.includes('calendar') || lower.includes('schedule') || lower.includes('meeting')) return CalendarCheck;
  if (lower.includes('matrix') || lower.includes('lead') || lower.includes('filter')) return Filter;
  if (lower.includes('transfer') || lower.includes('forward')) return PhoneForwarded;
  if (lower.includes('answering') || lower.includes('ivr') || lower.includes('inbound')) return PhoneIncoming;
  if (lower.includes('billing') || lower.includes('order') || lower.includes('payment')) return CreditCard;
  if (lower.includes('emergency') || lower.includes('dispatch') || lower.includes('fast')) return Zap;
  if (lower.includes('routing') || lower.includes('workflow')) return Workflow;
  if (lower.includes('outbound') || lower.includes('prospect')) return PhoneOutgoing;
  if (lower.includes('market') || lower.includes('survey') || lower.includes('chart')) return BarChart3;
  if (lower.includes('win-back') || lower.includes('relationship') || lower.includes('partner')) return HeartHandshake;
  if (lower.includes('compliance') || lower.includes('legal') || lower.includes('scale')) return Scale;
  if (lower.includes('cloud') || lower.includes('server') || lower.includes('uptime')) return Server;
  if (lower.includes('access') || lower.includes('cyber') || lower.includes('lock')) return Lock;
  if (lower.includes('backup') || lower.includes('recovery') || lower.includes('storage')) return HardDrive;
  if (lower.includes('patch') || lower.includes('cpu') || lower.includes('infrastructure')) return Cpu;
  if (lower.includes('chat') || lower.includes('response') || lower.includes('speed')) return Timer;
  if (lower.includes('ticket') || lower.includes('inbox') || lower.includes('queue')) return Inbox;
  if (lower.includes('proactive') || lower.includes('trigger') || lower.includes('ai')) return Sparkles;
  if (lower.includes('tone') || lower.includes('human') || lower.includes('empathy')) return Smile;
  if (lower.includes('accuracy') || lower.includes('verified') || lower.includes('target')) return Target;
  if (lower.includes('document') || lower.includes('processing') || lower.includes('entry')) return FileText;
  if (lower.includes('turnaround') || lower.includes('rapid') || lower.includes('gauge')) return Gauge;
  if (lower.includes('double') || lower.includes('verification')) return CheckCheck;
  return Check;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  title,
  pointers,
  image,
  primaryCtaLabel = 'Get Service',
  secondaryCtaLabel = 'See Details',
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-20 bg-surface text-text border border-grey-3/80 overflow-hidden shadow-[var(--shadow-card-crisp)] hover:shadow-[var(--shadow-card-crisp-hover)] transition-all duration-base hover:-translate-y-1 ${className}`}
    >
      {/* Framed Media: small even padding around the card framing the photo (8px / 10px), fully rounded */}
      <div className="relative p-8 sm:p-[10px] w-full">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-16 bg-grey-2 shadow-xs">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-base group-hover:scale-104"
            width="600"
            height="375"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Body: starts cleanly under the framed image with proper padding */}
      <div className="relative z-10 px-20 sm:px-24 pt-16 sm:pt-20 pb-20 sm:pb-24 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-20 md:text-22 font-bold text-primary leading-snug mb-3.5">
            {title}
          </h3>

          {/* Direct Deliverables Pointers: dedicated Lucide service icons at proper 18px size */}
          <ul className="flex flex-col gap-2.5 text-14 text-text mb-5">
            {pointers.map((item, idx) => {
              const text = typeof item === 'string' ? item : item.text;
              const iconName = typeof item === 'object' ? item.iconName : undefined;
              const IconComponent = resolvePointerIcon(text, iconName);

              return (
                <li key={idx} className="flex items-center gap-2.5 leading-snug group/item">
                  <IconComponent
                    size={18}
                    className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] text-secondary shrink-0 transition-transform duration-fast group-hover/item:scale-110"
                    strokeWidth={2.2}
                  />
                  <span className="pt-0.5">{text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pinned Bottom CTAs: Clean button layout as before without nested arrow badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 mt-auto">
          <Button
            href={`/#contact?service=${slug}`}
            variant="primary"
            size="sm"
            className="flex-1 whitespace-nowrap text-center justify-center px-16 sm:px-20"
          >
            {primaryCtaLabel}
          </Button>

          <Button
            to={`/services#${slug}`}
            variant="outline"
            size="sm"
            className="shrink-0 whitespace-nowrap text-center justify-center px-16 sm:px-20"
          >
            {secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
