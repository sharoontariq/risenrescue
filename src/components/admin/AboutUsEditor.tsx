import React from 'react';
import { 
  Users, 
  Sparkles, 
  Award, 
  Target, 
  Eye, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { SiteContent, AboutTeamMember } from '../../siteContent';
import { ImageField } from './ImageField';

interface AboutUsEditorProps {
  content: SiteContent['about'];
  onChange: (updated: SiteContent['about']) => void;
}

export const AboutUsEditor: React.FC<AboutUsEditorProps> = ({ content, onChange }) => {
  // Team Member Helpers
  const handleUpdateMember = (index: number, updated: Partial<AboutTeamMember>) => {
    const list = [...content.teamMembers];
    list[index] = { ...list[index], ...updated };
    onChange({ ...content, teamMembers: list });
  };

  const handleAddMember = () => {
    const newMember: AboutTeamMember = {
      id: `team-${Date.now()}`,
      name: 'Dr. Jane Doe, DVM',
      role: 'Staff Veterinarian & Care Specialist',
      bio: 'Devoted veterinary caregiver specialized in wildlife triage and post-operative animal nursing.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      badge: 'Veterinary Staff'
    };
    onChange({ ...content, teamMembers: [...content.teamMembers, newMember] });
  };

  const handleDeleteMember = (index: number) => {
    if (content.teamMembers.length <= 1) {
      alert('You must have at least one team member.');
      return;
    }
    const list = content.teamMembers.filter((_, i) => i !== index);
    onChange({ ...content, teamMembers: list });
  };

  const handleMoveMember = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.teamMembers.length) return;
    const list = [...content.teamMembers];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onChange({ ...content, teamMembers: list });
  };

  // Bullets helper
  const handleUpdateMissionBullet = (index: number, value: string) => {
    const bullets = [...content.missionBullets];
    bullets[index] = value;
    onChange({ ...content, missionBullets: bullets });
  };

  const handleUpdateVisionBullet = (index: number, value: string) => {
    const bullets = [...content.visionBullets];
    bullets[index] = value;
    onChange({ ...content, visionBullets: bullets });
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: TOP BREADCRUMB & HEADER */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
          Top Header Bar
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Page Title</label>
            <input
              type="text"
              value={content.pageTitle}
              onChange={(e) => onChange({ ...content, pageTitle: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Non-Profit Status Badge</label>
            <input
              type="text"
              value={content.nonProfitBadge}
              onChange={(e) => onChange({ ...content, nonProfitBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Support CTA Button Text</label>
            <input
              type="text"
              value={content.supportButtonText}
              onChange={(e) => onChange({ ...content, supportButtonText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: HERO MISSION & STORY */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Sparkles className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Hero Mission Section
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Badge Text</label>
            <input
              type="text"
              value={content.heroBadge}
              onChange={(e) => onChange({ ...content, heroBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Main Heading</label>
            <input
              type="text"
              value={content.heroHeading}
              onChange={(e) => onChange({ ...content, heroHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-700">Lead Paragraph</label>
          <textarea
            rows={2}
            value={content.heroParagraph1}
            onChange={(e) => onChange({ ...content, heroParagraph1: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-700">Secondary Paragraph (History & Acreage)</label>
          <textarea
            rows={2}
            value={content.heroParagraph2}
            onChange={(e) => onChange({ ...content, heroParagraph2: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
          />
        </div>

        {/* Hero Image */}
        <ImageField
          label="Hero Hospital / Sanctuary Image"
          value={content.heroImageUrl}
          onChange={(url) => onChange({ ...content, heroImageUrl: url })}
          altValue={content.heroImageAlt}
          onAltChange={(alt) => onChange({ ...content, heroImageAlt: alt })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Image Badge Overlay</label>
            <input
              type="text"
              value={content.heroImageBadge}
              onChange={(e) => onChange({ ...content, heroImageBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Image Caption Overlay</label>
            <input
              type="text"
              value={content.heroImageCaption}
              onChange={(e) => onChange({ ...content, heroImageCaption: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Trust & Accreditation Badges</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={content.trustBadge1}
              onChange={(e) => onChange({ ...content, trustBadge1: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
            <input
              type="text"
              value={content.trustBadge2}
              onChange={(e) => onChange({ ...content, trustBadge2: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
            <input
              type="text"
              value={content.trustBadge3}
              onChange={(e) => onChange({ ...content, trustBadge3: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: MISSION & VISION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mission Card Editor */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Target className="w-4 h-4 text-[#043E49]" />
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Our Mission Card
            </h4>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Badge</label>
            <input
              type="text"
              value={content.missionBadge}
              onChange={(e) => onChange({ ...content, missionBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Title</label>
            <input
              type="text"
              value={content.missionHeading}
              onChange={(e) => onChange({ ...content, missionHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Description</label>
            <textarea
              rows={3}
              value={content.missionDescription}
              onChange={(e) => onChange({ ...content, missionDescription: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700">Key Mission Pillars (3 Bullets)</label>
            {content.missionBullets.map((bullet, idx) => (
              <input
                key={idx}
                type="text"
                value={bullet}
                onChange={(e) => handleUpdateMissionBullet(idx, e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <input
              type="text"
              value={content.missionMandateLabel}
              onChange={(e) => onChange({ ...content, missionMandateLabel: e.target.value })}
              className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg text-gray-700"
            />
            <input
              type="text"
              value={content.missionMandateValue}
              onChange={(e) => onChange({ ...content, missionMandateValue: e.target.value })}
              className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg text-gray-900 font-bold"
            />
          </div>
        </div>

        {/* Vision Card Editor */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Eye className="w-4 h-4 text-[#043E49]" />
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Our Vision Card
            </h4>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Badge</label>
            <input
              type="text"
              value={content.visionBadge}
              onChange={(e) => onChange({ ...content, visionBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Title</label>
            <input
              type="text"
              value={content.visionHeading}
              onChange={(e) => onChange({ ...content, visionHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Description</label>
            <textarea
              rows={3}
              value={content.visionDescription}
              onChange={(e) => onChange({ ...content, visionDescription: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700">Key Vision Pillars (3 Bullets)</label>
            {content.visionBullets.map((bullet, idx) => (
              <input
                key={idx}
                type="text"
                value={bullet}
                onChange={(e) => handleUpdateVisionBullet(idx, e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <input
              type="text"
              value={content.visionHorizonLabel}
              onChange={(e) => onChange({ ...content, visionHorizonLabel: e.target.value })}
              className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg text-gray-700"
            />
            <input
              type="text"
              value={content.visionHorizonValue}
              onChange={(e) => onChange({ ...content, visionHorizonValue: e.target.value })}
              className="px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-lg text-gray-900 font-bold"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: TEAM MEMBERS */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#043E49]" />
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Dedicated Team Members ({content.teamMembers.length})
            </h4>
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Team Badge</label>
            <input
              type="text"
              value={content.teamBadge}
              onChange={(e) => onChange({ ...content, teamBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Team Section Heading</label>
            <input
              type="text"
              value={content.teamHeading}
              onChange={(e) => onChange({ ...content, teamHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-700">Team Section Description</label>
            <input
              type="text"
              value={content.teamDescription}
              onChange={(e) => onChange({ ...content, teamDescription: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-4">
          {content.teamMembers.map((member, idx) => (
            <div
              key={member.id || idx}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-xs font-black text-[#1A1A1A]">
                  #{idx + 1}: {member.name} ({member.role})
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveMember(idx, 'up')}
                    className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === content.teamMembers.length - 1}
                    onClick={() => handleMoveMember(idx, 'down')}
                    className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(idx)}
                    className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateMember(idx, { name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Role / Title</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleUpdateMember(idx, { role: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700">Badge Overlay</label>
                  <input
                    type="text"
                    value={member.badge}
                    onChange={(e) => handleUpdateMember(idx, { badge: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Biography / Experience</label>
                <textarea
                  rows={2}
                  value={member.bio}
                  onChange={(e) => handleUpdateMember(idx, { bio: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <ImageField
                label="Portrait Photo"
                value={member.imageUrl}
                onChange={(url) => handleUpdateMember(idx, { imageUrl: url })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: CALL TO ACTION BANNER */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
          Bottom Call to Action Banner
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Banner Heading</label>
            <input
              type="text"
              value={content.ctaHeading}
              onChange={(e) => onChange({ ...content, ctaHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Donate Button Text</label>
            <input
              type="text"
              value={content.ctaDonateButtonText}
              onChange={(e) => onChange({ ...content, ctaDonateButtonText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-700">Banner Description</label>
            <textarea
              rows={2}
              value={content.ctaDescription}
              onChange={(e) => onChange({ ...content, ctaDescription: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Gallery Button Text</label>
            <input
              type="text"
              value={content.ctaGalleryButtonText}
              onChange={(e) => onChange({ ...content, ctaGalleryButtonText: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
