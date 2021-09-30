import { deleteTodo } from './crud.js';

function setAsCompleted(todo) {
  todo.completed = !todo.completed;
  return todo;
}

function clearAllCompleted(todos) {
  const todoElements = document.querySelectorAll('.todo-element');
  const removedTodos = [];
  const newTodos = todos;
  newTodos.forEach((todo, index) => {
    if (todo.completed) {
      removedTodos.push(todo);
      todoElements[index].parentNode.remove();
    }
  });

  removedTodos.forEach((todo) => {
    deleteTodo(todo, newTodos);
  });

  return newTodos;
}

export { setAsCompleted, clearAllCompleted };
