const formulario = document.getElementById("form-rotina");
const lista = document.getElementById("lista-rotina");
const saudacao = document.getElementById("saudacao");
const barra = document.getElementById("barra-progresso");
const contador = document.getElementById("contador");
const botaoLimpar = document.getElementById("limpar");

let tarefas = [];

function criarRotina(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;
  const acordar = document.getElementById("acordar").value;

  tarefas = [];

  tarefas.push({
    horario: acordar,
    nome: "Acordar e se preparar",
    concluida: false,
  });

  if (document.getElementById("estudos").checked) {
    tarefas.push({
      horario: "08:00",
      nome: "Estudar",
      concluida: false,
    });
  }

  tarefas.push({
    horario: "12:00",
    nome: "Almoçar e descansar",
    concluida: false,
  });

  if (document.getElementById("exercicios").checked) {
    tarefas.push({
      horario: "16:00",
      nome: "Fazer exercícios",
      concluida: false,
    });
  }

  if (document.getElementById("autocuidado").checked) {
    tarefas.push({
      horario: "18:00",
      nome: "Momento de autocuidado",
      concluida: false,
    });
  }

  if (document.getElementById("lazer").checked) {
    tarefas.push({
      horario: "19:00",
      nome: "Lazer",
      concluida: false,
    });
  }

  saudacao.textContent = nome
    ? "Olá, " + nome + "! Aqui está sua rotina."
    : "Aqui está sua rotina.";

  mostrarTarefas();
}

function mostrarTarefas() {
  lista.innerHTML = "";

  tarefas.forEach(function (tarefa, indice) {
    const item = document.createElement("label");
    item.className = "list-group-item";

    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.className = "form-check-input me-2";
    caixa.checked = tarefa.concluida;

    caixa.addEventListener("change", function () {
      tarefas[indice].concluida = caixa.checked;
      mostrarTarefas();
    });

    const texto = document.createElement("span");
    texto.textContent = tarefa.horario + " - " + tarefa.nome;

    if (tarefa.concluida) {
      texto.className = "text-decoration-line-through text-secondary";
    }

    item.appendChild(caixa);
    item.appendChild(texto);
    lista.appendChild(item);
  });

  atualizarProgresso();
}

function atualizarProgresso() {
  let concluidas = 0;

  tarefas.forEach(function (tarefa) {
    if (tarefa.concluida) {
      concluidas++;
    }
  });

  let porcentagem = 0;

  if (tarefas.length > 0) {
    porcentagem = Math.round((concluidas / tarefas.length) * 100);
  }

  barra.style.width = porcentagem + "%";
  barra.textContent = porcentagem + "%";

  contador.textContent =
    concluidas + " de " + tarefas.length + " tarefas concluídas";
}

botaoLimpar.addEventListener("click", function () {
  tarefas = [];
  lista.innerHTML = "";

  saudacao.textContent = "Sua rotina vai aparecer aqui.";
  barra.style.width = "0%";
  barra.textContent = "0%";
  contador.textContent = "0 tarefas concluídas";
});

formulario.addEventListener("submit", criarRotina);
