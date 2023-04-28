<form id="createTaskForm">
    <div class="bg-white p-6 rounded-lg shadow-md w-full sm:max-w-md mx-auto">
        @csrf
        <div class="mb-4">
            <label for="title" class="block mb-2 text-gray-700 font-semibold">Title:</label>
            <input type="text" name="title" id="title" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
            <label for="description" class="block mb-2 text-gray-700 font-semibold">Description:</label>
            <textarea name="description" id="description" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-24"></textarea>
        </div>
        <div class="mb-4">
            <label for="due_date" class="block mb-2 text-gray-700 font-semibold">Due Date:</label>
            <input type="date" name="due_date" id="due_date" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <button type="submit" class="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" id="saveTaskButton">Save Task</button>
        <button type="button" id="cancelButton" class="bg-red-500 text-white p-2 rounded-md mt-4 ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancel</button>
    </div>
</form>
