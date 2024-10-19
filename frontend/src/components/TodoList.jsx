import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en-US');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { t, i18n } = useTranslation();

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleVoiceInput = () => {
    if (transcript.trim()) {
      setTodos([...todos, { text: transcript, completed: false }]);
      resetTranscript();
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ language });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    handleVoiceInput();
  };

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    switch (selectedLanguage) {
      case 'ta-IN':
        i18n.changeLanguage('ta');
        break;
      case 'te-IN':
        i18n.changeLanguage('te');
        break;
      case 'hi-IN':
        i18n.changeLanguage('hi');
        break;
      default:
        i18n.changeLanguage('en');
    }
  };

  return (
    <div>
      <h2>{t('todo_list')}</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('add_task_placeholder')}
          aria-label={t('add_task_placeholder')}
        />
        <button onClick={addTodo} aria-label="Add task">{t('add_task')}</button>

        <select
          value={language}
          onChange={changeLanguage}
          aria-label={t('language_select')}
        >
          <option value="en-US">English</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
          <option value="hi-IN">Hindi</option>
        </select>

        <button onMouseDown={startListening} onMouseUp={stopListening} aria-label="Start voice input">
          {listening ? `${t('listening')}...` : t('add_task_by_voice')}
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleComplete(index)} aria-label="Toggle Complete">
              {todo.completed ? t('undo') : t('complete')}
            </button>
            <button onClick={() => deleteTodo(index)} aria-label="Delete Task">{t('delete')}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
