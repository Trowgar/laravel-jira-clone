<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        $todoTasks = Task::where('completed', false)
            ->orderBy('due_date', 'asc')
            ->get();

        $doneTasks = Task::where('completed', true)
            ->orderBy('due_date', 'asc')
            ->get();

        $outdatedTasks = Task::where('due_date', '<', Carbon::now())
            ->orderBy('due_date', 'asc')
            ->get();

        return view('tasks.index', compact('todoTasks', 'doneTasks', 'outdatedTasks'));
    }

    public function create()
    {
        return view('tasks.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|min:15',
            'due_date' => 'required|date',
            'description' => 'nullable',
        ]);

        $task = Task::create($validatedData);

        return response()->json([
            'success' => 'The task was successfully created',
            'task_id' => $task->id,
            'title' => $task->title,
            'due_date' => $task->due_date->format('Y-m-d'),
            'description' => $task->description,
            'completed' => $task->completed
        ]);
    }



    public function edit(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->due_date = $request->input('due_date');
        $task->save();

        return response()->json(['success' => 'Task updated']);
    }



    public function update(Request $request, Task $task)
    {
        $validatedData = $request->validate([
            'title' => 'required|min:15',
            'due_date' => 'required|date',
            'description' => 'nullable',
        ]);

        $task->update($validatedData);

        return redirect('/')->with('success', 'Task updated successfully!');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['success' => 'Task deleted successfully!']);
    }

    public function markAsCompleted(Task $task)
    {
        $task->update(['completed' => true]);

        return response()->json(['success' => 'Task marked as completed!']);
    }

    public function markAsUncompleted(Task $task)
    {
        $task->update(['completed' => false]);

        return response()->json(['success' => 'Task marked as uncompleted!']);
    }
}
