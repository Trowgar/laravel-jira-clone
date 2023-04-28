function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    let bgColorClass;
    switch (type) {
        case 'error':
            bgColorClass = 'bg-red-500';
            break;
        case 'success':
            bgColorClass = 'bg-green-500';
            break;
        case 'warning':
            bgColorClass = 'bg-yellow-500';
            break;
        default:
            bgColorClass = 'bg-blue-500';
            break;
    }

    alertContainer.className = `alert mt-4 mr-4 p-4 rounded-md ${bgColorClass} text-white`;
    alertContainer.style.cssText = 'position: fixed; top: 1rem; right: 1rem; max-width: 250px; z-index: 100;';
    alertContainer.textContent = message;

    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.remove();
    }, 3000);
}

function editTask(event, taskId) {
    event.preventDefault();

    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const taskTitle = taskElement.querySelector('.task-title');
    const taskDescription = taskElement.querySelector('.task-description');
    const taskDueDate = taskElement.querySelector('.task-due-date');
    const editButton = taskElement.querySelector('.edit-task');

    if (editButton.textContent === 'Edit') {
        editButton.textContent = 'Update Task';

        taskTitle.contentEditable = true;
        taskDescription.contentEditable = true;
        taskDueDate.readOnly = false;

        taskTitle.focus();
    } else if (taskTitle.isContentEditable) {
        saveChanges(taskId);
    }
}

async function saveChanges(taskId) {
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const taskTitle = taskElement.querySelector('.task-title');
    const taskDescription = taskElement.querySelector('.task-description');
    const taskDueDate = taskElement.querySelector('.task-due-date');
    const editButton = taskElement.querySelector('.edit-task');

    const response = await fetch(`/edit/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
            title: taskTitle.textContent,
            description: taskDescription.textContent,
            due_date: taskDueDate.value
        })
    });

    if (response.ok) {
        taskTitle.contentEditable = false;
        taskDescription.contentEditable = false;
        taskDueDate.readOnly = true;
        showAlert('Your task has been changed');

        editButton.textContent = 'Edit';
    } else {
        showAlert('There was an error updating the task', 'error');
    }
}

async function deleteTask(event, taskId) {
    event.preventDefault();

    const response = await fetch(`/delete/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    });

    if (response.ok) {
        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        taskElement.remove();
        showAlert('The Task was Successfully Deleted', 'error');
    } else {
        showAlert('There was an error deleting the task', 'error');
    }
}

async function markAsCompleted(event, taskId) {
    event.preventDefault();

    const response = await fetch(`/mark-as-completed/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    });

    if (response.ok) {
        showAlert('The task was successfully completed', 'success');
        moveTask(taskId, 'doneTable');
        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        const markCompletedButton = taskElement.querySelector('.mark-completed-task, .mark-uncompleted-task');
        markCompletedButton.textContent = 'Mark as uncompleted';
        markCompletedButton.classList.remove('mark-completed-task');
        markCompletedButton.classList.add('mark-uncompleted-task');
        markCompletedButton.classList.remove('text-green-500');
        markCompletedButton.classList.add('text-yellow-500');
    } else {
        showAlert('There was an error completing the task', 'error');
    }
}

async function markAsUncompleted(event, taskId) {
    event.preventDefault();

    const response = await fetch(`/mark-as-uncompleted/${taskId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    });

    if (response.ok) {
        showAlert('The task was successfully marked as uncompleted', 'success');
        moveTask(taskId, 'todoTable');
        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        const markUncompletedButton = taskElement.querySelector('.mark-completed-task, .mark-uncompleted-task');
        markUncompletedButton.textContent = 'Mark as completed';
        markUncompletedButton.classList.remove('mark-uncompleted-task');
        markUncompletedButton.classList.add('mark-completed-task');
        markUncompletedButton.classList.remove('text-yellow-500');
        markUncompletedButton.classList.add('text-green-500');
    } else {
        showAlert('There was an error marking the task as uncompleted', 'error');
    }
}

function handleButtonClick(event) {
    event.preventDefault();
    const taskId = event.target.getAttribute('data-task-id');
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const markCompletedButton = taskElement.querySelector('.mark-completed-task, .mark-uncompleted-task');

    if (markCompletedButton.classList.contains('mark-completed-task')) {
        markAsCompleted(event, taskId);
    } else {
        markAsUncompleted(event, taskId);
    }
}

