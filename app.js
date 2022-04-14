
// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener("DOMContentLoaded",getToDo);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click", filterToDo);

//Functions
function addToDo(event){
    //prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');

    //create li
    const newToDo= document.createElement("li");
    newToDo.classList.add('todo-item');
    newToDo.innerText= todoInput.value;
    todoDiv.appendChild(newToDo);

    // add todo to local storage
    saveLocalToDo(todoInput.value);

    //create mark button 
    const createButton = document.createElement("button");
    createButton.classList.add('complete-btn');
    createButton.innerHTML= '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(createButton);

    //create trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
    todoDiv.appendChild(trashButton);

    //append list
    todoList.appendChild(todoDiv);

    //clear to do input
    todoInput.value="";
}

//delete and completed function
function deleteCheck(e){
    const item=e.target;

    //delete todo
    if(item.classList[0] === "trash-btn"){
        const todo= item.parentElement;
        todo.classList.add('fall');//animation
        removeLocalToDo(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo= item.parentElement;
        todo.classList.toggle('completed');
    }
}

//can choose filter
function filterToDo(e){
    const todos= todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display= "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//save todo to local storage
function saveLocalToDo(todo){
    //Check ---- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDo(){
    //Check ---- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){

    //todo div
    const todoDiv =document.createElement("div");
    todoDiv.classList.add('todo');

    //create li
    const newToDo= document.createElement("li");
    newToDo.classList.add('todo-item');
    newToDo.innerText= todo;
    todoDiv.appendChild(newToDo);

    //create mark button 
    const createButton = document.createElement("button");
    createButton.classList.add('complete-btn');
    createButton.innerHTML= '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(createButton);

    //create trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
    todoDiv.appendChild(trashButton);

    //append list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalToDo(todo){
    //Check ---- Hey Do I already have thing in there?
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}