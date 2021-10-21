//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
     //DOM load event
     document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event 
    form.addEventListener('submit',addTask);
    //remove task from taskList
    taskList.addEventListener('click',removeTask);
    //clear all tasks
    clearBtn.addEventListener('click',clearTasks);
    //filter task event
    filter.addEventListener('keyup',filterTasks);
}

//get tasks from LS
function getTasks(){
  let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = [];
    }
    else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
      const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append it
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>' 
        //Append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    });
}

//Add task
function addTask(e){
  e.preventDefault();

  if(taskInput.value.trim() ===''){
      alert('Add a task');
  }
  else{
        //create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append it
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>' 
        //Append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        // store tasks
        storeTaskInLocalStorage(taskInput.value);
        //clear input
        taskInput.value='';
        //console.log(li);

  }
}
//store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = [];
    }
    else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){  
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeFromLocalStorage(taskList.firstChild);
    }
  }
}

//Remove from LS
function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index) {
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear all tasks
function clearTasks(e){
  //faster method
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LS
  clearTasksFromLocalStorage();
}

//clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
//filter tasks
function filterTasks(e){
   const text = e.target.value.toLowerCase();
   
   document.querySelectorAll('.collection-item').forEach
   (function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text)!=-1){
       task.style.display = 'block';
     }else{
       task.style.display ='none';
     }
   }
    
   );
}