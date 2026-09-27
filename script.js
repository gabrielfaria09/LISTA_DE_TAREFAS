//Array que guarda os objetos (tarefas), caso as tarefas já estejam salvas no local storage,
//os dados são recuperados, caso contrário, o array será criado do zero.
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const nometarefa = document.getElementById("nomeTarefa"); //nome da tarefa digitada
const prioridade = document.getElementById("prioridade"); //prioridade da tarefa escolhida
const busca = document.getElementById("busca"); //select de busca por status da tarefa
const catalogoTarefas = document.getElementById("catalogoTarefas"); //article que armazena cada terefa
const botaoSubmeter = document.getElementById("botaoSubmeter"); //botão de criar e exibir tarefas

//Criar tarefas, com .push para adicionar novo objeto, caso
//não haja nome, não será criada.

function criarTarefas() {
  if (!nometarefa.value.trim()) return;

  tarefas.push({ id: Date.now(), titulo: nometarefa.value, prioridade: prioridade.value,
    status: "Tarefa em andamento"});
  
  nometarefa.value = "";
  prioridade.value = "";

  exibirTarefas();
  salvaTarefa();
}

//Exibir tarefas, pega o parâmetro (o array tarefas, que é a lista,
//caso não haja nenhum parâmetro, a lista é o array todo, caso haja filtragem, a
//função recebe o parâmetro e exibe com filtro).

function exibirTarefas(lista = tarefas) {
  catalogoTarefas.innerHTML = "";

  lista.forEach((tarefa, index) => {
    //Manipulação do DOM
    const itemLista = document.createElement("li");
    const campoStatus = tarefa.status === "Concluída" 
      ? `<p class="verificar">"${tarefa.status}"</p>` 
      : `<p class="verificar"><input type="checkbox" class="check"> ${tarefa.status}</p>`;
    
    itemLista.classList.add("lista");
    itemLista.innerHTML = `
      <p>Nome da tarefa: ${tarefa.titulo}</p>
      <p>Prioridade da tarefa: ${tarefa.prioridade}</p>
      ${campoStatus}
      <button class="deletar">Excluir</button>
    `;

    //Se o checkbox for marcado, o status da tarefa muda para concluído.

    const check = itemLista.querySelector(".check");

    if (check) {
      check.addEventListener("change", () => {
        if (check.checked) {
          setTimeout(() => {
            tarefa.status = "Concluída";
            filtraTarefa();
            salvaTarefa();
          }, 1000);
        }
      });
    }

    //Se o botão deletar for clicado, a função deletar é executada.

    const deletar = itemLista.querySelector(".deletar");
    deletar.addEventListener("click", () => {
      deletaTarefa(tarefa.id);
    });

    catalogoTarefas.appendChild(itemLista);
  });
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

//Salva as tarefas em JSON para não perdê-las ao recarregar a página.

function salvaTarefa(){
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
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

//Chamando as funções necessárias (criar para o botão criar, filtrar para a opção filtrar).

botaoSubmeter.addEventListener("click", criarTarefas);
busca.addEventListener("change", filtraTarefa);

exibirTarefas();