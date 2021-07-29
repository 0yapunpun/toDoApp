// check if the string has white space
let hasWhiteSpace = (s) => {
  return s.indexOf(' ') >= 0;
}

// Create asiggnment
let createassignment = () =>{
  // Check if the new assignment is already in localStorage, if so, return the function
  let assignmentPrompt = prompt("Write assignment");

  if (assignmentPrompt == "" ){
    alert("Insert a name for the assigmnent");
    return;
  } else if (assignmentPrompt == null){
    return;
  }

  if (assignmentPrompt in localStorage){
    alert("This assignment already exist");
    return;
  } else if (hasWhiteSpace(assignmentPrompt) == true){
    alert("The assignmet name should be a single expression with no spaces");
    return;
  } else {
    let emptyObject = {};
    localStorage.setItem(assignmentPrompt, JSON.stringify(emptyObject));
  }

  // Create and select elements 
  let assigmentContainer = document.createElement('div'),
      assigmentHeader = document.createElement('div'),
      assigmentName = document.createElement('div'),
      addTaskButton = document.createElement('div'),
      taskButtonHover = document.createElement('div'),
      assigmentTasks = document.createElement('div'),
      container = document.querySelector(".overflowContent");

  // Add classes to elements
  assigmentContainer.classList.add("assignment");
  assigmentHeader.classList.add("headerAssigment");
  assigmentName.classList.add("assignmentName");
  assigmentName.textContent = assignmentPrompt;
  addTaskButton.classList.add("addToDo");
  taskButtonHover.classList.add("displayHoverTask")
  assigmentTasks.classList.add("toDo");

  // Add button textcontent and function
  addTaskButton.textContent = "+";
  taskButtonHover.textContent = "Create new task";
  addTaskButton.appendChild(taskButtonHover);
  addTaskButton.onclick = createTask.bind(this, assignmentPrompt);
  
  // Add Assigment id, same to his name
  assigmentTasks.id = assignmentPrompt;

  // Add elements to Dom
  assigmentHeader.appendChild(assigmentName);
  assigmentHeader.appendChild(addTaskButton);
  assigmentContainer.appendChild(assigmentHeader);
  assigmentContainer.appendChild(assigmentTasks);  
  container.appendChild(assigmentContainer);
}

// Charge assignmet containers from local storage
let chargeAssigmentContainer = (assigmnentName) =>{

  // Create and select elements 
  let assigmentContainer = document.createElement('div'),
      assigmentHeader = document.createElement('div'),
      assigmentName = document.createElement('div'),
      addTaskButton = document.createElement('div'),
      taskButtonHover = document.createElement('div'),
      assigmentTasks = document.createElement('div'),
      container = document.querySelector(".overflowContent");

  // Add classes to elements
  assigmentContainer.classList.add("assignment");
  assigmentHeader.classList.add("headerAssigment");
  assigmentName.classList.add("assignmentName");
  assigmentName.textContent = assigmnentName;
  addTaskButton.classList.add("addToDo");
  taskButtonHover.classList.add("displayHoverTask")
  assigmentTasks.classList.add("toDo");

  // Add button content 
  addTaskButton.textContent = "+";
  taskButtonHover.textContent = "Create new task";
  addTaskButton.appendChild(taskButtonHover);
  
  // Add Assigment function onclick and id
  addTaskButton.onclick = createTask.bind(this, assigmnentName);
  assigmentTasks.id = assigmnentName;

  // Add elements to Dom
  assigmentHeader.appendChild(assigmentName);
  assigmentHeader.appendChild(addTaskButton);
  assigmentContainer.appendChild(assigmentHeader);
  assigmentContainer.appendChild(assigmentTasks);  
  container.appendChild(assigmentContainer);

  // (posible solucion) Create variable with the id of the container and return
}

// Create tasks
let createTask = (assigmnent) =>{
  // Select created container in HTML and Create elements
  let toDoContainer = document.querySelector("#taskGeneralContainer"),
      checkboxContainer = document.createElement('div'),
      checkboxText = document.createElement('div'),
      checkBox =  document.createElement('div');

  // add classes
  checkboxContainer.classList.add("checkboxContainer");
  checkBox.classList.add("checkBox");  

  // Text input and evaluation
  let taskPrompt = prompt("Write task");
  if (taskPrompt == ""){
    alert("Insert task description");
    return;
  } else if (taskPrompt == null){
    return;
  }

  // Add text in the container
  checkboxText.innerText += taskPrompt;
  // Call fuction that save element in the local storage
  saveTask(assigmnent, taskPrompt);
  // Add id and toggle styles
  addId(checkBox, assigmnent);

  // Append elements
  checkboxContainer.appendChild(checkBox);
  checkboxContainer.appendChild(checkboxText);

  // Add individual task to his respective assignment
  if (assigmnent == "taskGeneral"){
    // The pre-created element with the class toDo
    toDoContainer.appendChild(checkboxContainer);
  } else {
    // The new-element with the same ID to his name
    document.querySelector("#"+assigmnent).appendChild(checkboxContainer);
  }
}

