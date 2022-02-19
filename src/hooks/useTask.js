import { useState, useEffect, useCallback } from 'react';
// import { ulid } from 'ulid';
import {
  getAllTasksData, addTaskData, updateTaskData, deleteTaskData,
} from '../apis/memo';
import { DATA, taskIdSort } from '../utils/task';

/**
 * custom hook | useTask
 * @returns
 */
const useTask = () => {
  // define the state for the task list
  const [tasks, setTasks] = useState(DATA);
  // define the state for the filter name
  const [filterName, setFilterName] = useState('All');

  /**
   * useEffect
   * `asyncGetAllTasksData` is only executed on mount to load the data for the task list
   */
  useEffect(() => {
    /**
     * asyncGetAllTasksData
     */
    const asyncGetAllTasksData = async () => {
      // execute `getAllTasksData`
      const allTasks = await getAllTasksData().catch((e) => {
        console.error(e);
        throw e;
      });
      const reversedAllTasks = taskIdSort([...allTasks]);
      // execute `setTasks` to set `reversedAllTasks` to `tasks`
      setTasks(reversedAllTasks);
    };
    // execute `asyncGetAllTasksData`
    console.info('Execute `asyncGetAllTasksData` defined in the custom hook `useTask`');
    asyncGetAllTasksData().catch((e) => {
      console.error(e);
      throw e;
    });
  }, []);

  /**
   * define setFilterButton
   */
  const setFilterButton = useCallback(
    /**
     * set the filter name to `filterName`
     * @param {string} name
     */
    (name) => {
      console.info(`Set ${name} to filterName`);
      setFilterName(name);
    },
    [],
  );

  /**
   * define toggleTaskCompleted
   */
  const toggleTaskCompleted = useCallback(
    /**
     * if this task has the same `id` as the edited task,
     * update the `completed` property for this task
     * @param {string} id
     */
    async (id) => {
      const promises = [];
      for (const task of tasks) {
        // if this task has the same `id` as the edited task
        if (id === task.id) {
          console.info('### [old]updateTaskData params ###');
          console.info(task);
          // create a new object with the `completed` property inverted
          const newTask = { ...task, completed: !task.completed };
          console.info('### [new]updateTaskData params ###');
          console.info(newTask);
          // execute `updateTaskData`
          const promiseUpdateTaskData = updateTaskData(id, newTask).catch((e) => {
            console.error(e);
            throw e;
          });
          promises.push(promiseUpdateTaskData);
          break;
        }
      }
      Promise.all(promises)
        .then((results) => {
          console.info('results=', results);
          // create a new array from `tasks`
          const updatedTasks = tasks.map((task) => {
            // if this task has the same `id` as the edited task,
            if (id === task.id) {
              // return task(newTask) to create a new array
              const newTask = { ...task, completed: !task.completed };
              return newTask;
            }
            // return task(original) to create a new array
            return task;
          });
          // execute `setTasks` to set `updatedTasks` to `tasks`
          setTasks(updatedTasks);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
    [tasks],
  );
  /**
   * define addTask
   */
  const addTask = useCallback(
    /**
     * create a new task
     * @param {object} params
     * @param {string} params.title
     * @param {string} params.content
     * @param {number} params.categoryId
     */
    (params) => {
      const { title, content, categoryId } = params;
      const date = new Date();
      const now = date.getTime();
      // create a new object
      const newTask = {
        id: now,
        title,
        content,
        categoryId,
        completed: false,
      };
      console.info('### addTaskData params ###');
      console.info(newTask);
      // execute `addTaskData`
      addTaskData(newTask)
        .then((resp) => {
          console.info('resp=', resp);
          const taskListCopy = [...tasks];
          // add `newTask` to the beginning of `taskListCopy`
          taskListCopy.unshift(newTask);
          // execute `setTasks` to set `taskListCopy` to `tasks`
          setTasks(taskListCopy);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
    [tasks],
  );
  /**
   * define editTask
   */
  const editTask = useCallback(
    /**
     * edit the target task
     * @param {string} id
     * @param {string} newTitle
     */
    (id, newTitle) => {
      const promises = [];
      for (const task of tasks) {
        // if this task has the same `id` as the edited task
        if (id === task.id) {
          // create a new object with the `completed` property inverted
          console.info('### [old]updateTaskData params ###');
          console.info(task);
          // create a new object by setting the `title` property to` newTitle`
          const newTask = { ...task, title: newTitle };
          console.info('### [new]updateTaskData params ###');
          console.info(newTask);
          // execute `updateTaskData`
          const promiseUpdateTaskData = updateTaskData(id, newTask).catch((e) => {
            console.error(e);
            throw e;
          });
          promises.push(promiseUpdateTaskData);
          break;
        }
      }
      Promise.all(promises)
        .then((results) => {
          console.info('results=', results);
          // create a new array from `tasks`
          const updatedTasks = tasks.map((task) => {
            // if this task has the same `id` as the edited task,
            if (id === task.id) {
              // return task(newTask) to create a new array
              const newTask = { ...task, title: newTitle };
              return newTask;
            }
            // return task(original) to create a new array
            return task;
          });
          // execute `setTasks` to set `updatedTasks` to `tasks`
          setTasks(updatedTasks);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
    [tasks],
  );
  /**
   * define deleteTask
   */
  const deleteTask = useCallback(
    /**
     * if this task has the same `id` as the deleted task,
     * remove the target task from `tasks`
     * @param {string} id
     */
    (id) => {
      const promises = [];
      for (const task of tasks) {
        // if this task has the same `id` as the deleted task
        if (id === task.id) {
          // execute `deleteTaskData`
          const promiseDeleteTaskData = deleteTaskData(id).catch((e) => {
            console.error(e);
            throw e;
          });
          promises.push(promiseDeleteTaskData);
          break;
        }
      }
      Promise.all(promises)
        .then((results) => {
          console.info('results=', results);
          // remove the target task from `tasks` and create a new array
          const remainingTasks = tasks.filter((task) => id !== task.id);
          // execute `setTasks` to set `remainingTasks` to `tasks`
          setTasks(remainingTasks);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
    [tasks],
  );

  return {
    tasks,
    setTasks,
    filterName,
    setFilterButton,
    toggleTaskCompleted,
    addTask,
    editTask,
    deleteTask,
  };
};
export default useTask;
