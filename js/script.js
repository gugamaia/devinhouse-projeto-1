const form = document.querySelector("#form");
const inputTask = document.querySelector("#inputTask");
const newTasks = document.querySelector(".newTasks");
const msgErro = document.querySelector(".msgErro");
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
  


  // se verdadeiro, rodará o código a seguir
  if (itemTarefa) {
    msgErro.innerText = null;
    inputTask.classList.remove("inativo");

    // criará os elementos a seguir dentro da div criado, pela variavel itemAdicionado
    itemAdicionado.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice} class="novoItem"> 
        <li> ${itemTarefa} </li>
        <input type="button" data-indice=${indice} value="X" onClick="removeItens(event)" class="removeItem">
        `


    newTasks.appendChild(itemAdicionado); // adicionará os itens abaixo da ul com a classe newTasks

    itensnewTasks.push(itemTarefa); // adicionará os novos elementos ao final da array

    salveLocalStorage(); // salva os valores digitados automaticamente no localStorage

    inputTask.value = "";
    inputTask.focus();
  } // se for falso, aparecerá uma mensagem de alerta e bordas vermelhas no input
  else {
    inputTask.classList.add("inativo");
    msgErro.innerHTML = `<span>Atenção!</span>    Você deixou o espaço em branco, digite uma nova tarefa.`;
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