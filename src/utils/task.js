// define a list of filtering function
export const FILTER_MAP = {
  All: () => true,
  // return the inverted `completed` property
  Active: (task) => !task.completed,
  // return the inverted `completed` property
  Completed: (task) => task.completed,
};

// define a list for filter button name
export const FILTER_NAMES = Object.keys(FILTER_MAP);

// define the initial data of the task list
export const DATA = [
  {
    id: 1, title: 'Eat', categoryId: 1, completed: true,
  },
  {
    id: 2, title: 'Sleep', categoryId: 1, completed: false,
  },
  {
    id: 3, title: 'Repeat', categoryId: 1, completed: false,
  },
];

/**
 * taskIdSort
 * sort the array elements in descending order by their `id`.
 * @param {Array<object>} list
 * @returns
 */
export const taskIdSort = (list) => {
  list.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }
    return -1;
  });
  return list;
};
