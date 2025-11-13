document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById('add');
    const clearCompletedButton = document.getElementById('clear-completed');
    const clearAllButton = document.getElementById('clear-all');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');
    const filterTasks = document.getElementById('filter-tasks');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));

    // Add new task
    addButton.addEventListener('click', function () {
        const text = taskInput.value.trim();
        if (text) {
            const task = { id: Date.now(), text, completed: false };
            tasks.push(task);
            addTask(task);
            updateLocalStorage();
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addButton.click();
    });

    // Filter tasks
    filterTasks.addEventListener('change', function () {
        const filter = filterTasks.value;
        const listItems = todoList.querySelectorAll('li');
        listItems.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            item.style.display =
                filter === 'all' ||
                (filter === 'completed' && isCompleted) ||
                (filter === 'incomplete' && !isCompleted)
                    ? ''
                    : 'none';
        });
    });

    // Clear completed tasks
    clearCompletedButton.addEventListener('click', function () {
        tasks = tasks.filter(t => !t.completed);
        updateLocalStorage();
        renderTasks();
    });

    // Clear all tasks
    clearAllButton.addEventListener('click', function () {
        tasks = [];
        updateLocalStorage();
        todoList.innerHTML = '';
    });

    // Functions
    function addTask(task) {
        const listItem = document.createElement('li');
        if (task.completed) listItem.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            task.completed = checkbox.checked;
            listItem.classList.toggle('completed', checkbox.checked);
            updateLocalStorage();
        });

        const textDiv = document.createElement('div');
        textDiv.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', function () {
            const newText = prompt('Edit task:', task.text);
            if (newText && newText.trim()) {
                task.text = newText.trim();
                textDiv.textContent = task.text;
                updateLocalStorage();
            }
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', function () {
            tasks = tasks.filter(t => t.id !== task.id);
            listItem.remove();
            updateLocalStorage();
        });

        listItem.append(checkbox, textDiv, editButton, removeButton);
        todoList.appendChild(listItem);
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach(addTask);
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
