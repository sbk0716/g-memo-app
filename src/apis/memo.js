import axios from 'axios';

const taskDataUrl = 'http://localhost:3100/memo';
/**
 * getAllTasksData
 */
export const getAllTasksData = async () => {
  const response = await axios.get(taskDataUrl);
  console.info('### getAllTasksData result ###');
  console.info(response.data);
  return response.data;
};
/**
 * addTaskData
 */
export const addTaskData = async (task) => {
  const response = await axios.post(taskDataUrl, task);
  console.info('### addTaskData result ###');
  console.info(response.data);
  return response.data;
};
/**
 * deleteTaskData
 */
export const deleteTaskData = async (id) => {
  const response = await axios.delete(`${taskDataUrl}/${id}`);
  console.info('### deleteTaskData result ###');
  console.info(response.data);
  return id;
};
/**
 * updateTaskData
 */
export const updateTaskData = async (id, task) => {
  const response = await axios.put(`${taskDataUrl}/${id}`, task);
  console.info('### updateTaskData result ###');
  console.info(response.data);
  return response.data;
};
