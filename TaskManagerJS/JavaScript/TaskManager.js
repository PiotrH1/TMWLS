var taskValue = "";
var taskStatus = false;
const key = "list";
// My array of objects and how I get items from the localStorage
var taskArray = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
function setLocalStorage(taskArray) {
    localStorage.setItem(key, JSON.stringify(taskArray));
}
// how I delete an item from the array and form the local storage
function deleteItem () {
    var p = $(this).parent();
    taskArray = taskArray.filter(function (taskObj) {
        return taskObj.taskValue != p.closest(".task").text();
    })
    setLocalStorage(taskArray);
    p.fadeOut(function () {
        p.remove();
    })
};
// Change the status for the task
function checkItem () {
    var p = $(this).parent();
    for (i in taskArray) {
        if (taskArray[i].taskValue == p.closest(".task").text()) {
            taskArray[i].taskStatus = true;
            setLocalStorage(taskArray);
        }
    }

    p.fadeOut(function () {
        $(".completed").append(p);

        p.fadeIn();
    });
    $(this).remove();
}



$(document).ready(function () {

    for (var i in taskArray) {
        if (taskArray[i].taskStatus == false) {
            var task = $("<div class='task'></div>").text(taskArray[i].taskValue);
            var del = $("<i class='fas fa-trash-alt'></i>").click(deleteItem);
            var check = $("<i class='fas fa-check'></i>").click(checkItem);
            task.append(del, check);
            $(".notCompleted").append(task);
        } else {
            var task = $("<div class='task'></div>").text(taskArray[i].taskValue);
            var del = $("<i class='fas fa-trash-alt'></i>").click(deleteItem);
            $(".completed").append(task.append(del));
        }
    }
    // main function
    // keyCode = 13 is ENTER
    $(".txt").on("keyup", function (e) {
        if (e.keyCode == 13 && $(".txt").val() != 0) {
            var task = $("<div class='task'></div>").text($(".txt").val());
            var del = $("<i class='fas fa-trash-alt'></i>").click(deleteItem);
            var check = $("<i class='fas fa-check'></i>").click(checkItem);
            task.append(del, check);
            $(".notCompleted").append(task);
            taskValue = $(".txt").val();
            var taskObj =
            {
                taskValue,
                taskStatus
            }
            taskArray.push(taskObj);
            setLocalStorage(taskArray);
            $(".txt").val("");
        }
    })
}
)


//$(".txt").on("keyup", function (e) {
//    // If I KeyUp from Enter button and  text value not equal to null
//    if (e.keyCode == 13 && $(".txt").val() != 0) {
//        var task = $("<div class='task'></div>").text($(".txt").val());

//        var del = $("<i class='fas fa-trash-alt'></i>").click(function () {
//            var p = $(this).parent();
//            p.fadeOut(function () {
//                p.remove();
//            })
//        });
//        var check = $(" <i class='fas fa-check'></i>").click(function () {
//            var p = $(this).parent();
//            p.fadeOut(function () {
//                $(".completed").append(p);
//                p.fadeIn();
//            });
//            $(this).remove();
//        });
//        task.append(del, check);
//        $(".notCompleted").append(task);
//        $(".txt").val("");
//    }
//});