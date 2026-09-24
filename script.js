const tarefas = [
  { id: 1, titulo: "Estudar JavaScript", concluida: false, prioridade: "alta" },
  { id: 2, titulo: "Fazer exercícios do DOM", concluida: true, prioridade: "media" },
  { id: 3, titulo: "Revisar métodos de array", concluida: false, prioridade: "baixa" }
];

const nometarefa = document.getElementById("nomeTarefa").value;
const prioridade = document.getElementById("prioridade").value;
const catalogoTarefas = document.getElementById("catalogoTarefas");


function exibirTarefas(){
    tarefas.push({título: nometarefa, prioridade: prioridade});
}