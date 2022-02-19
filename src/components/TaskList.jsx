import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

TaskList.propTypes = {
  // `tasks` is the task list
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  // `filterMap` is a list of filtering function
  filterMap: PropTypes.objectOf(PropTypes.func).isRequired,
  // `filterName` is filter name
  filterName: PropTypes.string.isRequired,
  // `toggleTaskCompleted` updates the `completed` property of this task
  toggleTaskCompleted: PropTypes.func.isRequired,
  // `deleteTask` removes the target task from `tasks`
  deleteTask: PropTypes.func.isRequired,
  // `editTask` updates the `name` property of this task
  editTask: PropTypes.func.isRequired,
};

/**
 * Component | TaskList
 */
function TaskList(props) {
  console.info('+++++ Render TaskList +++++');
  const {
    tasks, filterMap, filterName, toggleTaskCompleted, deleteTask, editTask,
  } = props;
  const filteredTaskList = tasks.filter(filterMap[filterName]);
  return (
    <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
      {filteredTaskList.map((task) => (
        <Task
          id={task.id}
          title={task.title}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default React.memo(TaskList);
