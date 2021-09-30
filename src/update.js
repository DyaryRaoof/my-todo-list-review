export default function setAsCompleted(todo) {
  todo.completed = !todo.completed;
  return todo;
}
