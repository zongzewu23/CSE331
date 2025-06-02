import { TodoItem, isRecord, parseItems } from "./todoItem";


/** Parses the response from /api/list into a list of items. */
export const parseListResponse = (data: unknown): Array<TodoItem> => {
  if (!isRecord(data))
    throw new Error(`not a record: ${typeof data}`);

  return parseItems(data.items);
};


/** The type of a response to update the list. */
export type UpdateResponse = {
  name: string,
  added?: boolean,
  completed?: boolean,
  removed?: boolean,
};


/** Parses a response from /api/add or /api/toggle or /api/remove. */
export const parseUpdateResponse = (data: unknown): UpdateResponse => {
  if (!isRecord(data))
    throw new Error(`not a record: ${typeof data}`);

  if (typeof data.name !== 'string')
    throw new Error(`name is not a string: ${typeof data.name}`);

  const res: UpdateResponse = {name: data.name};

  if (data.added !== undefined) {
    if (typeof data.added !== 'boolean')
      throw new Error(`added is not a boolean: ${typeof data.added}`);
    res.added = data.added;
  }

  if (data.completed !== undefined) {
    if (typeof data.completed !== 'boolean')
      throw new Error(`completed is not a boolean: ${typeof data.completed}`);
    res.completed = data.completed;
  }

  if (data.removed !== undefined) {
    if (typeof data.removed !== 'boolean')
      throw new Error(`removed is not a boolean: ${typeof data.removed}`);
    res.removed = data.removed;
  }

  return res;
};
