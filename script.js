console.log("JavaScript dos looks carregado!");

let looks = JSON.parse(localStorage.getItem("mycloset_looks")) || [];
let roupas = JSON.parse(localStorage.getItem("mycloset_roupas")) || [];

const formulario = document.getElementById("form-look");
const listaLooks = document.getElementById("lista-looks");
const feedback = document.getElementById("feedback-looks");

// Salvar os looks no navegador
function salvarLooks() {
    localStorage.setItem("mycloset_looks", JSON.stringify(looks));
}

// Mostrar mensagens
function mostrarFeedback(mensagem, tipo) {
    feedback.textContent = mensagem;
    feedback.className = "alert mt-3 mb-0 alert-" + tipo;
}

// Cadastrar um look
function cadastrarLook(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome-look").value.trim();
    const peca1 = document.getElementById("peca1").value;
    const peca2 = document.getElementById("peca2").value;
    const peca3 = document.getElementById("peca3").value;

    if (!nome || !peca1 || !peca2 || !peca3) {
        mostrarFeedback("Preencha todos os campos!", "warning");
        return;
    }

    const novoLook = {
        id: Date.now(),
        nome: nome,
        pecas: [peca1, peca2, peca3]
    };

    looks.push(novoLook);

    salvarLooks();
    mostrarLooks();

    formulario.reset();

    mostrarFeedback("Look cadastrado com sucesso!", "success");
}

// Mostrar os looks cadastrados
function mostrarLooks() {
    listaLooks.innerHTML = "";

    if (looks.length === 0) {
        listaLooks.innerHTML =
            '<p class="text-center text-secondary">Você ainda não cadastrou nenhum look.</p>';
        return;
    }

    looks.forEach(function(look) {
        const card = document.createElement("div");
        card.className = "card p-3 mb-3";

        const titulo = document.createElement("h5");
        titulo.textContent = look.nome;
        titulo.className = "titulo-secao";

        const pecas = document.createElement("p");
        pecas.textContent = "Peças: " + look.pecas.join(", ");

        const botao = document.createElement("button");
        botao.className = "btn btn-outline-danger btn-sm";
        botao.textContent = "Remover look";

        botao.addEventListener("click", function() {
            removerLook(look.id);
        });

        card.appendChild(titulo);
        card.appendChild(pecas);
        card.appendChild(botao);

        listaLooks.appendChild(card);
    });
}

// Remover um look
function removerLook(id) {
    looks = looks.filter(function(look) {
        return look.id !== id;
    });

    salvarLooks();
    mostrarLooks();

    mostrarFeedback("Look removido com sucesso!", "success");
}

// Evento do formulário
formulario.addEventListener("submit", cadastrarLook);

// Mostrar os looks ao abrir a página
mostrarLooks();