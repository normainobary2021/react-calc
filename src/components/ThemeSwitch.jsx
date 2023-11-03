import { Moon, Sun } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

const ThemeSwitch = () => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
        document.body.classList.toggle("dark");
    };

    // detected system theme
    useEffect(() => {
        const isDark = window.matchMedia("prefers-color-scheme: dark").matches;
        if (isDark) {
            setTheme("dark");
            document.body.classList.add("dark");
        }
    }, []);

  return (
    <div className='mb-5 flex items-center justify-center'>
        <label htmlFor="switch">
            <input 
              type="checkbox"
              id="switch"
              className="hidden"
              onChange={toggleTheme}
            />
            <div className='flex cursor-pointer items-center gap-4 rounded-full bg-light-200 px-3 py-1 dark:bg-dark-200'>
                <div className='text-primary dark:text-dark-300'>
                    <Sun size={20} />
                </div>
                <div className='dark:text-primary text-dark-300'>
                    <Moon size={20} />
                </div>
            </div>
        </label>
    </div>
  )
}

export default ThemeSwitch