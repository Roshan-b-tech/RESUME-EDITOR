import React from 'react';
import { Plus, Trash2, GraduationCap, Building, Calendar, Award } from 'lucide-react';
import { Education } from '../types/resume';
import { useTheme } from '../contexts/ThemeContext';

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onChange,
}) => {
  const { themeConfig } = useTheme();
  const sectionColor = themeConfig.sectionColors.education;

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    onChange([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${sectionColor} rounded-xl flex items-center justify-center shadow-md`}>
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        </div>
        <button
          onClick={addEducation}
          className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${themeConfig.button} text-white rounded-lg hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${sectionColor} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Education {index + 1}</h3>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-purple-500" />
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="University or school name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-purple-500" />
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-purple-500" />
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Computer Science, Engineering, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-purple-500" />
                  GPA (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="3.8/4.0"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                  Start Date
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No education added yet</h3>
            <p className="text-gray-500 mb-6">Add your educational background to showcase your academic achievements</p>
            <button
              onClick={addEducation}
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${themeConfig.button} text-white rounded-xl hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection;