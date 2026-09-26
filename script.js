const tarefas = []; //Array que guarda os objetos (tarefas)

const nometarefa = document.getElementById("nomeTarefa"); //nome da tarefa digitada
const prioridade = document.getElementById("prioridade"); //prioridade da tarefa escolhida
const busca = document.getElementById("busca"); //select de busca por status
const filtrarTarefa = document.getElementById("filtrarTarefa"); //botão que executa a filtragem
const catalogoTarefas = document.getElementById("catalogoTarefas"); //article que armazena cada terefa
const botaoSubmeter = document.getElementById("botaoSubmeter"); //botão de criar e exibir tarefas

//Função criar tarefas, com .push para adicionar novo objeto, caso
//não haja nome, não será criada

function criarTarefas() {
  if (!nometarefa.value.trim()) return;

  tarefas.push({ titulo: nometarefa.value, prioridade: prioridade.value,
    status: "Tarefa em andamento"});
  
  nometarefa.value = "";
  prioridade.value = "";

  exibirTarefas();
}

function exibirTarefas(lista = tarefas) {
  catalogoTarefas.innerHTML = "";

  lista.forEach((tarefa, index) => {
    const itemLista = document.createElement("li");
    const campoStatus = tarefa.status === "Concluída" 
      ? `<p class="verificar">"${tarefa.status}"</p>` 
      : `<p class="verificar"><input type="checkbox" class="check"> ${tarefa.status}</p>`;
    
    itemLista.classList.add("lista");
    itemLista.innerHTML = `
      <p>Nome da tarefa: ${tarefa.titulo}</p>
      <p>Prioridade da tarefa: ${tarefa.prioridade}</p>
      ${campoStatus}
    `;

    const check = itemLista.querySelector(".check");

    if (check) {
      check.addEventListener("change", () => {
        if (check.checked) {
          setTimeout(() => {
            tarefa.status = "Concluída";
            filtraTarefa();
          }, 1000);
        }
      });
    }

    catalogoTarefas.appendChild(itemLista);
  });
}

function filtraTarefa() {
  let resultadoFiltro = [];

  if (busca.value === "Concluídas") {
    resultadoFiltro = tarefas.filter(tarefa => tarefa.status === "Concluída");
  } else if (busca.value === "Em andamento") {
    resultadoFiltro = tarefas.filter(tarefa => tarefa.status === "Tarefa em andamento");
  } else {
    resultadoFiltro = tarefas;
  }

      exibirTarefas(resultadoFiltro);
}

botaoSubmeter.addEventListener("click", criarTarefas);
filtrarTarefa.addEventListener("click", filtraTarefa);