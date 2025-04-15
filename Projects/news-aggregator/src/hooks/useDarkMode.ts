import { useState, useEffect } from 'react';

function useDarkMode(): [boolean, () => void] {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
            return storedDarkMode === 'true';
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            setIsDarkMode(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return [isDarkMode, toggleDarkMode];
}

export default useDarkMode;
