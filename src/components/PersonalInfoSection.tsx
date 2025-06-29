import React from 'react';
import { Sparkles, Loader2, User, Mail, Phone, MapPin } from 'lucide-react';
import { PersonalInfo } from '../types/resume';
import { useTheme } from '../contexts/ThemeContext';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
  onEnhance: (section: string, content: string) => void;
  isEnhancing: boolean;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  onChange,
  onEnhance,
  isEnhancing,
}) => {
  const { themeConfig } = useTheme();
  const sectionColor = themeConfig.sectionColors.personal;

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  const handleEnhanceSummary = () => {
    onEnhance('summary', personalInfo.summary);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${sectionColor} rounded-xl flex items-center justify-center shadow-md`}>
            <User className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <User className="h-4 w-4 mr-2 text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Mail className="h-4 w-4 mr-2 text-blue-500" />
            Email Address
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            Phone Number
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            Location
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="City, State/Province"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
            Professional Summary
          </label>
          <button
            onClick={handleEnhanceSummary}
            disabled={isEnhancing || !personalInfo.summary}
            className={`inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r ${themeConfig.warning} text-white rounded-lg hover:${themeConfig.warningHover} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
          >
            {isEnhancing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Enhance with AI
          </button>
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm"
          rows={4}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
        />
        <div className="text-xs text-gray-500 text-right">
          {personalInfo.summary.length} characters
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;