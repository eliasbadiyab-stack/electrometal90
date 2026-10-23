import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, MessageSquare, Shield, Award } from 'lucide-react';

interface SpecialMembersShowcaseProps {
  onDirectMessage: (userId: string) => void;
}

export const SpecialMembersShowcase: React.FC<SpecialMembersShowcaseProps> = ({ onDirectMessage }) => {
  const { users, siteSettings } = useApp();

  const specialMembers = users.filter(u => u.isSpecialMember);

  if (specialMembers.length === 0) return null;

  return (
    <section id="team_showcase" className="py-12 border-t border-slate-800/80">
      <div className="mb-8 space-y-1">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            تیم مهندسی و اعضای تایید شده
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          متخصصین طراح و ناظران کیفیت پروژه‌های سخت‌افزاری Electro Metal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialMembers.map(member => (
          <div 
            key={member.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Avatar placeholder with initials */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 font-bold text-base shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm">{member.name}</h3>
                  {member.isVerified && (
                    <span title="دارای تیک آبی رسمی">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    </span>
                  )}
                </div>

                <div className="text-xs text-cyan-400/90 font-medium">
                  {member.specialTitle || (member.role === 'owner' ? 'مالک و مدیر پلتفرم' : 'عضو تیم فنی')}
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {member.email}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px]">
                <Shield className="h-3 w-3 text-cyan-400" />
                <span>عضویت رسمی تایید شده</span>
              </span>

              {siteSettings.features.messagingEnabled && (
                <button
                  onClick={() => onDirectMessage(member.id)}
                  className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>ارسال پیام</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
