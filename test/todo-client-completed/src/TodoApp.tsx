import React, { ChangeEvent, Component, MouseEvent } from 'react';

import { TodoItem } from './todoItem';
import { parseListResponse, parseUpdateResponse } from './response';

type TodoAppProps = {};
type TodoAppState = {
  items: Array<TodoItem> | undefined,
  newItem: string
};

export class TodoApp extends Component<TodoAppProps, TodoAppState> {

  constructor(props: TodoAppProps) {
    super(props);
    this.state = { items: undefined, newItem: "" };
  }

  componentDidMount = () => {
    fetch('/api/list')
      .then(this.doListResp)
      .catch((e) => `/api/list could not connect ${e}`)
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h1>To-Do List</h1>
        {this.renderItems()}
        <p>Check the item to mark it completed. Click delete to remove it.</p>
        <div>
          <label htmlFor='item-input'>New item: </label>
          <input type="text" value={this.state.newItem}
            onChange={this.doNewItemChange} id='item-input' />
          <button type="button"
            onClick={this.doAddClick}>Add Item</button>
        </div>
      </div>
    );
  }

  renderItems = (): JSX.Element => {
    if (this.state.items === undefined) {
      return <p>Loading to-dos from server...</p>
    }

    if (this.state.items.length === 0) {
      return <p>No items. Add one to get started!</p>
    }

    const items = [];
    for (let i = 0; i < this.state.items.length; i++) {
      const item = this.state.items[i];
      items.push(
        <li key={i}>
          <input type="checkbox" id={"check" + i} checked={item.completed}
            onChange={evt => this.doItemToggleComplete(evt, i)} />
          <label htmlFor={"check" + i}>
            {item.completed ? <s>{item.name}</s> : item.name}
          </label>{" "}
          <button onClick={evt => this.doItemRemove(evt, i)}>Delete</button>
        </li>
      )
    }
    return <ul>{items}</ul>;
  };

  // Handlers for fetching the initial list

  doListResp = (res: Response): void => {
    if (res.status === 200) {
      res.json()
        .then(this.doListJson)
        .catch((e) => `/api/list error could not parse JSON ${e}`)
    } else {
      res.text()
        .then(() => '/api/list error response does not work')
        .catch((e) => `/api/list error response does not work ${e}`)
    }
  }

  doListJson = (val: unknown): void => {
    this.setState({ items: parseListResponse(val) })
  }

  // Handlers for adding an item

  doAddClick = (_evt: MouseEvent<HTMLButtonElement>) => {
    const name = this.state.newItem.trim();
    if (name.length == 0)
      return;

    const args = { name: name };

    fetch("/api/add", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
      .then(this.doAddResp)
      .catch((e) => console.error(`failed to connect to server ${e}`));
  }

  doAddResp = (res: Response): void => {
    if (res.status === 200) {
      res.json()
        .then(this.doAddJson)
        .catch((e) => console.error(`/api/add error 200 response is invalid JSON: ${e}`));
    } else {
      res.text()
        .then((e) => console.error(`/api/add server error: ${e}`))
        .catch((e) => console.error(`/api/add error response not text: ${e}`))
    }
  }

  doAddJson = (val: unknown): void => {
    const res = parseUpdateResponse(val);

    if (res.added === false) {
      console.error('/api/add failed on server');
      return;
    }

    if (this.state.items === undefined) {
      throw new Error("FATAL ERROR: items list is undefined.")
    }

    const items = this.state.items.concat([{ name: res.name, completed: false }]);
    this.setState({ items: items, newItem: "" });
  }

  // Handlers for toggling item
  // Note: relies on index being accurate, which is *not* always a good assumption!

  doItemToggleComplete = (_evt: ChangeEvent<HTMLInputElement>, index: number) => {
    if (this.state.items === undefined) {
      throw new Error("FATAL ERROR: items list is undefined.")
    }

    const item = this.state.items[index];
    const args = { name: item.name };

    fetch("/api/toggle", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => this.doToggleResp (res, index))
      .catch((e) => console.error(`failed to connect to server ${e}`));
  };

  doToggleResp = (res: Response, index: number): void => {
    if (res.status === 200) {
      res.json()
        .then((json) => this.doToggleJson(json, index))
        .catch((e) => console.error(`/api/toggle error 200 response is invalid JSON: ${e}`));
    } else {
      res.text()
        .then((e) => console.error(`/api/toggle server error: ${e}`))
        .catch((e) => console.error(`/api/toggle error response not text: ${e}`))
    }
  }

  doToggleJson = (val: unknown, index: number): void => {
    const res = parseUpdateResponse(val);

    if (this.state.items === undefined) {
      throw new Error("FATAL ERROR: items list is undefined.")
    }

    if (res.completed === undefined) {
      throw new Error("FATAL ERROR: /api/toggle did not return completed state")
    }

    const items = this.state.items.slice(0, index)
      .concat([{ name: res.name, completed: res.completed }])
      .concat(this.state.items.slice(index + 1));

    this.setState({ items: items });
  }

  // Handlers for removing an item
  // Note: relies on index being accurate, which is *not* always a good assumption!

  doItemRemove = (_evt: MouseEvent<HTMLButtonElement>, index: number) => {
    if (this.state.items === undefined) {
      throw new Error("FATAL ERROR: items list is undefined.")
    }

    const item = this.state.items[index];
    const args = { name: item.name };

    fetch("/api/remove", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => this.doRemoveResp (res, index))
      .catch((e) => console.error(`failed to connect to server ${e}`));
  }

  doRemoveResp = (res: Response, index: number): void => {
    if (res.status === 200) {
      res.json()
        .then((json) => this.doRemoveJson(json, index))
        .catch((e) => console.error(`/api/remove error 200 response is invalid JSON: ${e}`));
    } else {
      res.text()
        .then((e) => console.error(`/api/remove server error: ${e}`))
        .catch((e) => console.error(`/api/remove error response not text: ${e}`))
    }
  }

  doRemoveJson = (val: unknown, index: number): void => {
    const res = parseUpdateResponse(val);

    if (res.removed === false) {
      console.error('/api/remove failed on server');
      return;
    }

    if (this.state.items === undefined) {
      throw new Error("FATAL ERROR: items list is undefined.")
    }

    const items = this.state.items.slice(0, index)
      .concat(this.state.items.slice(index + 1));

    this.setState({ items: items });
  }

  // Input Event Handler

  doNewItemChange = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({ newItem: evt.target.value });
  }
}
