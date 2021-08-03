import {saveTask} from './localStorageFunction';
import {addId} from './idManipulation';
import {removeElement} from './removeElements';

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

// Create tasks
let createTask = (assigmnent) =>{
  // Text input and evaluation
  let taskPrompt = prompt("Write task");
  if (taskPrompt == ""){
    alert("Insert task description");
    return;
  } else if (taskPrompt == null){
    return;
  }  

  // Select created container in HTML and Create elements
  let toDoContainer = document.querySelector("#taskGeneralContainer"),
      checkboxContainer = document.createElement('div'),
      checkboxText = document.createElement('div'),
      checkBox =  document.createElement('div'),
      deletebox = document.createElement('div');


  // add classes
  checkboxContainer.classList.add("checkboxContainer");
  checkBox.classList.add("checkBox"); 
  deletebox.classList.add("deleteBox"); 

  // Add text to containers
  checkboxText.innerText += taskPrompt;
  deletebox.innerText += "x";

  // Add function that remove elements
  deletebox.onclick = removeElement;
  
  // Call fuction that save element in the local storage
  saveTask(assigmnent, taskPrompt);
  // Call function that add id and toggle styles
  addId(checkBox, assigmnent);

  // Append elements
  checkboxContainer.appendChild(checkBox);
  checkboxContainer.appendChild(checkboxText);
  checkboxContainer.appendChild(deletebox);

  // Add individual task to his respective assignment
  if (assigmnent == "taskGeneral"){
    // The pre-created element with the class toDo
    toDoContainer.appendChild(checkboxContainer);
  } else {
    // The new-element with the same ID to his name
    document.querySelector("#"+assigmnent).appendChild(checkboxContainer);
  }
}

// check if the string has white space
let hasWhiteSpace = (s) => {
  return s.indexOf(' ') >= 0;
}

export{
  createassignment,
  createTask
}