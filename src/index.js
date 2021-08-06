//Import functions
import {chargeAssigmentContainer, chargeTask} from './chargeItems';
import {createassignment, createTask} from './addItems';

document.getElementById("createTaskbut").onclick = createTask.bind(this, 'taskGeneral');
document.getElementById("createassigbut").onclick = createassignment;

// Stablish the state of the page at initial charge
// State taskGeneral in localStorage for the first time
if (!("taskGeneral" in localStorage)) {
  //store empty object
  let emptyObject = {};
  localStorage.setItem('taskGeneral', JSON.stringify(emptyObject));

// Charge the assignments stored in the localStorage
} else if ("taskGeneral" in localStorage){
  
  // Iterate in the local Storage 
  for (let [key, value] of Object.entries(localStorage)) {
    
    // First charge the elements from the taskGeneral
    if (key == "taskGeneral"){
      // Se pasa de string a objecto y se inicializa un contador para llevar la cuenta de las id
      let parsedObj = JSON.parse(value),
          contador = 0;
      // Iterate inside taskGeneral and call the function that add each taks with the respective text
      for (let keyTask in parsedObj) {
        contador += 1;
        chargeTask(key, parsedObj[keyTask], contador);
      } 

    //Similar proces for the other assignments, but generating it with a function
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
