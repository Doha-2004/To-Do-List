document.addEventListener("DOMContentLoaded", function() {
    let addButton = document.getElementById('add');
<<<<<<< HEAD
=======
    let clearCompletedButton = document.getElementById('clear-completed');
    let clearAllButton = document.getElementById('clear-all');
>>>>>>> 9238b51 (Fix responsive layout and right sidebar)
    let taskInput = document.getElementById('task-input');
    let todoList = document.getElementById('todo-list');
    let filterTasks = document.getElementById('filter-tasks');

<<<<<<< HEAD
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task);
    });

=======



     // Load tasks from localStorage
    filterTasks.addEventListener('change', function() {
        let filter = filterTasks.value;
        let listItems = todoList.getElementsByTagName('li');
        for (let item of listItems) {
            let isCompleted = item.querySelector('input[type="checkbox"]').checked;
            if (filter === 'all') {
                item.style.display = '';
            }
            else if (filter === 'completed') {
                item.style.display = isCompleted ? '' : 'none';
            }
            else if (filter === 'incomplete') {
                item.style.display = isCompleted ? 'none' : '';
            }
            else if (filter === 'pending') {
                item.style.display = isCompleted ? 'none' : '';
            }
        }
    });

    clearCompletedButton.addEventListener('click', function() {
        let completedTasks = todoList.querySelectorAll('li .completed');
        completedTasks.forEach(task => {
            todoList.removeChild(task.parentElement);
        });
        tasks = tasks.filter(task => !task.completed);
        updateLocalStorage();
    });

    clearAllButton.addEventListener('click', function() {
        todoList.innerHTML = '';
        tasks = [];
        updateLocalStorage();
    });
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task);  
    });
    

>>>>>>> 9238b51 (Fix responsive layout and right sidebar)
    
    addButton.addEventListener('click', function() {
        let taskText = taskInput.value.trim();
        if (taskText !== '') {
            let task = { text: taskText, completed: false };
            addTask(task);
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
<<<<<<< HEAD

=======
 
>>>>>>> 9238b51 (Fix responsive layout and right sidebar)
    
    function addTask(task) {
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
       // edit task
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', function() {
            let newTaskText = prompt('Edit task:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText.trim();
                taskText.textContent = task.text;
                updateLocalStorage();
            }


        });

        listItem.appendChild(editButton);
        todoList.appendChild(listItem);


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
