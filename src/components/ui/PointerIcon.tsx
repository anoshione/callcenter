import React from 'react';
import {
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

export interface PointerIconProps {
  name?: string;
  className?: string;
}

export const PointerIcon: React.FC<PointerIconProps> = ({
  name,
  className = 'h-3.5 w-3.5 stroke-[2.2]',
}) => {
  switch (name) {
    case 'Clock':
      return <Clock className={className} />;
    case 'Languages':
      return <Languages className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'RefreshCw':
      return <RefreshCw className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'LifeBuoy':
      return <LifeBuoy className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'CalendarCheck':
      return <CalendarCheck className={className} />;
    case 'Filter':
      return <Filter className={className} />;
    case 'PhoneForwarded':
      return <PhoneForwarded className={className} />;
    case 'PhoneIncoming':
      return <PhoneIncoming className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Workflow':
      return <Workflow className={className} />;
    case 'PhoneOutgoing':
      return <PhoneOutgoing className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'HardDrive':
      return <HardDrive className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Timer':
      return <Timer className={className} />;
    case 'Inbox':
      return <Inbox className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'CheckCheck':
      return <CheckCheck className={className} />;
    default:
      return <Check className={className} />;
  }
};

export const getIconForPointer = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes('24/7') || lower.includes('coverage') || lower.includes('hour')) return 'Clock';
  if (lower.includes('bilingual') || lower.includes('language') || lower.includes('specialist')) return 'Languages';
  if (lower.includes('sla') || lower.includes('quality auditing')) return 'ShieldCheck';
  if (lower.includes('crm') || lower.includes('sync') || lower.includes('integration') || lower.includes('helpdesk')) return 'RefreshCw';
  if (lower.includes('tier') || lower.includes('escalation')) return 'Layers';
  if (lower.includes('diagnostic') || lower.includes('logging')) return 'Activity';
  if (lower.includes('knowledge base') || lower.includes('curation')) return 'BookOpen';
  if (lower.includes('incident') || lower.includes('triage') || lower.includes('tracking')) return 'LifeBuoy';
  if (lower.includes('outreach') || lower.includes('decision-maker') || lower.includes('b2b')) return 'Users';
  if (lower.includes('calendar')) return 'CalendarCheck';
  if (lower.includes('qualification') || lower.includes('matrix') || lower.includes('lead')) return 'Filter';
  if (lower.includes('transfer')) return 'PhoneForwarded';
  if (lower.includes('answering') || lower.includes('ivr')) return 'PhoneIncoming';
  if (lower.includes('order') || lower.includes('billing')) return 'CreditCard';
  if (lower.includes('emergency') || lower.includes('dispatch')) return 'Zap';
  if (lower.includes('routing') || lower.includes('zero-abandonment')) return 'Workflow';
  if (lower.includes('warm & cold') || lower.includes('prospect')) return 'PhoneOutgoing';
  if (lower.includes('research') || lower.includes('survey')) return 'BarChart3';
  if (lower.includes('win-back') || lower.includes('re-engagement')) return 'HeartHandshake';
  if (lower.includes('compliance')) return 'Scale';
  if (lower.includes('cloud') || lower.includes('server') || lower.includes('uptime')) return 'Server';
  if (lower.includes('cybersecurity') || lower.includes('security') || lower.includes('access')) return 'Lock';
  if (lower.includes('backup') || lower.includes('disaster recovery')) return 'HardDrive';
  if (lower.includes('patch')) return 'Cpu';
  if (lower.includes('sub-60s') || lower.includes('chat response')) return 'Timer';
  if (lower.includes('ticketing')) return 'Inbox';
  if (lower.includes('proactive') || lower.includes('trigger')) return 'Sparkles';
  if (lower.includes('tone-of-voice') || lower.includes('alignment')) return 'Smile';
  if (lower.includes('accuracy')) return 'Target';
  if (lower.includes('document') || lower.includes('processing')) return 'FileText';
  if (lower.includes('turnaround')) return 'Gauge';
  if (lower.includes('double-entry') || lower.includes('auditing')) return 'CheckCheck';
  return 'Check';
};

export default PointerIcon;