function moveTask(taskId, targetTableId) {
    const task = document.querySelector(`li[data-id="${taskId}"]`);
    const targetTable = document.getElementById(targetTableId);
    const markCompletedButton = task.querySelector('.mark-completed-task, .mark-uncompleted-task');

    if (!targetTable) {
        console.error('Target table not found');
        return;
    }

    const tasks = Array.from(targetTable.querySelectorAll('li'));
    tasks.push(task);

    tasks.sort((a, b) => {
        const aDueDate = new Date(a.getAttribute('data-due-date'));
        const bDueDate = new Date(b.getAttribute('data-due-date'));
        return aDueDate - bDueDate;
    });

    tasks.forEach(sortedTask => {
        targetTable.appendChild(sortedTask);
    });

    if (targetTableId === 'doneTable') {
        if (markCompletedButton) {
            markCompletedButton.classList.remove('mark-completed-task');
            markCompletedButton.classList.add('mark-uncompleted-task');
            markCompletedButton.classList.remove('text-green-500');
            markCompletedButton.classList.add('text-yellow-500');
            markCompletedButton.textContent = 'Mark as uncompleted';
        }
    } else {
        if (markCompletedButton) {
            markCompletedButton.classList.remove('mark-uncompleted-task');
            markCompletedButton.classList.add('mark-completed-task');
            markCompletedButton.classList.remove('text-yellow-500');
            markCompletedButton.classList.add('text-green-500');
            markCompletedButton.textContent = 'Mark as completed';
        }
    }

    markCompletedButton.removeEventListener('click', handleButtonClick);
    markCompletedButton.addEventListener('click', handleButtonClick);
}

document.querySelectorAll('.mark-completed-task, .mark-uncompleted-task').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


async function createTask(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const dueDateInput = document.getElementById('due_date');
    const descriptionInput = document.getElementById('description');
    const messages = document.getElementById('messages');

    let title = titleInput.value.trim();

    if (title.length < 15) {
        messages.innerHTML = 'Title must be at least 15 characters long.';
        return;
    }

    const response = await fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
            title: title,
            due_date: dueDateInput.value,
            description: descriptionInput.value
        })
    });

    if (response.ok) {
        titleInput.value = '';
        dueDateInput.value = '';
        descriptionInput.value = '';
        showAlert('The task was successfully created', 'success');
        location.reload();
    } else {
        const data = await response.json();
        messages.innerHTML = data.message;
    }
}


function handleCancelButton() {
    const cancelButton = document.getElementById('cancelButton');

    if (cancelButton) {
        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            const addTaskFormContainer = document.getElementById('addTaskFormContainer');
            addTaskFormContainer.classList.add('hidden');
        });
    }
}

function toggleAddTaskForm() {
    const addTaskButton = document.getElementById('addTaskButton');
    const addTaskFormContainer = document.getElementById('addTaskFormContainer');

    addTaskButton.addEventListener('click', async (event) => {
        event.preventDefault();

        if (!addTaskFormContainer.innerHTML) {
            const response = await fetch('/form');
            const formHtml = await response.text();
            addTaskFormContainer.innerHTML = formHtml;
            handleCancelButton();
        }

        addTaskFormContainer.classList.toggle('hidden');
    });
}

function moveOutdatedTasks() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

    const todoTable = document.getElementById('todoTable');
    const outdatedTable = document.getElementById('outdatedTable');

    const tasks = Array.from(todoTable.querySelectorAll('li'));
    tasks.forEach(task => {
        const taskDueDate = new Date(task.getAttribute('data-due-date'));

        if (taskDueDate < currentDate) {
            const taskId = task.getAttribute('data-id');
            const existingTask = outdatedTable.querySelector(`[data-id="${taskId}"]`);

            if (existingTask) {
                existingTask.remove();
            }

            outdatedTable.appendChild(task);
        }
    });
}

function toggleOutdatedTasksTable() {
    const outdatedTasksContainer = document.getElementById('outdatedTasksContainer');
    const showOutdatedTasksButton = document.getElementById('showOutdatedTasksButton');

    if (outdatedTasksContainer.style.display === 'none') {
        outdatedTasksContainer.style.display = 'block';
        showOutdatedTasksButton.textContent = 'Hide Outdated Tasks';
    } else {
        outdatedTasksContainer.style.display = 'none';
        showOutdatedTasksButton.textContent = 'Show Outdated Tasks';
    }
}


document.getElementById('showOutdatedTasksButton').addEventListener('click', (event) => {
    event.preventDefault();
    toggleOutdatedTasksTable();
});

document.querySelectorAll('.edit-task').forEach((element) => {
    element.addEventListener('click', (event) => {
        const taskId = event.target.getAttribute('data-task-id');
        editTask(event, taskId);
    });
});

document.querySelectorAll('.text-red-500').forEach((element) => {
    element.addEventListener('click', (event) => {
        const taskId = event.target.getAttribute('data-task-id');
        deleteTask(event, taskId);
    });
});


document.querySelectorAll('.text-yellow-500').forEach((element) => {
    element.addEventListener('click', (event) => {
        const taskId = event.target.getAttribute('data-task-id');
        markAsUncompleted(event, taskId);
    });
});

document.querySelectorAll('.text-green-500').forEach((element) => {
    element.addEventListener('click', (event) => {
        const taskId = event.target.getAttribute('data-task-id');
        markAsCompleted(event, taskId);
    });
});


document.addEventListener('submit', (event) => {
    if (event.target.closest('form') && event.target.closest('form').id === 'createTaskForm') {
        event.preventDefault();
        createTask(event);
    }
});

toggleAddTaskForm();
moveOutdatedTasks();
