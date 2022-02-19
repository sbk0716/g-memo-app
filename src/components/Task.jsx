import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

Task.propTypes = {
  // `id` is task id
  id: PropTypes.number.isRequired,
  // `title` is task title
  title: PropTypes.string.isRequired,
  // `completed` is `completed` property of the target task
  completed: PropTypes.bool.isRequired,
  // `editTask` edits the target task
  editTask: PropTypes.func.isRequired,
  // `deleteTask` deletes the target task
  deleteTask: PropTypes.func.isRequired,
  // `toggleTaskCompleted` invert the `completed` property  of the target task
  toggleTaskCompleted: PropTypes.func.isRequired,
};

/**
 * usePrevious
 * The Ref object will continue to exist until the component is unmounted,
 * it can hold the previous `isEditing` value
 * So, when the component is re-rendered,
 * you can get the previous `isEditing` value
 * @param {boolean} isEditingValue
 * @returns
 */
const usePrevious = (isEditingValue) => {
  // create a Ref object that will hold the previous `isEditing` value
  const ref = useRef();
  useEffect(() => {
    // for each Task component, keep the previous `isEditing` value in the Ref object
    ref.current = isEditingValue;
  }, [isEditingValue]);
  return ref.current;
};

/**
 * Component | Task
 */
function Task(props) {
  console.info('+++++ Render Task +++++');
  const {
    id, title, completed, editTask, deleteTask, toggleTaskCompleted,
  } = props;

  // isEditing: If you are editing the target task, this value will be true
  const [isEditing, setEditing] = useState(false);
  // define the state for the new task title
  const [newTitle, setNewTitle] = useState('');

  // allows access to the target element that is `ref=editFieldRef` in the DOM
  const editFieldRef = useRef(null);
  // allows access to the target element that is `ref=editButtonRef` in the DOM
  const editButtonRef = useRef(null);

  // wasEditing: `wasEditing` is the previous `isEditing` value
  const wasEditing = usePrevious(isEditing);

  const handleChange = (e) => {
    // cancel the default behavior of browser actions
    e.preventDefault();
    // execute setName to set `value` to `title`
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    // cancel the default behavior of the form that fired the submit event
    e.preventDefault();
    /**
     * If `newTitle` is an empty string,
     * `editTask`,`setNewTitle`,`setEditing` will not be executed
     */
    if (!newTitle.trim()) {
      return;
    }
    // execute `editTask` to edit target task
    editTask(id, newTitle);
    // execute `setName` to clear `title`
    setNewTitle('');
    // execute `editTask` to set `false` to `isEditing`
    setEditing(false);
  };

  /**
   * Component | editingTemplate
   */
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          {`Old task title: ${title}`}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          autoComplete="on"
          // If `newTitle` is an empty string, set `title` to value
          value={newTitle || title}
          // execute `handleChange` on click
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          // execute `setEditing` on click to set false to `isEditing`
          onClick={() => setEditing(false)}
        >
          {'Cancel '}
          <span className="visually-hidden">{`renaming: ${title}`}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          {'Save '}
          <span className="visually-hidden">{`new title for: ${title}`}</span>
        </button>
      </div>
    </form>
  );

  /**
   * Component | viewTemplate
   */
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          // execute `toggleTaskCompleted` on click
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {title}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          // execute `setEditing` on click to set true to `isEditing`
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          {'Edit '}
          <span className="visually-hidden">{title}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          // execute `deleteTask` on click
          onClick={() => deleteTask(id)}
        >
          {'Delete '}
          <span className="visually-hidden">{title}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    /**
     * isEditing: If you are editing the target task, this value will be true
     * wasEditing: `wasEditing` is the previous `isEditing` value
     */
    // if `wasEditing=false` and `isEditing=true`
    if (!wasEditing && isEditing) {
      console.info(editFieldRef?.current);
      // focus on the input element(editFieldRef) of editingTemplate or viewTemplate
      editFieldRef.current.focus();
    }
    // if `wasEditing=true` and `isEditing=false`
    if (wasEditing && !isEditing) {
      console.info(editButtonRef?.current);
      // focus on the input element(editButtonRef) of viewTemplate
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default React.memo(Task);
