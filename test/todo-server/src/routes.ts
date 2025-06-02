import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check


// Description of an individual item in the list.
type TodoItem = {
  name: string,
  completed: boolean,
};


// Map from item name to item. (Note that item names must be unique.)
const itemMap: Map<string, TodoItem> = new Map();


/**
 * Returns a list of all items that are uncompleted or were completed less than
 * 5 seconds ago.
 * @param _req the request
 * @param res the response
 */
export const listItems = (_req: SafeRequest, res: SafeResponse): void => {
  const items: Array<TodoItem> = [];
  for (const [_name, item] of itemMap) {
    items.push(item);
  }
  res.send({items: items});
}


/**
 * Add the item to the list.
 * @param req the request
 * @param res the response
 */
export const addItem = (req: SafeRequest, res: SafeResponse):void => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send(`name is not a string: ${name}`);
    return;
  }

  // If the item does not already exist, then add it. Notify the client of
  // whether we had to add the item.
  const item = itemMap.get(name);
  if (item === undefined) {
    itemMap.set(name, {name: name, completed: false});
    res.send({name: name, added: true});
  } else {
    res.send({name: name, added: false});
  }
}


/**
 * Toggle the state of the item (incomplete to complete or vice-versa).
 * @param req the request
 * @param res the response
 */
export const toggleItem = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send("name is not a string: ${name}");
    return;
  }

  const item = itemMap.get(name);
  if (item === undefined) {
    res.status(400).send(`no item called "${name}"`);
    return;
  }

  const newCompleted = !item.completed;

  item.completed = newCompleted; // works because of reference semantics
  res.send({ name: name, completed: newCompleted });
}


/**
 * Removes the given item.
 * @param req the request
 * @param res the response
 */
export const removeItem = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send("name is not a string: ${name}");
    return;
  }

  const item = itemMap.get(name);
  if (item !== undefined) {
    itemMap.delete(item.name);
    res.send({name: name, removed: true});
  } else {
    res.send({name: name, removed: false});  // didn't exist
  }
}
