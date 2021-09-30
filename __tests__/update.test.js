import setAsCompleted from '../src/update.js';

describe('set as completed', () => {
  const todo1 = { description: 'create a watch', completed: false, index: 0 };
  test('should contain an object with description of create a watch 2', () => { expect(setAsCompleted(todo1)).toEqual(expect.objectContaining({ completed: true })); });
});