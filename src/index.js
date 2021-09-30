import './style.css';
import { clearAllCompleted, setAsCompleted } from './update.js';
import { addTodo, deleteTodo, updateTodo } from './crud.js';

const button = document.querySelector('button');

class Todo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let todos = [];

function createMaterialIconelement(name, color) {
  const span = document.createElement('span');
  span.classList.add('material-icons', 'edit-icon');
  span.style.marginLeft = 'auto';
  span.style.cursor = 'pointer';
  if (color !== undefined) {
    span.style.color = color;
  }
  span.innerHTML = name;

  return span;
}

function createCheckBox(index) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.checked = todos[index].completed;
  return checkbox;
}

function createTodoDivElement(color) {
  const div = document.createElement('div');
  div.classList.add('flex', 'todo-element');
  div.style.backgroundColor = color;
  return div;
}

function createReplaceTodoElementForCompletedTask(elementDescription) {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const tickSpan = createMaterialIconelement('done', 'green');
  const strike = document.createElement('strike');
  const editSpan = createMaterialIconelement(' more_vert', 'green');
  div.appendChild(tickSpan);
  strike.innerHTML = `<span>${elementDescription}</span>`;
  div.appendChild(strike);
  fragment.appendChild(div);
  fragment.appendChild(editSpan);

  return [fragment, tickSpan];
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  if (todo.completed) {
    const div = document.createElement('div');
    div.classList.add('todo-element', 'flex');
    const hr = document.createElement('hr');
    div.appendChild(
      createReplaceTodoElementForCompletedTask(todo.description)[0],
    );
    li.appendChild(div);
    li.appendChild(hr);
  } else {
    li.innerHTML = `
    <div class="flex todo-element">
      <div>
          <input type="checkbox" class="checkbox" 
          ${todo.completed ? 'checked' : ''}>
          <span>${todo.description}</span>
      </div>
      <span class="material-icons edit-icon" style="cursor: pointer">
          more_vert
      </span>
    </div>
    <hr>`;
  }

  return li;
}

function createReplaceTodoElement(todo) {
  const checkbox = createCheckBox(todos.indexOf(todo));
  const span = document.createElement('span');
  span.innerText = todo.description;
  const threeDots = createMaterialIconelement('more_vert');
  const innerDiv = document.createElement('div');
  innerDiv.appendChild(checkbox);
  innerDiv.appendChild(span);
  const div = createTodoDivElement('white');

  div.appendChild(innerDiv);
  div.appendChild(threeDots);

  return [div, checkbox];
}

function addTodoElement(todo) {
  const ul = document.querySelector('#complete-list');
  const li = createTodoElement(todo);
  ul.appendChild(li);
}

function saveTodosLocally() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function changeElementToCompleted(checkbox) {
  const ul = document.querySelector('#complete-list');
  const index = [...ul.childNodes].indexOf(
    checkbox.parentElement.parentElement.parentElement,
  ) - 4;

  setAsCompleted(todos[index - 1]);
  saveTodosLocally();

  const [completedElement, tickSpan] = createReplaceTodoElementForCompletedTask(
    todos[index - 1].description,
  );
  const div = document.createElement('div');
  div.classList.add('todo-element', 'flex');
  div.appendChild(completedElement);
  const prevChild = checkbox.parentElement.parentElement;
  checkbox.parentElement.parentElement.replaceWith(div);
  tickSpan.addEventListener('click', () => {
    if (tickSpan.innerText === 'done') {
      div.replaceWith(prevChild);
      const checkbox = prevChild.firstElementChild.firstElementChild;
      checkbox.checked = false;
      setAsCompleted(todos[index - 1]);
      saveTodosLocally();
    }
  });
}

function populate() {
  todos.sort((a, b) => (a.index > b.index ? 1 : -1));
  todos.forEach((todo) => {
    addTodoElement(todo);
  });
}

function addEventToSingleCheckBox(checkbox, todo) {
  checkbox.addEventListener('change', () => {
    changeElementToCompleted(checkbox, todo);
  });
}

function addEventsToCheckboxes(checkbox, todo) {
  const checkboxes = document.querySelectorAll('.checkbox');

  if (checkbox) {
    addEventToSingleCheckBox(checkbox, todo);
  } else {
    checkboxes.forEach((checkbox) => {
      addEventToSingleCheckBox(checkbox);
    });
  }
}

function addEventsToEditIconsContinued(editIcon) {
  editIcon.addEventListener('click', () => {
    const ul = document.querySelector('#complete-list');
    const index = [...ul.childNodes].indexOf(editIcon.parentElement.parentElement) - 5;

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('edit-input');
    input.value = todos[index].description;
    input.style.backgroundColor = 'transparent';

    const div = createTodoDivElement('#FFFBAE');
    const span = createMaterialIconelement('delete');
    const checkbox = createCheckBox(index);
    div.appendChild(checkbox);
    div.appendChild(input);
    div.appendChild(span);

    const todoElements = document.querySelectorAll('.todo-element');
    todoElements[index].replaceWith(div);

    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const todo = todos[index];
        todo.description = input.value;
        updateTodo(todo, todos[index]);
        const [newDiv, newCheckbox] = createReplaceTodoElement(todo);
        addEventsToEditIconsContinued(newDiv.lastChild);
        div.replaceWith(newDiv);
        saveTodosLocally();
        div.style.backgroundColor = 'white';
        addEventsToCheckboxes(newCheckbox, todo);
      }
    });

    span.addEventListener('click', () => {
      saveTodosLocally();
      deleteTodo(todos[index], todos);
      div.parentElement.remove();
      saveTodosLocally();
    });
  });
}

function addEventsToEditIcons(recievedIndex) {
  const editIcons = document.querySelectorAll('.edit-icon');

  editIcons.forEach((editIcon, foreachIndex) => {
    if (recievedIndex) {
      if (editIcons.length - 1 === foreachIndex) {
        addEventsToEditIconsContinued(editIcon);
      }
    } else {
      addEventsToEditIconsContinued(editIcon);
    }
  });
}

window.addEventListener('load', () => {
  const oldTodos = JSON.parse(localStorage.getItem('todos'));
  if (oldTodos) {
    todos = oldTodos;
  }
  populate();
  addEventsToCheckboxes();
  addEventsToEditIcons();
});

function addEventListenerToInput() {
  const input = document.querySelector('#input');
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const todo = new Todo(input.value, false, todos.length + 1);
      addTodo(todo, todos);
      addTodoElement(todo);
      saveTodosLocally();
      input.value = '';
      addEventsToEditIcons(todos.length - 1);
      const checkboxes = document.querySelectorAll('.checkbox');
      addEventsToCheckboxes(checkboxes.lastChild, todo);
    }
  });
}

addEventListenerToInput();

button.addEventListener('click', () => {
  const newTodos = clearAllCompleted(todos);
  todos = newTodos;
  saveTodosLocally();
});
