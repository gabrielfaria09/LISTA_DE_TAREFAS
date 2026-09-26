const tarefas = [];

const nometarefa = document.getElementById("nomeTarefa");
const prioridade = document.getElementById("prioridade");
const buscatarefa = document.getElementById("buscaTarefa");
const catalogoTarefas = document.getElementById("catalogoTarefas");
const botaoSubmeter = document.getElementById("botaoSubmeter");

function criarTarefas() {
  if (!nometarefa.value.trim()) return;

  tarefas.push({ titulo: nometarefa.value, prioridade: prioridade.value,
    status: "Tarefa em andamento"});
  
  nometarefa.value = "";
  prioridade.value = "";

  exibirTarefas();
}

function exibirTarefas() {
  catalogoTarefas.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const lista = document.createElement("li");
    const campoStatus = tarefa.status === "Concluída" 
      ? `<p class="verificar">"${tarefa.status}"</p>` 
      : `<p class="verificar"><input type="checkbox" class="check"> ${tarefa.status}</p>`;
    
    lista.classList.add("lista");
    lista.innerHTML = `
      <p>Nome da tarefa: ${tarefa.titulo}</p>
      <p>Prioridade da tarefa: ${tarefa.prioridade}</p>
      ${campoStatus}
    `;

    const check = lista.querySelector(".check");

    if (check) {
      check.addEventListener("change", () => {
        if (check.checked) {
          setTimeout(() => {
            tarefa.status = "Concluída";
            exibirTarefas();
          }, 1000);
        }
      });
    }

    catalogoTarefas.appendChild(lista);
  });
}

function buscaTarefa(){
  Object.values(tarefas).includes(buscaTarefa.value);
}


botaoSubmeter.addEventListener("click", criarTarefas);