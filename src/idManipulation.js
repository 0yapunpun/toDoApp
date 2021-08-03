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

// Mark checkbox task as done, function directly related to the id of the item
let toggleCheckbox = (boxNumber, assigmnent) =>{
  let box = document.querySelector("#"+assigmnent+boxNumber),
      boxContainer = box.parentNode;
  box.classList.toggle("boxCheckStyle");
  boxContainer.classList.toggle("boxCheckStyleParent");
}

export{
  addId,
  chargeId,
  toggleCheckbox
}