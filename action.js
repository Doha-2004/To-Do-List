document.addEventListener("DOMContentLoaded", function() {
    let addButton = document.getElementById('add-button');
    let taskInput = document.getElementById('task-input');
    let todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });

    // Add a new task
    addButton.addEventListener('click', function() {
        let taskText = taskInput.value.trim();
        if (taskText !== '') {
            let task = { text: taskText, completed: false };
            addTaskToDOM(task);
            tasks.push(task);
            updateLocalStorage();
            taskInput.value = '';
        }
    });

   taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    // Add task to the DOM
    function addTaskToDOM(task) {
        let listItem = document.createElement('li');

        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            task.completed = checkbox.checked;
            if (task.completed) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            updateLocalStorage();
        });

        listItem.appendChild(checkbox);

        let taskText = document.createElement('div');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        listItem.appendChild(taskText);

        
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', function() {
            todoList.removeChild(listItem);
            tasks = tasks.filter(t => t.text !== task.text);
            updateLocalStorage();
        });

        listItem.appendChild(removeButton);
        todoList.appendChild(listItem);
    }

    
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
