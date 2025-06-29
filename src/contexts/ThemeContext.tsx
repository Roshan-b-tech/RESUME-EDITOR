import React, { createContext, useContext, ReactNode } from 'react';

export const themes = {
    ocean: {
        name: 'Ocean',
        primary: 'from-blue-500 to-indigo-600',
        secondary: 'from-blue-600 to-purple-600',
        accent: 'from-green-400 to-blue-500',
        background: 'from-slate-50 via-blue-50 to-indigo-100',
        card: 'bg-white/70 backdrop-blur-sm',
        header: 'bg-white/80 backdrop-blur-sm',
        button: 'from-blue-500 to-indigo-600',
        buttonHover: 'from-blue-600 to-indigo-700',
        success: 'from-green-500 to-emerald-600',
        successHover: 'from-green-600 to-emerald-700',
        warning: 'from-purple-500 to-pink-500',
        warningHover: 'from-purple-600 to-pink-600',
        sectionColors: {
            personal: 'from-blue-500 to-indigo-600',
            experience: 'from-green-500 to-emerald-600',
            education: 'from-purple-500 to-pink-600',
            skills: 'from-orange-500 to-red-600',
        },
    },
    sunset: {
        name: 'Sunset',
        primary: 'from-orange-500 to-red-600',
        secondary: 'from-red-500 to-pink-600',
        accent: 'from-yellow-400 to-orange-500',
        background: 'from-orange-50 via-red-50 to-pink-100',
        card: 'bg-white/70 backdrop-blur-sm',
        header: 'bg-white/80 backdrop-blur-sm',
        button: 'from-orange-500 to-red-600',
        buttonHover: 'from-orange-600 to-red-700',
        success: 'from-green-500 to-emerald-600',
        successHover: 'from-green-600 to-emerald-700',
        warning: 'from-purple-500 to-pink-500',
        warningHover: 'from-purple-600 to-pink-600',
        sectionColors: {
            personal: 'from-orange-500 to-red-600',
            experience: 'from-red-500 to-pink-600',
            education: 'from-yellow-500 to-orange-600',
            skills: 'from-pink-500 to-rose-600',
        },
    },
    forest: {
        name: 'Forest',
        primary: 'from-green-500 to-emerald-600',
        secondary: 'from-emerald-500 to-teal-600',
        accent: 'from-green-400 to-blue-500',
        background: 'from-green-50 via-emerald-50 to-teal-100',
        card: 'bg-white/70 backdrop-blur-sm',
        header: 'bg-white/80 backdrop-blur-sm',
        button: 'from-green-500 to-emerald-600',
        buttonHover: 'from-green-600 to-emerald-700',
        success: 'from-green-500 to-emerald-600',
        successHover: 'from-green-600 to-emerald-700',
        warning: 'from-purple-500 to-pink-500',
        warningHover: 'from-purple-600 to-pink-600',
        sectionColors: {
            personal: 'from-green-500 to-emerald-600',
            experience: 'from-emerald-500 to-teal-600',
            education: 'from-teal-500 to-cyan-600',
            skills: 'from-green-400 to-blue-500',
        },
    },
    lavender: {
        name: 'Lavender',
        primary: 'from-purple-500 to-pink-600',
        secondary: 'from-pink-500 to-rose-600',
        accent: 'from-purple-400 to-pink-500',
        background: 'from-purple-50 via-pink-50 to-rose-100',
        card: 'bg-white/70 backdrop-blur-sm',
        header: 'bg-white/80 backdrop-blur-sm',
        button: 'from-purple-500 to-pink-600',
        buttonHover: 'from-purple-600 to-pink-700',
        success: 'from-green-500 to-emerald-600',
        successHover: 'from-green-600 to-emerald-700',
        warning: 'from-purple-500 to-pink-500',
        warningHover: 'from-purple-600 to-pink-600',
        sectionColors: {
            personal: 'from-purple-500 to-pink-600',
            experience: 'from-pink-500 to-rose-600',
            education: 'from-purple-400 to-pink-500',
            skills: 'from-rose-500 to-pink-600',
        },
    },
    midnight: {
        name: 'Midnight',
        primary: 'from-gray-700 to-gray-900',
        secondary: 'from-gray-600 to-gray-800',
        accent: 'from-blue-400 to-indigo-500',
        background: 'from-gray-900 via-gray-800 to-gray-700',
        card: 'bg-gray-800/70 backdrop-blur-sm',
        header: 'bg-gray-800/80 backdrop-blur-sm',
        button: 'from-gray-700 to-gray-900',
        buttonHover: 'from-gray-600 to-gray-800',
        success: 'from-green-500 to-emerald-600',
        successHover: 'from-green-600 to-emerald-700',
        warning: 'from-purple-500 to-pink-500',
        warningHover: 'from-purple-600 to-pink-600',
        sectionColors: {
            personal: 'from-gray-700 to-gray-900',
            experience: 'from-gray-600 to-gray-800',
            education: 'from-gray-500 to-gray-700',
            skills: 'from-blue-400 to-indigo-500',
        },
    },
};

export type ThemeKey = keyof typeof themes;

interface ThemeContextType {
    currentTheme: ThemeKey;
    themeConfig: typeof themes[ThemeKey];
    setTheme: (theme: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
    currentTheme: ThemeKey;
    setCurrentTheme: (theme: ThemeKey) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    currentTheme,
    setCurrentTheme
}) => {
    const themeConfig = themes[currentTheme];

    const setTheme = (theme: ThemeKey) => {
        setCurrentTheme(theme);
        localStorage.setItem('resume-editor-theme', theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 