import React, { useState } from 'react';
import { Plus, X, Sparkles, Loader2, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  onEnhance: (section: string, content: string) => void;
  isEnhancing: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onChange,
  onEnhance,
  isEnhancing,
}) => {
  const { themeConfig } = useTheme();
  const sectionColor = themeConfig.sectionColors.skills;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const handleEnhanceSkills = () => {
    onEnhance('skills', skills.join(', '));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${sectionColor} rounded-xl flex items-center justify-center shadow-md`}>
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        </div>
        <button
          onClick={handleEnhanceSkills}
          disabled={isEnhancing || skills.length === 0}
          className={`inline-flex items-center px-4 py-2.5 text-sm bg-gradient-to-r ${themeConfig.warning} text-white rounded-lg hover:${themeConfig.warningHover} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          {isEnhancing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Enhance with AI
        </button>
      </div>

      <div className="space-y-6">
        {/* Add New Skill */}
        <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-orange-500" />
            Add New Skill
          </h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Enter a skill (e.g., React, Python, Project Management)"
            />
            <button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className={`px-6 py-3 bg-gradient-to-r ${sectionColor} text-white rounded-xl hover:${sectionColor.replace('500', '600').replace('600', '700')} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Skills List */}
        {skills.length > 0 && (
          <div className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-orange-500" />
              Your Skills ({skills.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="group relative bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-xl px-4 py-2 flex items-center space-x-2 hover:from-orange-200 hover:to-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="text-orange-800 font-medium text-sm">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-orange-600 hover:text-red-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No skills added yet</h3>
            <p className="text-gray-500 mb-6">Add your technical and soft skills to showcase your expertise</p>
            <div className="text-sm text-gray-400">
              <p>Examples: React, Python, Project Management, Leadership</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;