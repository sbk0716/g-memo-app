import React, { useState } from 'react';
import PropTypes from 'prop-types';

Form.propTypes = {
  // `addTask` creates a new task
  addTask: PropTypes.func.isRequired,
};

/**
 * Component | Form
 */
function Form(props) {
  console.info('+++++ Render Form +++++');
  // define `addTask` to create task
  const { addTask } = props;
  // define the state for the task title
  const [title, setTitle] = useState('');
  // define the state for the task content
  const [content, setContent] = useState('');
  // define the state for the task category
  const [category, setCategory] = useState(1);

  /**
   * define the ID of the htmlFor property
   * [htmlFor property]
   * even if the <label> and <input> are separated,
   * clicking the label text will change the value of the checkbox.
   */
  const newTaskTitleInput = 'memo-title';
  const newTaskContentInput = 'memo-content';
  const newTaskCategoryInput = 'memo-category';

  const handleSubmit = (e) => {
    // cancel the default behavior of the form that fired the submit event
    e.preventDefault();
    /**
     * If `title` is an empty string,
     * `addTask` and `setTitle` and `setContent` will not be executed
     */
    if (!title.trim()) {
      return;
    }
    /**
     * If `content` is an empty string,
     * `addTask` and `setTitle` and `setContent` will not be executed
     */
    if (!content.trim()) {
      return;
    }
    const categoryId = parseInt(category, 10);
    // execute `addTask` to create task
    const addTaskParams = { title, content, categoryId };
    addTask(addTaskParams);
    // execute `setTitle` to clear `title`
    setTitle('');
    // execute `setContent` to clear `content`
    setContent('');
    // execute `setCategory` to clear `category`
    setCategory(1);
  };

  const handleTitleChange = (e) => {
    // cancel the default behavior of browser actions
    e.preventDefault();
    // execute setTitle to set `value` to `title`
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    // cancel the default behavior of browser actions
    e.preventDefault();
    // execute setContent to set `value` to `content`
    setContent(e.target.value);
  };
  const handleCategoryChange = (e) => {
    // cancel the default behavior of browser actions
    e.preventDefault();
    // execute setCategory to set `value` to `category`
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <label htmlFor={newTaskCategoryInput} className="label">
        <span>CATEGORY: </span>
        <select value={category} onChange={handleCategoryChange}>
          <option value="1">todo</option>
          <option value="2">tips</option>
        </select>
      </label>
      <label htmlFor={newTaskTitleInput} className="label">
        <span>TITLE: </span>
      </label>
      <input
        type="text"
        id={newTaskTitleInput}
        className="input"
        name="text"
        autoComplete="on"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      <br />
      <h3 className="label-wrapper-content">
        <label htmlFor={newTaskContentInput} className="label">
          CONTENT:
        </label>
      </h3>
      <input
        type="text"
        id={newTaskContentInput}
        className="input input__lg"
        name="text"
        autoComplete="on"
        value={content}
        onChange={handleContentChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add Task
      </button>
    </form>
  );
}

export default React.memo(Form);
