const formulario = document.querySelector("#formulario");
const inputNome = document.querySelector("#nome");
const inputServico = document.querySelector("#servico");
const inputQuantidade = document.querySelector("#quantidade");
const resultado = document.querySelector("#resultado");

const servico = [
  { nome: "Formatação", preco: 120 },
  { nome: "Limpeza", preco: 80 },
  { nome: "Instalação", preco: 50 },
];

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const preco = Number(inputServico.value.trim());
  const quantidadeString = inputQuantidade.value.trim();
  const quantidade = Number(quantidadeString);

  resultado.classList.remove(
    "d-none",
    "alert-info",
    "alert-danger",
    "alert-success",
    "alert-warning",
  );

  if (
    nome === "" ||
    quantidadeString === "" ||
    !Number.isInteger(quantidade) ||
    quantidade <= 0
  ) {
    resultado.textContent = "Preencha todos os campos corretamente!";
    resultado.classList.add("alert-warning");
    return;
  }

  const total = calcularTotal(preco, quantidade);

  resultado.textContent = `Total: R$ ${total.toFixed(2)}`;

  resultado.classList.remove("alert-success");
});

function calcularTotal(preco, quantidade) {
  return preco * quantidade;
}
