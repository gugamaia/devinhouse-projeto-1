const form = document.querySelector("#form");
const inputTask = document.querySelector("#inputTask");
const newTasks = document.querySelector(".newTasks");
const blnkTask = document.querySelector(".blnkTask");
const removeItem = document.querySelector(".removeItem");
let itensnewTasks = [];

form.addEventListener("submit", addNewItem);

function addNewItem(event) {
  event.preventDefault();
  addNewTasks(inputTask.value);
}

function localStorageSave() {
  localStorage.setItem("newTaskToDo", JSON.stringify(itensnewTasks));
  console.log("Nova tarefa add no LocalStorage");
}

function localStorageLoadTask() {
  let localStorageNewTask = localStorage.getItem("newTaskToDo");

  if (localStorageNewTask) {
    localStorageNewTask = JSON.parse(localStorageNewTask);

    for (let i = 0; i < localStorageNewTask.length; i++) {
      addNewTasks(localStorageNewTask[i]);      
    }
    
  }
}
localStorageLoadTask();

function addNewTasks(itemTask, status, indice) {
  let itemAdd = document.createElement('div')
  itemAdd.classList.add('containerItem')
  
    if (itemTask) {
      blnkTask.innerText = null;
      inputTask.classList.remove("inativo");

      itemAdd.innerHTML = 
        ` <input type="checkbox" ${status}> 
          <ol> ${itemTask} </ol>
          <input type="button" value="X" onClick="removeItens(event)" class="removeItem">`
      newTasks.appendChild(itemAdd); 
      itensnewTasks.push(itemTask); 
      localStorageSave();

      inputTask.value = "";
      inputTask.focus();
    } else {
            inputTask.classList.add("inativo");
            alert("ERRROOOUUU!!!" + "\n" + "Não desanime." + "\n" + "Basta preencher o campo com uma tarefa!");
            console.log("Tentativa de inserir campo em branco");
          }
}

function removeItens(event) {
  let item = document.querySelector(".containerItem");
  item.parentNode.removeChild(event.target.parentNode);

  localStorage.removeItem('newTaskToDo', item)
  /*alert("Atividade excluída com sucesso!");*/
  console.log("Atividade excluída");
}


