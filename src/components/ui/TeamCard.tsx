import React from 'react';
import { TeamMember } from '../../content/site';

export interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, className = '' }) => {
  return (
    <div
      className={`group flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden shadow-sm hover:shadow-md transition-all duration-base hover:-translate-y-1 ${className}`}
    >
      {/* Member Photo - shorter aspect ratio */}
      <div className="aspect-[1/1] w-full overflow-hidden bg-grey-2 relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-[center_15%] transition-transform duration-base group-hover:scale-104"
          width="400"
          height="400"
          loading="lazy"
        />
      </div>

      {/* Details: Job title at top (12px), 12px gap, then Name (16px) */}
      <div className="flex flex-col p-5 md:p-6 text-center items-center justify-center flex-1">
        <span className="text-12 font-medium text-secondary-active tracking-wide">
          {member.role}
        </span>
        <h3 className="text-16 font-bold text-primary mt-[var(--space-12)] leading-tight">
          {member.name}
        </h3>
      </div>
    </div>
  );
};

export default TeamCard;
