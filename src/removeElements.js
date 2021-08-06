//Remove tasks
let removeElement = () =>{
  // Confirm delete
  if (!(confirm('Are you sure you want to delete this task?'))) {
    return
  } 

  //select the text of the task to delete, his assignment, and the local storage object where it's stored
  let taskValue = event.target.previousElementSibling.innerHTML,
      assignmentKey = event.target.parentNode.parentNode.previousElementSibling.children[0].innerHTML,
      str = localStorage.getItem(assignmentKey),
      parsedObj = JSON.parse(str);

  // Get taskGeneral object in particular cause it's stored in a diferent way that others
  if (assignmentKey == "General"){
    str = localStorage.getItem("taskGeneral");
    parsedObj = JSON.parse(str);
  } 

  // Iterate in the onject and search for the taskValue in there
  for(var f in parsedObj) {
    if(parsedObj[f] == taskValue) {
      // Delete taskVAlue of the object
      delete parsedObj[f];
      // Update the object in localStorage
      if (assignmentKey == "General"){
        localStorage.setItem("taskGeneral", JSON.stringify(parsedObj));
      } else {
        localStorage.setItem(assignmentKey, JSON.stringify(parsedObj));
      }
    }
  }

  //Remove item from de DOM
  event.target.parentNode.remove();
}

//Remove assignment function
let removeAssignment = () =>{
  // Confirm delete
  if (!(confirm('Are you sure you want to delete this assignment?'))) {
    return
  }

  // Select assignment name and delete the local storage item with his name
  let assignmentKey = event.target.parentNode.children[0].children[0].innerHTML;
  localStorage.removeItem(assignmentKey);

  event.target.parentNode.remove();
}

export{
  removeElement,
  removeAssignment
}