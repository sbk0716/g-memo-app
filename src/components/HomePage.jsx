import React from 'react';
import Form from './Form';
import FilterButtonList from './FilterButtonList';
import TaskList from './TaskList';
import HeadingText from './HeadingText';
import { FILTER_MAP, FILTER_NAMES } from '../utils/task';
import useTask from '../hooks/useTask';

/**
 * Component | HomePage
 */
function HomePage() {
  console.info('+++++ Render HomePage +++++');
  // execute custom hook(useTask)
  console.info('Execute custom hook(useTask)');
  const {
    tasks, filterName, setFilterButton, toggleTaskCompleted, addTask, editTask, deleteTask,
  } = useTask();

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <FilterButtonList
        filterNameList={FILTER_NAMES}
        filterName={filterName}
        setFilterButton={setFilterButton}
      />
      <HeadingText tasks={tasks} filterMap={FILTER_MAP} filterName={filterName} />
      <TaskList
        tasks={tasks}
        filterMap={FILTER_MAP}
        filterName={filterName}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default React.memo(HomePage);
