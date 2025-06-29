import React from 'react';
import { Plus, Trash2, Sparkles, Loader2, Briefcase, Building, Calendar, MapPin } from 'lucide-react';
import { Experience } from '../types/resume';
import { useTheme } from '../contexts/ThemeContext';

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  onEnhance: (section: string, content: string, index?: number) => void;
  isEnhancing: boolean;
  enhancingIndex?: number;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onChange,
  onEnhance,
  isEnhancing,
  enhancingIndex,
}) => {
  const { themeConfig } = useTheme();
  const sectionColor = themeConfig.sectionColors.experience;

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleEnhanceDescription = (index: number) => {
    const experience = experiences[index];
    onEnhance('experience_description', experience.description, index);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${sectionColor} rounded-xl flex items-center justify-center shadow-md`}>
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        </div>
        <button
          onClick={addExperience}
          className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${themeConfig.button} text-white rounded-lg hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${sectionColor} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Experience {index + 1}</h3>
              </div>
              <button
                onClick={() => removeExperience(experience.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-green-500" />
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-green-500" />
                  Position
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Job title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  End Date
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm disabled:opacity-50"
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">Current</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                  Job Description
                </label>
                <button
                  onClick={() => handleEnhanceDescription(index)}
                  disabled={isEnhancing || !experience.description}
                  className={`inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r ${themeConfig.warning} text-white rounded-lg hover:${themeConfig.warningHover} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                >
                  {isEnhancing && enhancingIndex === index ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  Enhance with AI
                </button>
              </div>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
                rows={4}
                placeholder="Describe your responsibilities and achievements in this role..."
              />
              <div className="text-xs text-gray-500 text-right">
                {experience.description.length} characters
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No work experience added yet</h3>
            <p className="text-gray-500 mb-6">Start building your professional journey by adding your work experience</p>
            <button
              onClick={addExperience}
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${themeConfig.button} text-white rounded-xl hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;