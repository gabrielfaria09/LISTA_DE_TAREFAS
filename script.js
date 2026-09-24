const tarefas = [];

const nometarefa = document.getElementById("nomeTarefa");
const prioridade = document.getElementById("prioridade");
const catalogoTarefas = document.getElementById("catalogoTarefas");
const botaoSubmeter = document.getElementById("botaoSubmeter");


function criarTarefas(){
    tarefas.push({titulo: nometarefa.value, prioridade: prioridade.value});
    console.log(tarefas);
    exibirTarefas();
}

function exibirTarefas(){
  tarefas.forEach(tarefa => {

    catalogoTarefas.innerHTML = ``;

    const lista = document.createElement("li");
    lista.innerHTML = `<p>Nome da tarefa: ${tarefa.titulo}</p>
    <p>Prioridade da tarefa: ${tarefa.prioridade}</p>
    <form><input type="checkbox"></form>`;

    catalogoTarefas.append(lista);
  })
}

botaoSubmeter.addEventListener("click", criarTarefas);
