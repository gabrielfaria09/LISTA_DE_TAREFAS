//Array que guarda os objetos (tarefas), caso as tarefas já estejam salvas no local storage,
//os dados são recuperados, caso contrário, o array será criado do zero.
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const nometarefa = document.getElementById("nomeTarefa"); //nome da tarefa digitada
const prioridade = document.getElementById("prioridade"); //prioridade da tarefa escolhida
const busca = document.getElementById("busca"); //select de busca por status da tarefa
const catalogoTarefas = document.getElementById("catalogoTarefas"); //lista que armazena cada tarefa
const botaoSubmeter = document.getElementById("botaoSubmeter"); //botão de criar e exibir tarefas
const exibeEstatisticas = document.getElementById("exibeEstatisticas");//article que armazena estatísticas
const botaoReiniciar = document.getElementById("botaoReiniciar");//botão de reiniciar histórico
let totalTarefas = Number(localStorage.getItem("totalTarefas")) || 0; //número total de tarefas criadas
let totalConcluidas = Number(localStorage.getItem("totalConcluidas")) || 0; //número total de tarefas concluídas

//Criar tarefas, com .push para adicionar novo objeto, caso
//não haja nome, não será criada.

function criaTarefas() {
  if (!nometarefa.value.trim()) return;

  tarefas.push({ id: Date.now(), titulo: nometarefa.value, prioridade: prioridade.value,
    status: "Tarefa em andamento"});

  nometarefa.value = "";
  prioridade.value = "Baixa";

  totalTarefas += 1;

  filtraTarefa();
  salvaTarefa();
}

//Exibir tarefas, pega o parâmetro (o array tarefas, que é a lista,
//caso não haja nenhum parâmetro, a lista é o array todo, caso haja filtragem, a
//função recebe o parâmetro e exibe com filtro).

function exibirTarefas(lista = tarefas) {
  catalogoTarefas.innerHTML = "";

  if (lista.length === 0) {
    catalogoTarefas.innerHTML = `
      <li class="list-group-item text-center text-secondary px-4 py-4">Nenhuma tarefa por aqui.</li>
    `;
  }

  const classesPrioridade = {
    Alta: "bg-danger-subtle text-danger-emphasis",
    Média: "bg-warning-subtle text-warning-emphasis",
    Baixa: "badge-prioridade"
  };

  lista.forEach((tarefa) => {
    //Manipulação do DOM
    const concluida = tarefa.status === "Concluída";
    const itemLista = document.createElement("li");
    itemLista.className = "list-group-item d-flex align-items-center gap-3 px-4 py-3";

    itemLista.innerHTML = `
      <input type="checkbox" class="check form-check-input mt-0" aria-label="Concluir tarefa"
        ${concluida ? "checked disabled" : ""}>
      <div class="flex-grow-1">
        <div class="titulo fw-medium ${concluida ? "text-decoration-line-through text-secondary" : ""}"></div>
        <span class="badge rounded-pill ${classesPrioridade[tarefa.prioridade] || ""}">${tarefa.prioridade}</span>
        <small class="text-secondary ms-1">${concluida ? "Concluída" : "Em andamento"}</small>
      </div>
      <button class="deletar btn btn-sm btn-outline-secondary">Excluir</button>
    `;

    //textContent evita que o texto digitado seja interpretado como HTML.
    itemLista.querySelector(".titulo").textContent = tarefa.titulo;

    //Se o checkbox for marcado, o status da tarefa muda para concluído.

    const check = itemLista.querySelector(".check");

    check.addEventListener("change", () => {
      if (check.checked) {
        check.disabled = true;
        setTimeout(() => {
          tarefa.status = "Concluída";
          totalConcluidas += 1;
          filtraTarefa();
          salvaTarefa();
        }, 1000);
      }
    });

    //Se o botão deletar for clicado, a função deletar é executada.

    itemLista.querySelector(".deletar").addEventListener("click", () => {
      deletaTarefa(tarefa.id);
    });

    catalogoTarefas.appendChild(itemLista);
  });

  estatisticas();
}

//Filtrar tarefas por status, o resultado da estrutura de decisão é usado
//como parâmetro para a função exibir tarefas.

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

//Salva as tarefas em JSON para não perdê-las ao recarregar a página, além do
//número de tarefas criadas e concluídas.

function salvaTarefa(){
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  localStorage.setItem("totalTarefas", totalTarefas);
  localStorage.setItem("totalConcluidas", totalConcluidas);
}

//Deleta tarefa,a função encontra o index exato com base em qual id
//corresponde com o id passado no parâmetro, evitando deletar
//a tarefa no índice errado (caso da filtragem), ou múltiplas tarefas(caso de nome igual).

function deletaTarefa(id) {
  const indexGlobal = tarefas.findIndex(tarefa => tarefa.id === id);

  if (indexGlobal !== -1) {
    tarefas.splice(indexGlobal, 1);
    salvaTarefa();
    filtraTarefa();
  }
}


function estatisticas(){
  exibeEstatisticas.innerHTML = `
    <div class="col-6">
      <div class="card border-0 shadow-sm rounded-4 p-3">
        <span class="fs-3 fw-semibold text-primary">${totalTarefas}</span>
        <small class="text-secondary">Tarefas criadas</small>
      </div>
    </div>
    <div class="col-6">
      <div class="card border-0 shadow-sm rounded-4 p-3">
        <span class="fs-3 fw-semibold text-primary">${totalConcluidas}</span>
        <small class="text-secondary">Tarefas concluídas</small>
      </div>
    </div>
  `;
}

//Deleta o histórico de tarefas criadas e concluídas até hoje, com o clique do botão
// "reiniciar histórico"

function reiniciaHistorico(){
  totalTarefas = 0;
  totalConcluidas = 0;

  estatisticas();
}

//Chamando as funções necessárias (criar para o botão criar, filtrar para a opção filtrar,
// reiniciar para o botão reiniciar).

botaoSubmeter.addEventListener("click", criaTarefas);
busca.addEventListener("change", filtraTarefa);
botaoReiniciar.addEventListener("click", reiniciaHistorico);

exibirTarefas();