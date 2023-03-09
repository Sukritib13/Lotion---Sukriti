import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function EditNotes() {
  const [title, setTitle] = useState(localStorage.getItem('title') || 'Untitled');
  const [content, setContent] = useState(localStorage.getItem('content') || '');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('title', title);
    localStorage.setItem('content', content);
  }, [title, content]);

  function handleTitleChange(event) {
    setTitle(event.target.innerHTML);
  }

  function handleContentChange(value) {
    setContent(value);
  }

  function handleTitleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  }

  function handleSave() {
    const note = {
      title: title,
      content: content,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('note', JSON.stringify(note));
    navigate('/notes/noteId');
  }

  return (
    <div id="notesPage" className="note-edit">
      <div id="noteHeader">
        <div id="titleText">
          <div
            id="noteTitle"
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: title }}
            onBlur={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
          >

          </div>
          <input type="datetime-local" id="dateBtn" />
        </div>

        <div id="saveDelete">
          <button id="saveDeleteBtn" onClick={handleSave}>Save</button>
          <button id="saveDeleteBtn">Delete</button>
        </div>
      </div>

      <div id="format">
        <ReactQuill
          theme="snow"
          style={{ height: '500px' }}
          placeholder="Your Note Here"
          value={content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
}

export default EditNotes;


