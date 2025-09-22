const inputText = document.querySelector('#task-input');
const taskList = document.querySelector('.task-list');

window.addEventListener('DOMContentLoaded', loadTasks);

inputText.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (inputText.value.trim() !== "") {
      updateList(inputText.value.trim());
      inputText.value = "";
    } else {
      alert("You can’t submit an empty task!");
    }
  }
});

function updateList(taskText, completed = false, dateAddedStr = null, dateCompletedStr = null) {
  const newList = document.createElement('li');

  const taskMain = document.createElement('div');
  taskMain.className = 'task-main';

  const newLabel = document.createElement('div');
  const newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';
  newCheckbox.checked = completed;

  const taskSpan = document.createElement('span');
  taskSpan.innerText = taskText;
  taskSpan.contentEditable = 'true';
  taskSpan.style.outline = "none";

  newLabel.appendChild(newCheckbox);
  newLabel.appendChild(taskSpan);
  taskMain.appendChild(newLabel);

  const removeButton = document.createElement('button');
  removeButton.className = 'remove-btn';
  removeButton.innerHTML = '<i class="fa fa-trash"></i>';
  removeButton.addEventListener('click', function () {
    taskList.removeChild(newList);
    saveTasks();
  });
  taskMain.appendChild(removeButton);

  newList.appendChild(taskMain);

  const dateAdded = document.createElement('div');
  dateAdded.className = "task-date";
  dateAdded.innerText = `Added: ${dateAddedStr || new Date().toLocaleString()}`;
  newList.appendChild(dateAdded);

  if (completed) {
    const dateCompleted = document.createElement('div');
    dateCompleted.className = "task-date completed-date";
    dateCompleted.innerText = `Completed: ${dateCompletedStr || new Date().toLocaleString()}`;
    newList.appendChild(dateCompleted);
    taskSpan.style.textDecoration = "line-through";
    taskSpan.style.color = "gray";
  }

  newCheckbox.addEventListener('change', function () {
    if (newCheckbox.checked) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "gray";

      const oldCompleted = newList.querySelector('.completed-date');
      if (oldCompleted) oldCompleted.remove();

      const dateCompleted = document.createElement('div');
      dateCompleted.className = "task-date completed-date";
      dateCompleted.innerText = `Completed: ${new Date().toLocaleString()}`;
      newList.appendChild(dateCompleted);
    } else {
      taskSpan.style.textDecoration = "none";
      taskSpan.style.color = "black";

      const oldCompleted = newList.querySelector('.completed-date');
      if (oldCompleted) oldCompleted.remove();
    }
    saveTasks();
  });

  taskSpan.addEventListener('input', saveTasks);

  taskList.appendChild(newList);

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('span').innerText;
    const completed = li.querySelector('input').checked;
    const addedDate = li.querySelector('.task-date')?.innerText.replace("Added: ", "");
    const completedDate = li.querySelector('.completed-date')?.innerText.replace("Completed: ", "") || null;

    tasks.push({
      text,
      completed,
      dateAdded: addedDate,
      dateCompleted: completedDate
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    updateList(task.text, task.completed, task.dateAdded, task.dateCompleted);
  });
}