// Charge taks from local storage
let chargeTask = (assigmnent, taskText, Counter) =>{
  // Create elements
  let toDoContainer = document.querySelector("#taskGeneralContainer"),
      checkboxContainer = document.createElement('div'),
      checkboxText = document.createElement('div'),
      checkBox =  document.createElement('div'); 

  // add classes
  checkboxContainer.classList.add("checkboxContainer");
  checkBox.classList.add("checkBox"); 

  // add text
  checkboxText.innerText += taskText; 

 // fuction that add id and toggle fuction
  chargeId(checkBox, assigmnent, Counter); 

  // Append elements
  checkboxContainer.appendChild(checkBox);
  checkboxContainer.appendChild(checkboxText);

  // Add individual task to the parent with the ID
  if (assigmnent == "taskGeneral"){
    toDoContainer.appendChild(checkboxContainer);
  } else {
    document.querySelector("#"+assigmnent).appendChild(checkboxContainer);
  }
}

// Mark checkbox task as done
let toggleCheckbox = (boxNumber, assigmnent) =>{
  let box = document.querySelector("#"+assigmnent+boxNumber),
      boxContainer = box.parentNode;
  box.classList.toggle("boxCheckStyle");
  boxContainer.classList.toggle("boxCheckStyleParent");

}


// Save items in local storage
let saveTask = (assigmnent, taskContent) =>{
  // create assigment if it's not already in local storage
  if (!(assigmnent in localStorage)){
    let emptyObject = {};
    localStorage.setItem(assigmnent, JSON.stringify(emptyObject));
  }

  // Get the object stored as string from the local storage
  let str = localStorage.getItem(assigmnent);
  // transform string to object (proceso llamado parsear)
  let parsedObj = JSON.parse(str);
  // Calc number of existing tasks in the object
  let tasksAmount = Object.keys(parsedObj).length;

  // Store the data in the object, then transform, and finally store in Local Storage
  if (tasksAmount == 0){
    parsedObj.task1 = taskContent;
    // Transform the object to string again and store it 
    localStorage.setItem(assigmnent, JSON.stringify(parsedObj));
    return;

  } else {
    // Define the task index
    let task = "task"+(tasksAmount+1);
    // [] is necesary for store keys dynamic
    parsedObj[task] = taskContent;
    localStorage.setItem(assigmnent, JSON.stringify(parsedObj));
  }
}

// new objects ID
let addId = (checkBox, assigmnent) =>{
  // Calc number of existing tasks in the object
  let str = localStorage.getItem(assigmnent),
      parsedObj = JSON.parse(str),
      tasksAmount = Object.keys(parsedObj).length;

  if (tasksAmount == 1){
    let id = (assigmnent)+1;
    checkBox.id = id;
    checkBox.addEventListener("click", toggleCheckbox.bind(this, 1, assigmnent));
    return checkBox;
  
  } else {
    let id = (assigmnent)+(tasksAmount);
    checkBox.id = id;
    checkBox.addEventListener("click", toggleCheckbox.bind(this, tasksAmount, assigmnent));
    return checkBox;
  } 
}

// charged items ID
let chargeId = (checkBox, assigmnent, Counter) =>{
  // Calc number of existing tasks in the object
  let str = localStorage.getItem(assigmnent),
      parsedObj = JSON.parse(str),
      tasksAmount = Object.keys(parsedObj).length;
      
    let id = (assigmnent)+(Counter);
    checkBox.id = id;
    checkBox.addEventListener("click", toggleCheckbox.bind(this, Counter, assigmnent));
    return checkBox;
}

// Stablish the state of the page the at charge
// State taskGeneral in localStorage for the first time
if (!("taskGeneral" in localStorage)) {
  let emptyObject = {};
  localStorage.setItem('taskGeneral', JSON.stringify(emptyObject));

// Charge the assignments stored in the localStorage
} else if ("taskGeneral" in localStorage){
  
  // Iterate in the local Storage 
  for (let [key, value] of Object.entries(localStorage)) {
    console.log(key, value);

    // First charge the elements from the taskGeneral
    if (key == "taskGeneral"){
      // contador necesario para cargar las id
      let parsedObj = JSON.parse(value),
          contador = 0;
      // Iterate inside taskGeneral and call the function that add each taks with the respective text
      for (let keyTask in parsedObj) {
        contador += 1;
        chargeTask(key, parsedObj[keyTask], contador);
      } 

    } else{
      chargeAssigmentContainer(key);
      let parsedObj = JSON.parse(value),
          contador = 0;

      for (let keyTask in parsedObj) {
        contador += 1;
        chargeTask(key, parsedObj[keyTask], contador);
      }

    }
  }
}


// Crear assigments con nombres con espacio genera problemas 

