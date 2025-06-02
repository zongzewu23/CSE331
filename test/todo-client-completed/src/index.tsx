import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { TodoApp } from './TodoApp';


const main: HTMLElement | null = document.getElementById('main');
if (main === null)
  throw new Error("HTML missing 'main' element")

const root: Root = createRoot(main);
root.render(<TodoApp/>);