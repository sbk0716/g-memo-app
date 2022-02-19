import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * usePrevious
 * The Ref object will continue to exist until the component is unmounted,
 * it can hold the previous `taskListLength` value
 * So, when the component is re-rendered,
 * you can get the previous `taskListLength` value
 * @param {number} taskListLength
 * @returns
 */
const usePrevious = (taskListLength) => {
  // create a Ref object that will hold the previous `taskListLength` value
  const ref = useRef();
  useEffect(() => {
    // keep the previous `taskListLength` value in the Ref object
    ref.current = taskListLength;
  }, [taskListLength]);
  return ref.current;
};

HeadingText.propTypes = {
  // `tasks` is the task list
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  // `filterMap` is a list of filtering function
  filterMap: PropTypes.objectOf(PropTypes.func).isRequired,
  // `filterName` is filter name
  filterName: PropTypes.string.isRequired,
};

/**
 * Component | HeadingText
 */
function HeadingText(props) {
  console.info('+++++ Render HeadingText +++++');
  const { tasks, filterMap, filterName } = props;
  const filteredTaskList = tasks.filter(filterMap[filterName]);

  const tasksNoun = filteredTaskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${filteredTaskList.length} ${tasksNoun} remaining`;

  // allows access to the target element that is `ref=listHeadingRef` in the DOM
  const listHeadingRef = useRef(null);
  // prevTaskLength: `prevTaskLength` is the previous `taskLength` value
  const prevTaskListLength = usePrevious(tasks.length);

  /**
   * useEffect
   * if the previous `taskLength` value is greater than the current` taskLength` value
   * focus on the input element(listHeadingRef)
   */
  useEffect(() => {
    // if the previous `taskLength` value is greater than the current` taskLength` value
    if (tasks.length - prevTaskListLength === -1) {
      console.info(listHeadingRef?.current);
      // focus on the input element(listHeadingRef)
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskListLength]);

  return (
    <h2
      id="list-heading"
      // The tabindex attribute specifies the tab order of an element
      tabIndex="-1"
      ref={listHeadingRef}
    >
      {headingText}
    </h2>
  );
}

export default React.memo(HeadingText);
