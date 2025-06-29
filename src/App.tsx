import React, { useState, useEffect } from 'react';
import { Save, Download, CheckCircle, AlertCircle, FileText, Sparkles, Palette } from 'lucide-react';
import FileUpload from './components/FileUpload';
import PersonalInfoSection from './components/PersonalInfoSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import { Resume, PersonalInfo, Experience, Education } from './types/resume';
import { enhanceWithAI, saveResume } from './utils/api';
import { ThemeProvider, useTheme, themes, ThemeKey } from './contexts/ThemeContext';

function AppContent() {
  const [resume, setResume] = useState<Resume>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancingSection, setEnhancingSection] = useState<string>('');
  const [enhancingIndex, setEnhancingIndex] = useState<number | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('ocean');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const { themeConfig, setTheme } = useTheme();

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('resume-editor-theme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, [setCurrentTheme]);

  const handleThemeChange = (theme: ThemeKey) => {
    setTheme(theme);
    setShowThemeMenu(false);
  };

  // Mock file parsing - in real app, this would parse the actual file
  const handleFileUpload = (file: File) => {
    setUploadedFileName(file.name);
    // Mock parsed data
    const mockData: Resume = {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        summary: 'Experienced software developer with 5+ years in full-stack development.',
      },
      experience: [
        {
          id: '1',
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          startDate: '2020-01',
          endDate: '',
          current: true,
          description: 'Lead development of web applications using React and Node.js.',
        },
      ],
      education: [
        {
          id: '1',
          institution: 'University of Technology',
          degree: "Bachelor's",
          field: 'Computer Science',
          startDate: '2015-08',
          endDate: '2019-05',
          gpa: '3.8',
        },
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    };
    setResume(mockData);
  };

  const handleEnhanceContent = async (section: string, content: string, index?: number) => {
    if (!content.trim()) return;

    setIsEnhancing(true);
    setEnhancingSection(section);
    setEnhancingIndex(index);

    try {
      const enhancedContent = await enhanceWithAI(section, content);

      // Update the appropriate section based on the section type
      if (section === 'summary') {
        setResume(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, summary: enhancedContent },
        }));
      } else if (section === 'experience_description' && index !== undefined) {
        setResume(prev => ({
          ...prev,
          experience: prev.experience.map((exp, i) =>
            i === index ? { ...exp, description: enhancedContent } : exp
          ),
        }));
      } else if (section === 'skills') {
        const skillsArray = enhancedContent.split(',').map(skill => skill.trim());
        setResume(prev => ({ ...prev, skills: skillsArray }));
      }
    } catch (error) {
      console.error('Failed to enhance content:', error);
    } finally {
      setIsEnhancing(false);
      setEnhancingSection('');
      setEnhancingIndex(undefined);
    }
  };

  const handleSaveResume = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await saveResume(resume);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadResume = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `resume_${resume.personalInfo.name.replace(/\s+/g, '_').toLowerCase() || 'unnamed'}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResume(prev => ({ ...prev, personalInfo }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResume(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: Education[]) => {
    setResume(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: string[]) => {
    setResume(prev => ({ ...prev, skills }));
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeConfig.background}`}>
      {/* Header */}
      <div className={`${themeConfig.header} border-b border-gray-200/50 sticky top-0 z-10`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-r ${themeConfig.secondary} rounded-xl flex items-center justify-center shadow-lg`}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r ${themeConfig.accent} rounded-full flex items-center justify-center`}>
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Resume Editor
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Resume Enhancement</p>
              </div>
            </div>

            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
              {/* Theme Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${themeConfig.button} text-white rounded-lg hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  {themeConfig.name}
                </button>

                {showThemeMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowThemeMenu(false)}
                      style={{ pointerEvents: 'auto' }}
                    />
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                      onClick={e => e.stopPropagation()}
                    >
                      {Object.entries(themes).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => handleThemeChange(key as ThemeKey)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3 ${currentTheme === key ? 'bg-gray-100' : ''
                            }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.primary}`}></div>
                          <span className="font-medium">{theme.name}</span>
                          {currentTheme === key && (
                            <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleSaveResume}
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${themeConfig.success} text-white rounded-lg hover:${themeConfig.successHover} disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Resume'}
              </button>

              <button
                onClick={handleDownloadResume}
                className={`inline-flex items-center px-4 py-2.5 bg-gradient-to-r ${themeConfig.button} text-white rounded-lg hover:${themeConfig.buttonHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Upload Status */}
        {uploadedFileName && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="flex items-center text-sm text-blue-800">
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-medium">Loaded:</span> {uploadedFileName}
            </div>
          </div>
        )}

        {/* Save Status */}
        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Resume saved successfully!</span>
            </div>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">Failed to save resume. Please try again.</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* File Upload */}
          <div className={`${themeConfig.card} rounded-2xl shadow-xl border border-white/20 p-8`}>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>

          {/* Personal Information */}
          <div className={`${themeConfig.card} rounded-2xl shadow-xl border border-white/20 overflow-hidden`}>
            <PersonalInfoSection
              personalInfo={resume.personalInfo}
              onChange={updatePersonalInfo}
              onEnhance={handleEnhanceContent}
              isEnhancing={isEnhancing && enhancingSection === 'summary'}
            />
          </div>

          {/* Work Experience */}
          <div className={`${themeConfig.card} rounded-2xl shadow-xl border border-white/20 overflow-hidden`}>
            <ExperienceSection
              experiences={resume.experience}
              onChange={updateExperience}
              onEnhance={handleEnhanceContent}
              isEnhancing={isEnhancing && enhancingSection === 'experience_description'}
              enhancingIndex={enhancingIndex}
            />
          </div>

          {/* Education */}
          <div className={`${themeConfig.card} rounded-2xl shadow-xl border border-white/20 overflow-hidden`}>
            <EducationSection
              education={resume.education}
              onChange={updateEducation}
            />
          </div>

          {/* Skills */}
          <div className={`${themeConfig.card} rounded-2xl shadow-xl border border-white/20 overflow-hidden`}>
            <SkillsSection
              skills={resume.skills}
              onChange={updateSkills}
              onEnhance={handleEnhanceContent}
              isEnhancing={isEnhancing && enhancingSection === 'skills'}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <p className="text-sm">Resume Editor with AI Enhancement • Built with React & FastAPI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('ocean');

  return (
    <ThemeProvider currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;