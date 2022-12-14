const taskInput = document.querySelector(".task-input input");
const newDateForm = document.querySelector(".date-form");
const newDateInput = document.querySelector(".date-input");
const newtodoSelect = document.querySelector(".data-new-todo-select");

filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box"),
dateBox = document.querySelector(".date-output");

let editId;
let isEditedTask = false;

let dates = [];


// * date function

// get date input

newDateForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const date = newDateInput.value;

  const isDateEmpty = !date || !date.trim().length;

  if (isDateEmpty) {
    return alert("please enter a date");
  }

  let dateInfo = {
    _id: Date.now().toString(),
    date: date
  };

  dates.push(dateInfo); 

  newDateInput.value = "";

  localStorage.setItem("date-list", JSON.stringify(dates));

});

// show list of all date

let dateInfo = JSON.parse(localStorage.getItem("date-list"));

function showDate() {
  let li = "";
  if (dateInfo) {
    dateInfo.forEach((date, id) => {
      li += `          <li class="date-output">
        <label for="${id}">
          <input type="checkbox">
          <p class="${completed}">${date.date}</p>
        </label>
        <div class="settings">
          <ul class="task-menu">
            <li class="edit"><i class="uil uil-pen"></i></li>
            <li class="trash"><i class="uil uil-trash"></i></li>
          </ul>
        </div>
      </li>`;
    });
  }
  dateBox.innerHTML = li;
}
showDate();


// add date to select option

function option() {
  newtodoSelect.innerHTML += `<option value="">Select A Date</option>`;

  if (dateInfo) {
    dateInfo.forEach(({
      date,
      _id
    }) => {
      newtodoSelect.innerHTML += `<option value=${_id}>${date}</option>`;
    });
  }

}
option();

// * todo function

//  get todo 

taskInput.addEventListener("keyup", (e) => {

  e.preventDefault();

  let userTask = taskInput.value.trim();

  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      todos = !todos ? [] : todos;
      let taskInfo = {
        name: userTask,
        status: "pending",
      };
      todos.push(taskInfo);
    } else {
      isEditedTask = false;
      todos[editId].name = userTask;
    }

    taskInput.value = "";

    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
});

let todos = JSON.parse(localStorage.getItem("todo-list"));

// filter features

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// function to convert the input to output

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">
                          <label for="${id}">
                              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                              <p class="${completed}">${todo.name}</p>
                          </label>
                          <div class="settings">
                              <ul class="task-menu">
                                  <li onclick='editTask(${id}, "${todo.name}")' class="edit"><i class="uil uil-pen"></i></li>
                                  <li onclick='deleteTask(${id}, "${filter}")' class="trash"><i class="uil uil-trash"></i></li>
                              </ul>
                          </div>
                      </li>`;
      }
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length ?
    clearAll.classList.remove("active") :
    clearAll.classList.add("active");
  taskBox.offsetHeight >= 300 ?
    taskBox.classList.add("overflow") :
    taskBox.classList.remove("overflow");
}

showTodo();

// edit selected task from the list

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");
}

// delete selected task from the list

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}

// update status checkbox

function updateStatus(selectedTask) {
  // get string that contains task name, which in this case task name is equal to the paragraph (lastElementChild)
  let taskName = selectedTask.parentElement.lastElementChild;

  // changed the list status to checked if click
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed"; // update status of selected task to completed
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending"; // update status of unselected task to pending
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

//clear all Function

clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});


