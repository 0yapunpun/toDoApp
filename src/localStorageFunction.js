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

export{
  saveTask, 
}