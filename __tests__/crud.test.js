import { addTodo } from '../src/crud.js';

describe('add', () => {
  const todos = [];
  const todo = { description: 'create a watch', completed: false, index: 0 };
  test('todos length should be 1', () => {
    expect(addTodo(todo, todos)).toHaveLength(1);
  });

  test('todos length should be 1', () => {
    expect(addTodo(todo, todos)).toEqual(
      expect.arrayContaining([expect.objectContaining({ index: 0 })]),
    );
  });
});
