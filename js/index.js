
// Selectors           
let input_value = document.querySelector(".todo-input");
let input_button = document.querySelector(".todo-input-button");
let todo_items = document.querySelector(".todo-items-container");
let filter_button = document.getElementById("select_btn")
// Functions
const addTodo = (e) => {
    e.preventDefault();

    //creating todo div element

    let todo_div = document.createElement('div');
    todo_div.classList.add("todo-item");
    let para = document.createElement('p');
    if(input_value.value=="")
    {
        alert("Please Enter your Todo")
    }
    else{
    para.innerText = input_value.value;
    
    // Calling for saving data in local storage

    saveToLocal(input_value.value, false);


    let add_btn = document.createElement('button');
    add_btn.classList.add("check");
    add_btn.setAttribute("onclick", "checked(this)")
    add_btn.innerHTML = '<i class="fas fa-check-square"></i>';
    let delete_btn = document.createElement('button');
    delete_btn.classList.add("delete");
    delete_btn.setAttribute("onclick", "remove(this)")
    delete_btn.innerHTML = '<i class="fas fa-trash"></i>';
    todo_div.appendChild(para);
    todo_div.appendChild(add_btn);
    todo_div.appendChild(delete_btn);
    todo_items.appendChild(todo_div);
    input_value.value = "";
    }

}

// function for checked todo items

function checked(e) {
    var parent_div = e.parentNode;
    parent_div.classList.toggle("checked_item");
    console.log()
    let text = parent_div.children[0].innerText
    updateLocal(text, parent_div);
}

// function for deleting todo items

function remove(e) {
    let parent_div = e.parentNode;
    let text = parent_div.childNodes[0].innerText;
    parent_div.classList.add("removed_item")
    parent_div.addEventListener('transitionend', function () {
        parent_div.remove();
        deleteFromLocal(text);

    })
}

// function for saving todo data in localstorage

function saveToLocal(todo, checked) {
    let todos;
    let isPresent = false;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((el) => {
        if (el.para === todo) {
            isPresent = true;
            alert("This Task is already present");
        }
    });
    // checking the data is already present in local storage or not

    if (isPresent === false) {

        let realTodo = {
            para: todo,
            isChecked: checked  // creating object for handling checked todo in refresh
        }
        todos.push(realTodo);
        localStorage.setItem("todos", JSON.stringify(todos));  // adding data to local storage
    }
}

// function for handling checked todo 

function updateLocal(text, parent) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((el) => {
        if (el.para === text) {
            if (parent.classList[1] === "checked_item") {
                el.isChecked = true;
            }
            else {
                el.isChecked = false;
            }
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}

// function for get data from local after refresh

function getFromLocal() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((el) => {
        let todo_div = document.createElement('div');
        todo_div.classList.add("todo-item");
        let para = document.createElement('p');
        para.innerText = el.para;
        let add_btn = document.createElement('button');
        add_btn.classList.add("check");
        add_btn.setAttribute("onclick", "checked(this)")
        add_btn.innerHTML = '<i class="fas fa-check-square"></i>';
        let delete_btn = document.createElement('button');
        delete_btn.classList.add("delete");
        delete_btn.setAttribute("onclick", "remove(this)")
        delete_btn.innerHTML = '<i class="fas fa-trash"></i>';
        todo_div.appendChild(para);
        todo_div.appendChild(add_btn);
        todo_div.appendChild(delete_btn);
        if (el.isChecked === true) {
            todo_div.classList.add("checked_item");
        }
        todo_items.appendChild(todo_div);
    });
}

// function for deleting data from local storage

function deleteFromLocal(text) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let index;
    for (index = 0; index < todos.length; index++) {
        if (todos[index].para == text) {
            break;
        }
    }
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));

}
// function for showing filter data 

function filter(e) {
    todos = todo_items.children;

    console.log(todos)
    console.log(e.target.value)
    for (let i = 0; i < todos.length; i++) 
    {
        let todo = todos[i];
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("checked_item")) {
                    todo.style.display = "flex";

                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (todo.classList.contains("checked_item")) {
                    todo.style.display = "none";

                }
                else {
                    todo.style.display = "flex";
                }
                break;
        }
    }

}

// Event Handling
input_button.addEventListener('click', addTodo);
filter_button.addEventListener('click', filter);
document.addEventListener('DOMContentLoaded', getFromLocal);
