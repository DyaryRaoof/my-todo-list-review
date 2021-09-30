import { addTodo, deleteTodo } from '../src/crud.js';

describe('add', () => {
  const todos = [];
  const todo = { description: 'create a watch', completed: false, index: 0 };
  test('todos length should be 1', () => {
    expect(addTodo(todo, todos)).toHaveLength(1);
  });

  test('index should be zero', () => {
    expect(addTodo(todo, todos)).toEqual(
      expect.arrayContaining([expect.objectContaining({ index: 0 })]),
    );
  });
});

describe('delete', () => {
  const todos = [{ description: 'create a watch', completed: false, index: 0 }, { description: 'see a movie', completed: false, index: 1 }];
  test('todos length should be 1', () => {
    expect(deleteTodo(todos[1], todos)).toHaveLength(1);
  });

  test('index should not be 1', () => {
    expect(deleteTodo(todos[1], todos)).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ index: 1 })]),
    );
  });
});
