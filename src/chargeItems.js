import {chargeId } from './idManipulation';
import {createTask} from './addItems';
import {removeElement, removeAssignment} from './removeElements';

// Charge assignmet containers from local storage
let chargeAssigmentContainer = (assigmnentName) =>{

  // Create and select elements 
  let assigmentContainer = document.createElement('div'),
      assigmentHeader = document.createElement('div'),
      assigmentName = document.createElement('div'),
      addTaskButton = document.createElement('div'),
      taskButtonHover = document.createElement('div'),
      assigmentTasks = document.createElement('div'),
      container = document.querySelector(".overflowContent"),
      deletebox = document.createElement('div');

  // Add classes to elements
  assigmentContainer.classList.add("assignment");
  assigmentHeader.classList.add("headerAssigment");
  assigmentName.classList.add("assignmentName");
  assigmentName.textContent = assigmnentName;
  addTaskButton.classList.add("addToDo");
  taskButtonHover.classList.add("displayHoverTask");
  assigmentTasks.classList.add("toDo");
  deletebox.classList.add("deleteAssignment");

  // Add button content 
  deletebox.innerText += "x"; 
  addTaskButton.textContent = "+";
  taskButtonHover.textContent = "Create new task";
  addTaskButton.appendChild(taskButtonHover);

  // Add fucntion to delete button
  deletebox.onclick = removeAssignment;
  
  // Add Assigment function onclick and id
  addTaskButton.onclick = createTask.bind(this, assigmnentName);
  assigmentTasks.id = assigmnentName;

  // Add elements to Dom
  assigmentHeader.appendChild(assigmentName);
  assigmentHeader.appendChild(addTaskButton);
  assigmentContainer.appendChild(assigmentHeader);
  assigmentContainer.appendChild(assigmentTasks);  
  assigmentContainer.appendChild(deletebox);
  container.appendChild(assigmentContainer);

}

// Charge taks from local storage
let chargeTask = (assigmnent, taskText, Counter) =>{
  // Create elements
  let toDoContainer = document.querySelector("#taskGeneralContainer"),
      checkboxContainer = document.createElement('div'),
      checkboxText = document.createElement('div'),
      checkBox =  document.createElement('div'), 
      deletebox = document.createElement('div');

  // add classes
  checkboxContainer.classList.add("checkboxContainer");
  checkBox.classList.add("checkBox"); 
  deletebox.classList.add("deleteBox"); 

  // add text
  checkboxText.innerText += taskText; 
  deletebox.innerText += "x"; 

  // Add function that remove elements
  deletebox.onclick = removeElement;

 // fuction that add id and toggle fuction
  chargeId(checkBox, assigmnent, Counter); 

  // Append elements
  checkboxContainer.appendChild(checkBox);
  checkboxContainer.appendChild(checkboxText);
  checkboxContainer.appendChild(deletebox);

  // Add individual task to the parent with the ID
  if (assigmnent == "taskGeneral"){
    toDoContainer.appendChild(checkboxContainer);
  } else {
    document.querySelector("#"+assigmnent).appendChild(checkboxContainer);
  }
}

export {
  chargeAssigmentContainer,
  chargeTask,
  removeElement
}
