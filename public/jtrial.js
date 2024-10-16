$(document).ready(function() {
    var dateCount = 0;
    var totalTasks = 0;
    var completedTasks = 0;
    var incompleteTasks = 0;

    // Function to update dashboard statistics
    function updateDashboard() {
        $('#totalTasks').text(totalTasks);
        $('#completedTasks').text(completedTasks);
        $('#incompleteTasks').text(incompleteTasks);
    }

    $('#addDateBtn').on('click', function() {
        var dateInput = $('#dateInput').val();

        if (dateInput) {
            var isDuplicate = false;
            $('#dateList li').each(function() {
                if ($(this).text().includes(dateInput)) {
                    isDuplicate = true;
                    return false;
                }
            });

            if (isDuplicate) {
                alert("This date has already been added to the list.");
                return;
            }

            dateCount++;
            var sectionId = 'inputSection' + dateCount;

            $('#dateList').append('<li class="dateItem" data-section="' + sectionId + '">' + dateInput + '<button class="removeDateBtn">Remove</button></li>');

            $('#dynamicSections').append(`
                <div id="` + sectionId + `" class="inputSection" style="display: none;">
                    <h3>Tasks for: ` + dateInput + `</h3>
                    <input type="text" class="itemInput" placeholder="Enter task">
                    <button class="addItemBtn">Add Task</button>
                    <ul class="taskList"></ul>

                    <button class="toggleCompletedBtn">Show Completed Tasks</button>
                    <button class="toggleIncompletedBtn">Show Incomplete Tasks</button>

                    <ul class="completedList" style="display: none;">
                        <h4>Completed Tasks</h4>
                    </ul>

                    <ul class="incompletedList" style="display: none;">
                        <h4>Incomplete Tasks</h4>
                    </ul>

                    <button class="backBtn">Back</button>
                </div>
            `);

            $('#dateInput').val('');
        } else {
            alert("Please select a date before adding.");
        }
    });

    $(document).on('click', '.dateItem', function() {
        var sectionId = $(this).data('section');
        $('.inputSection').hide();
        $('#' + sectionId).show();
        $('html, body').animate({
            scrollTop: $('#' + sectionId).offset().top
        }, 500);
    });

    $(document).on('click', '.addItemBtn', function() {
        var $input = $(this).siblings('.itemInput');
        var $taskList = $(this).siblings('.taskList');
        var taskValue = $input.val();

        if (taskValue) {
            totalTasks++; // Increase total tasks count
            $taskList.append(`
                <li>
                    ` + taskValue + `
                    <button class="markCompleteBtn">Complete</button>
                    <button class="markIncompleteBtn">Incomplete</button>
                    <button class="removeTaskBtn">Remove</button>
                </li>
            `);

            $input.val('');
            updateDashboard(); // Update dashboard after adding task
        } else {
            alert("Please enter a task before adding.");
        }
    });

    $(document).on('click', '.markCompleteBtn', function() {
        var $task = $(this).parent();
        var $completedList = $task.closest('.inputSection').find('.completedList');
        
        // Move task to completed list
        $task.find('.markCompleteBtn, .markIncompleteBtn').remove();
        $completedList.append($task);
        
        completedTasks++; // Increase completed tasks count
        incompleteTasks--; // Decrease incomplete tasks count
        updateDashboard(); // Update dashboard after marking complete
    });

    $(document).on('click', '.markIncompleteBtn', function() {
        var $task = $(this).parent();
        var $incompletedList = $task.closest('.inputSection').find('.incompletedList');

        // Move task to incomplete list
        $task.find('.markCompleteBtn, .markIncompleteBtn').remove();
        $incompletedList.append($task);

        incompleteTasks++; // Increase incomplete tasks count
        completedTasks--; // Decrease completed tasks count
        updateDashboard(); // Update dashboard after marking incomplete
    });

    $(document).on('click', '.removeTaskBtn', function() {
        var $task = $(this).parent();
        $task.remove();
        totalTasks--; // Decrease total tasks count

        // Check if the task was completed or not and update counts
        if ($task.find('.markCompleteBtn').length === 0) {
            completedTasks--;
        } else {
            incompleteTasks--;
        }

        updateDashboard(); // Update dashboard after removing task
    });

    $(document).on('click', '.toggleCompletedBtn', function() {
        var $completedList = $(this).siblings('.completedList');
        $completedList.toggle();
    });

    $(document).on('click', '.toggleIncompletedBtn', function() {
        var $incompletedList = $(this).siblings('.incompletedList');
        $incompletedList.toggle();
    });

    $(document).on('click', '.removeDateBtn', function() {
        var sectionId = $(this).parent().data('section');
        $('#' + sectionId).remove();
        $(this).parent().remove();
    });

    $(document).on('click', '.backBtn', function() {
        $(this).closest('.inputSection').hide();
    });

    // Save tasks to localStorage
function saveTasks() {
    var taskData = {
        totalTasks: totalTasks,
        completedTasks: completedTasks,
        incompleteTasks: incompleteTasks
    };
    localStorage.setItem('taskData', JSON.stringify(taskData));
}

// Load tasks from localStorage
function loadTasks() {
    var savedData = JSON.parse(localStorage.getItem('taskData'));
    if (savedData) {
        totalTasks = savedData.totalTasks;
        completedTasks = savedData.completedTasks;
        incompleteTasks = savedData.incompleteTasks;
        updateDashboard(); // Update dashboard on load
    }
}

$(document).ready(function() {
    loadTasks(); // Load tasks when the page is loaded

    // Make sure to call saveTasks() every time tasks are modified.
    $('#addDateBtn').on('click', function() {
        // Your existing code...
        saveTasks(); // Save tasks after modification
    });
});

});
