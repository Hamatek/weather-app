import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { act, Simulate } from 'react-dom/test-utils';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Adds city', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector('input');
  const list = container.querySelector('#city-list');
  expect(input.value).toBe('');
  expect(list.childNodes.length).toBe(0);
  act(() => {
    input.value = 'Seoul';
    expect(input.value).toBe('Seoul');
    Simulate.change(input);
    Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
  });
  // unfinished test, the goal was to check if input is clear and if we have a new childnode in list
});

// improvements : one more test to remove a city