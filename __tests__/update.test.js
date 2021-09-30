import { setAsCompleted, clearAllCompleted } from '../src/update.js';

describe('set as completed', () => {
  const todo1 = { description: 'create a watch', completed: false, index: 0 };
  test('should contain an object with description of create a watch 2', () => {
    expect(setAsCompleted(todo1)).toEqual(
      expect.objectContaining({ completed: true }),
    );
  });
});

describe('clear all completed', () => {
  const todos = [
    { description: 'See Movie', completed: true, index: 0 },
    { description: 'See Movie 2', completed: false, index: 0 },
  ];

  test('the dom tree length should be 1', () => {
    document.body.innerHTML = '<ul>'
      + '<li>'
      + '<div class="flex todo-element">'
      + '<div>'
      + '<input type="checkbox" class="checkbox" checked=true">'
      + '<span>See Movie</span>'
      + '</div>'
      + '<span class="material-icons edit-icon" style="cursor: pointer">more_vert</span>'
      + '</div>'
      + '</li>'
      + '<li>'
      + '<div class="flex todo-element">'
      + '<div>'
      + '<input type="checkbox" class="checkbox" checked=false">'
      + '<span>See Movie 2</span>'
      + '</div>'
      + '<span class="material-icons edit-icon" style="cursor: pointer">more_vert</span>'
      + '</div>'
      + '</li>'
      + '</ul>';
    clearAllCompleted(todos);
    const todoItems = document.querySelectorAll('.todo-element');
    expect(todoItems).toHaveLength(1);
  });

  test('should not contain objects with todo set as true', () => {
    expect(clearAllCompleted(todos)).not.toEqual(
      expect.objectContaining({ completed: true }),
    );
  });
});
