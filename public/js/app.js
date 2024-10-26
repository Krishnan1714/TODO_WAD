// Example AJAX request to mark a task as complete
document.querySelectorAll('.completeTaskBtn').forEach(button => {
    button.addEventListener('click', async (e) => {
        const taskId = e.target.dataset.taskId;
        await fetch(`/tasks/${taskId}/complete`, { method: 'PUT' });
        location.reload(); // Reload the page to reflect changes
    });
});
