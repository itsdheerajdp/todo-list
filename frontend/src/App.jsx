import React, { useState } from 'react';
import TodoList from './components/TodoList';
import { useTranslation } from 'react-i18next';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const { t } = useTranslation();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(fontSize - 2);

  return (
    <div className={darkMode ? 'dark-mode' : ''} style={{ fontSize: `${fontSize}px` }}>
      <header>
        <h1>{t('Accessible TODO List')}</h1>
        <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {darkMode ? t('Light Mode') : t('Dark Mode')}
        </button>

        <div>
          <button onClick={increaseFontSize} aria-label="Increase Font Size">A+</button>
          <button onClick={decreaseFontSize} aria-label="Decrease Font Size">A-</button>
        </div>
      </header>
      <TodoList />
    </div>
  );
};

export default App;
