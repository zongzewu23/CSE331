// Description of an individual item in the To-Do list
export type TodoItem = {
  name: string;
  completed: boolean;
};


/**
 * Parses unknown data into an array of items.
 * @param val unknown data to parse into an array of items
 * @throws an Error if the given value is not an array of items
 * @return array of items
 */
export const parseItems = (val: unknown): Array<TodoItem> => {
  if (!Array.isArray(val))
    throw new Error(`not an array: ${typeof val}`);

  const items: Array<TodoItem> = [];
  for (const item of val) {
    items.push(parseItem(item));
  }
  return items;
};

/**
 * Parses unknown data into a TodoItems.
 * @param val unknown data to parse into a TodoItem.
 * @throws an Error if the given value is not a TodoItem
 * @return the TodoItem found
 */
const parseItem = (val: unknown): TodoItem => {
  if (!isRecord(val))
    throw new Error(`item is not a record: ${typeof val}`);

  if (typeof val.name !== 'string')
    throw new Error(`name is missing or invalid: ${typeof val.name}`);

  if (typeof val.completed !== 'boolean')
    throw new Error(`completed is missing or invalid: ${typeof val.completed}`);

  return {name: val.name, completed: val.completed};
};


/**
 * Determines whether the given value is a record.
 * @param val the value to check
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
  return val !== null && typeof val === "object";
};