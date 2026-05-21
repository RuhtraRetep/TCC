// Função do Menu Hamburguer
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Executa os códigos assim que a página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {

    // Fecha o menu ao clicar em um link (para mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('navMenu');
            if (menu) {
                menu.classList.remove('active');
            }
        });
    });

    // 1. Captura o formulário correto usando o ID novo do TCC
    const formEscola = document.getElementById('formCadastroEscola') || document.getElementById('meuFormulario');

    // Só roda o código se o formulário realmente existir nesta página atual
    if (formEscola) {
        formEscola.addEventListener('submit', async (event) => {
            
            // 2. Para o comportamento padrão do botão (evita recarregar a tela)
            event.preventDefault(); 
            
            // 3. Coleta os valores digitados de forma segura
            try {
                const dados = {
                    nomeFantasia: document.getElementById('nome_fantasia')?.value || document.getElementById('nomeFantasia')?.value,
                    razaoSocial: document.getElementById('razao_social')?.value || "",
                    cnpj: document.getElementById('cnpj').value,
                    codigoInep: document.getElementById('codigo_inep')?.value || null,
                    tipoGestao: document.getElementById('tipo_gestao')?.value || "",
                    email: document.getElementById('email')?.value || null,
                    telefone: document.getElementById('telefone')?.value || null,
                    fk_id_endereco: document.getElementById('cep')?.value || "1"
                };

                // 4. Dispara a requisição direto para a sua rota unificada do Back-end
                const resposta = await fetch('/escolas/cadastro-escola', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert('Cadastrado com sucesso!');
                    formEscola.reset(); // Limpa a tela após salvar
                } else {
                    alert('Erro: ' + (resultado.erro || resultado.mensagem || 'Falha no cadastro'));
                }

            } catch (erro) {
                console.error("Erro interno no envio:", erro);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});

// =================================================
// SISTEMA DE PREVISÃO DE SENSORES (Mantido da main)
// =================================================

const ambientes = [];

// Adicionar ambiente
function adicionar() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value.toUpperCase();

    if (!nome || !tipo) {
        alert("Preencha todos os campos");
        return;
    }

    ambientes.push({ nome, tipo });

    // Limpa os inputs
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";

    renderizar();
}

// Renderiza lista de ambientes
function renderizar() {
    const lista = document.getElementById("listaAmbientes");
    if (!lista) return;

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
    if (!div) return;

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