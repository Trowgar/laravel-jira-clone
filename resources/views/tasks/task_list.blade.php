<ul class="list-none" id="{{ $tableId }}">
    @foreach ($tasks as $task)
        <li class="bg-white p-4 rounded-lg shadow-md my-4 w-82" data-due-date="{{ $task->due_date->format('Y-m-d') }}" data-id="{{ $task->id }}">
            <strong class="task-title" contenteditable="false">{{ $task->title }}</strong>
            <p class="task-description" contenteditable="false">{{ $task->description }}</p>
            due <input class="task-due-date" type="date" value="{{ $task->due_date->format('Y-m-d') }}" readonly><br>
            <a href="#" data-task-id="{{ $task->id }}" class="text-blue-500 edit-task">Edit</a> |
            <a href="#" class="text-red-500 delete-task" data-task-id="{{ $task->id }}">Delete</a> |
            @if ($task->completed)
                <a href="#" class="text-yellow-500 mark-uncompleted-task" data-task-id="{{ $task->id }}">Mark as uncompleted</a>
            @else
                <a href="#" class="text-green-500 mark-completed-task" data-task-id="{{ $task->id }}">Mark as completed</a>
            @endif
        </li>
    @endforeach
</ul>
