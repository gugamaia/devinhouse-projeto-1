const form = document.querySelector("#form");
const inputTask = document.querySelector("#inputTask");
const newTasks = document.querySelector(".newTasks");
const blnkTask = document.querySelector(".blnkTask");
let itensnewTasks = [];

// Aciona a função quando o usuário dar submit, prevendo o evento padrão do form
function adicionarItem(event) {
  event.preventDefault();
  adicionarNanewTasks(inputTask.value);
}
form.addEventListener("submit", adicionarItem);

// Pegará o valor da variavel Input Tarefa e acionará esta função
function adicionarNanewTasks(itemTarefa, status, indice) {
  let itemAdicionado = document.createElement('div')
  itemAdicionado.classList.add('containerItem')
  
    if (itemTarefa) {
      blnkTask.innerText = null;
      inputTask.classList.remove("inativo");

      // criará os elementos a seguir dentro da div criado, pela variavel itemAdicionado
      itemAdicionado.innerHTML = `
          <input type="checkbox" ${status} data-indice=${indice} class="novoItem"> 
          <li> ${itemTarefa} </li>
          <input type="button" data-indice=${indice} value="X" onClick="removeItens(event)" class="removeItem">
          `
      newTasks.appendChild(itemAdicionado); 
      itensnewTasks.push(itemTarefa); 
      salveLocalStorage();

      inputTask.value = "";
      inputTask.focus();
    } else {
            inputTask.classList.add("inativo");
            alert("ERRROOOUUU!!!" + "\n" + "Não desanime." + "\n" + "Basta preencher o campo com uma tarefa!");
          }
}



// quando clicar no input button value X, removerá a div criada
function removeItens(event) {
  let item = document.querySelector(".containerItem");
  item.parentNode.removeChild(event.target.parentNode);

  localStorage.removeItem('newTaskToDo', item)

  // localStorage.clear()

  // localStorage.clear()

  // console.log(event.target.previousElementSibling.innerText)

  // itensnewTasks.remove(event.target.previousElementSibling.innerText)

}

// salvando os itens na key newTaskToDo
function salveLocalStorage() {
  localStorage.setItem("newTaskToDo", JSON.stringify(itensnewTasks));
}

// carregará a página com os itens salvos no Local Storage com a key newTaskToDo
function carregarnewTasksLocalStorage() {
  let newTasksLocalStorage = localStorage.getItem("newTaskToDo");

  if (newTasksLocalStorage) {
    newTasksLocalStorage = JSON.parse(newTasksLocalStorage);

    for (let i = 0; i < newTasksLocalStorage.length; i++) {
      adicionarNanewTasks(newTasksLocalStorage[i]);
    }
  }
}
carregarnewTasksLocalStorage();

function restList() {
  let excluir = confirm("Limpar newTasks atual?")

  if (excluir) {
      // apaga a newTasks do local storage, newTasksTarefas = []
      localStorage.setItem("newTasksTarefas", JSON.stringify([])) 
      // apagar a newTasks da página
      let node = document.getElementById("divnewTasks")
      while (node.firstChild) {
          node.removeChild(node.firstChild)
      }
  }
}

