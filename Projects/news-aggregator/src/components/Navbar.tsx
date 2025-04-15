import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

function Navbar() {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <nav>
            <ul>
                {/* Existing Menu Items */}
                <li>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;