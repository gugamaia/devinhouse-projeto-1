var form = document.querySelector("#formulario");
var inputItem = document.getElementById("inputItem");
var lista = document.querySelector("#list");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addItemNaLista();
});

function addItemNaLista() {
    var txtItem = inputItem.value;
    var todoList = document.getElementById("todoList");
    if (txtItem) {
        //TODO: adicionar item na lista
        var novoItem = document.createElement("option");
        novoItem.innerText = txtItem;
        novoItem.value = txtItem;
        lista.appendChild(novoItem);
        if (todoList) {
            lista.remove(todoList);
        }
        inputItem.value = "";
        inputItem.focus();
    } else {
        alert("Favor inserir um item.");
    }
}


