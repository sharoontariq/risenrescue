import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2 
} from 'lucide-react';
import { SiteContent, FutureGoalItem } from '../../siteContent';
import { ImageField } from './ImageField';

interface FutureGoalsEditorProps {
  content: SiteContent['goals'];
  onChange: (updated: SiteContent['goals']) => void;
}

export const FutureGoalsEditor: React.FC<FutureGoalsEditorProps> = ({ content, onChange }) => {
  // Goals list helpers
  const handleUpdateGoal = (index: number, updated: Partial<FutureGoalItem>) => {
    const list = [...content.goals];
    list[index] = { ...list[index], ...updated };
    onChange({ ...content, goals: list });
  };

  const handleAddGoal = () => {
    const newGoal: FutureGoalItem = {
      id: `goal-${Date.now()}`,
      tag: 'New Strategic Initiative',
      targetYear: 'Target: 2028',
      heading: 'Title of Strategic Initiative',
      description: 'Describe the initiative scope, impact on wildlife habitats or veterinary equipment, and community benefit.',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Initiative visual representation',
      highlights: [
        'First key milestone or metric of this initiative',
        'Second key structural achievement and preservation outcome',
        'Third key long-term benefit for injured animals and sanctuary'
      ]
    };
    onChange({ ...content, goals: [...content.goals, newGoal] });
  };

  const handleDeleteGoal = (index: number) => {
    if (content.goals.length <= 1) {
      alert('You must have at least one future goal.');
      return;
    }
    const list = content.goals.filter((_, i) => i !== index);
    onChange({ ...content, goals: list });
  };

  const handleMoveGoal = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= content.goals.length) return;
    const list = [...content.goals];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    onChange({ ...content, goals: list });
  };

  const handleUpdateHighlight = (goalIndex: number, highlightIndex: number, text: string) => {
    const list = [...content.goals];
    const highlights = [...list[goalIndex].highlights];
    highlights[highlightIndex] = text;
    list[goalIndex] = { ...list[goalIndex], highlights };
    onChange({ ...content, goals: list });
  };

  const handleAddHighlight = (goalIndex: number) => {
    const list = [...content.goals];
    const highlights = [...list[goalIndex].highlights, 'New milestone highlight point'];
    list[goalIndex] = { ...list[goalIndex], highlights };
    onChange({ ...content, goals: list });
  };

  const handleDeleteHighlight = (goalIndex: number, highlightIndex: number) => {
    const list = [...content.goals];
    if (list[goalIndex].highlights.length <= 1) {
      alert('Each goal should have at least 1 milestone highlight.');
      return;
    }
    const highlights = list[goalIndex].highlights.filter((_, i) => i !== highlightIndex);
    list[goalIndex] = { ...list[goalIndex], highlights };
    onChange({ ...content, goals: list });
  };

  return (
    <div className="space-y-6">
      {/* Intro Header Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Sparkles className="w-4 h-4 text-[#043E49]" />
          <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Future Goals Page Introduction
          </h4>
        </div>

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
            <label className="text-[11px] font-bold text-gray-700">Badge Text</label>
            <input
              type="text"
              value={content.introBadge}
              onChange={(e) => onChange({ ...content, introBadge: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700">Main Heading</label>
            <input
              type="text"
              value={content.introHeading}
              onChange={(e) => onChange({ ...content, introHeading: e.target.value })}
              className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-700">Introductory Paragraph</label>
          <textarea
            rows={2}
            value={content.introDescription}
            onChange={(e) => onChange({ ...content, introDescription: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
          />
        </div>
      </div>

      {/* Strategic Initiatives List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Strategic Initiatives ({content.goals.length})
            </h4>
            <p className="text-[11px] text-gray-500">Each horizontal goal section displayed on the Future Goals page.</p>
          </div>

          <button
            type="button"
            onClick={handleAddGoal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Initiative</span>
          </button>
        </div>

        {content.goals.map((goal, idx) => (
          <div
            key={goal.id || idx}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#043E49]/10 text-[#043E49] font-black text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <span className="text-xs font-black text-[#1A1A1A]">{goal.heading}</span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold">
                  {goal.targetYear}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveGoal(idx, 'up')}
                  className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === content.goals.length - 1}
                  onClick={() => handleMoveGoal(idx, 'down')}
                  className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteGoal(idx)}
                  className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                  title="Delete Goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Initiative Tag</label>
                <input
                  type="text"
                  value={goal.tag}
                  onChange={(e) => handleUpdateGoal(idx, { tag: e.target.value })}
                  placeholder="e.g. Land & Habitats"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700">Target Year</label>
                <input
                  type="text"
                  value={goal.targetYear}
                  onChange={(e) => handleUpdateGoal(idx, { targetYear: e.target.value })}
                  placeholder="e.g. Target: 2027"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="text-[11px] font-bold text-gray-700">Initiative Title</label>
                <input
                  type="text"
                  value={goal.heading}
                  onChange={(e) => handleUpdateGoal(idx, { heading: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Detailed Narrative</label>
              <textarea
                rows={3}
                value={goal.description}
                onChange={(e) => handleUpdateGoal(idx, { description: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
              />
            </div>

            {/* Highlights Bullets */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#043E49]" />
                  <span>Key Strategic Highlights / Bullets</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleAddHighlight(idx)}
                  className="text-[10px] font-bold text-[#043E49] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Highlight</span>
                </button>
              </div>

              <div className="space-y-2">
                {goal.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => handleUpdateHighlight(idx, hIdx, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteHighlight(idx, hIdx)}
                      className="p-1 text-gray-400 hover:text-rose-500 cursor-pointer"
                      title="Remove highlight"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <ImageField
              label="Initiative Cover Image"
              value={goal.imageUrl}
              onChange={(url) => handleUpdateGoal(idx, { imageUrl: url })}
              altValue={goal.imageAlt}
              onAltChange={(alt) => handleUpdateGoal(idx, { imageAlt: alt })}
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
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
            <label className="text-[11px] font-bold text-gray-700">Description</label>
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
