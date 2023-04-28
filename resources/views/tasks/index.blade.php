<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Task List</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100">
<div class="container mx-auto max-w-7xl px-4">
    <h1 class="text-3xl font-bold underline p-6">Task List</h1>
    <div class="mb-4">
        <a href="#" id="addTaskButton" class="bg-blue-500 text-white p-2 rounded-md mr-4 ml-6">Add Task</a>
        <a href="#" id="showOutdatedTasksButton" class="bg-red-500 text-white p-2 rounded-md">Show Outdated Tasks</a>
    </div>
    <div id="addTaskFormContainer" class="hidden max-w-7xl mx-auto"></div>
    <div class="flex flex-row justify-between gap-6 p-6">
        <div class="max-w-lg">
            <h2 class="text-2xl font-bold">To Do</h2>
            @component('tasks.task_list', ['tasks' => $todoTasks, 'tableId' => 'todoTable'])
            @endcomponent
        </div>
        <div class="max-w-lg">
            <h2 class="text-2xl font-bold">Done</h2>
            @component('tasks.task_list', ['tasks' => $doneTasks, 'tableId' => 'doneTable'])
            @endcomponent
        </div>
        <div id="outdatedTasksContainer" class="hidden max-w-lg" style="display: none;">
            <h2 class="text-2xl font-bold">Outdated</h2>
            @component('tasks.task_list', ['tasks' => $outdatedTasks, 'tableId' => 'outdatedTable'])
            @endcomponent
        </div>
    </div>
</div>
<script src="{{ asset('js/task-list.js') }}"></script>
</body>
</html>
