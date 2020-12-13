import React, { useContext, useState, useEffect, useRef, memo } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const Form = memo(({ setStatus, isFocused }) => {
  // Don't re-render if not needed
  const { addTask, editTask, editItem, clearList } = useContext(
    TaskListContext
  );
  const [text, setText] = useState('');

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem && text) {
      addTask(text);
      setText('');
    } else if (!text) {
      alert('Please enter something 🤗🤗🤗');
    } else {
      editTask(text, editItem.id);
    }
  };

  useEffect(() => {
    if (editItem) {
      setText(editItem.text);
    } else {
      setText('');
    }
  }, [editItem]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="form-container">
      <form className="input-form">
        <div className="input-add">
          <input
            value={text} // Implemented as controlled components
            onChange={(e) => setText(e.target.value)} // Inline Handler
            type="text"
            className="task-input"
            placeholder="Add a new task"
            ref={inputRef} // Try out imperative React
          />
          <button onClick={handleSubmit} className="task-button" type="submit">
            {editItem ? (
              <i className="fas fa-pen"></i>
            ) : (
              <i className="fas fa-plus-square"></i>
            )}
          </button>
        </div>

        <div className="select-clean">
          <select
            onChange={(e) => setStatus(e.target.value)}
            name="tasks"
            className="filter-task"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
          <button
            className="trash-btn clear-btn"
            onClick={() =>
              window.confirm('Do you really want to clear everything? 🤔😈😱')
                ? clearList()
                : false
            }
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </form>
    </div>
  );
});

export default Form;
