// Função do Menu Hamburguer
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {

    link.addEventListener('click', () => {

        document.getElementById('navMenu').classList.remove('active');
    });
});

// FORMULÁRIO
const formulario = document.getElementById('meuFormulario');

if (formulario) {

    formulario.addEventListener('submit', async (event) => {

        event.preventDefault();

        try {

            const resposta = await fetch('/escolas/cadastro-escola', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    nomeFantasia: document.getElementById('nomeFantasia').value,
                    cnpj: document.getElementById('cnpj').value

                })
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                alert('Cadastrado com sucesso!');

            } else {

                alert('Erro: ' + resultado.erro);
            }

        } catch (erro) {

            alert('Não foi possível conectar ao servidor.');
        }
    });
}

// ===============================
// SISTEMA DE PREVISÃO DE SENSORES
// ===============================

const ambientes = [];

// Adicionar ambiente
function adicionar() {

    const nome = document.getElementById("nome").value;

    const tipo = document.getElementById("tipo").value.toUpperCase();

    if (!nome || !tipo) {

        alert("Preencha todos os campos");

        return;
    }

    ambientes.push({
        nome,
        tipo
    });

    // Limpa os inputs
    document.getElementById("nome").value = "";

    document.getElementById("tipo").value = "";

    renderizar();
}

// Renderiza lista de ambientes
function renderizar() {

    const lista = document.getElementById("listaAmbientes");

    lista.innerHTML = "";

    ambientes.forEach((a, i) => {

        lista.innerHTML += `
            <div class="card">
                ${i + 1}. ${a.nome} (${a.tipo})
            </div>
        `;
    });
}

// Previsão de sensores
function preverSensores(ambientes) {

    const sensores = [];

    const regras = {

        SALA: ["ENERGIA"],

        BANHEIRO: ["AGUA", "ENERGIA"],

        PATIO: ["ENERGIA"],

        QUADRA: ["AGUA", "ENERGIA"],

        LABORATORIO: ["ENERGIA"],

        COZINHA: ["AGUA", "ENERGIA"]
    };

    ambientes.forEach((ambiente) => {

        const tipos = regras[ambiente.tipo] || ["ENERGIA"];

        tipos.forEach((sensor) => {

            sensores.push({

                tipo: sensor,

                localizacao: ambiente.nome
            });
        });
    });

    return {

        totalSensores: sensores.length,

        sensores
    };
}

// Processar sensores
function processar() {

    const resultado = preverSensores(ambientes);

    const div = document.getElementById("resultadoSensores");

    div.innerHTML = `
        <h3>Total de Sensores: ${resultado.totalSensores}</h3>
    `;

    resultado.sensores.forEach((sensor) => {

        div.innerHTML += `
            <div class="card">
                Sensor de <strong>${sensor.tipo}</strong>
                → ${sensor.localizacao}
            </div>
        `;
    });
}