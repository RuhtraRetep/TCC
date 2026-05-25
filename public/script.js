// Função do Menu Hamburguer
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Executa os códigos assim que a página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {

    // Fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('navMenu');

            if (menu) {
                menu.classList.remove('active');
            }
        });
    });

    // Captura formulário
    const formEscola = document.getElementById('formCadastroEscola');

    // Só executa se existir
    if (formEscola) {

        formEscola.addEventListener('submit', async (event) => {

            event.preventDefault();

            try {

                // Dados do formulário
                const dados = {
                    nomeFantasia: document.getElementById('nome_fantasia').value,
                    razaoSocial: document.getElementById('razao_social').value,
                    cnpj: document.getElementById('cnpj').value,
                    codigoInep: document.getElementById('codigo_inep').value || null,
                    tipoGestao: document.getElementById('tipo_gestao').value,
                    email: document.getElementById('email').value || null,

                    // Endereço
                    logradouro: document.getElementById('logradouro').value,
                    numero: document.getElementById('numero').value || null,
                    bairro: document.getElementById('bairro').value,
                    cidade: document.getElementById('cidade').value,
                    cep: document.getElementById('cep').value,

                    //Telefone 
                    pais: document.getElementById('telefone_pais').value,
                    ddd: document.getElementById('telefone_ddd').value,
                    numeroTel: document.getElementById('telefone_numero').value,
                    tipo: document.getElementById('telefone_tipo').value,
                    principal: document.getElementById('telefone_principal').value,
                    ativo: document.getElementById('telefone_ativo').value
                };

                // Requisição
                const resposta = await fetch('/escolas/cadastro-escola', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const resultado = await resposta.json();

                // Sucesso
                if (resposta.ok) {

                    alert('Cadastrado com sucesso!');
                    formEscola.reset();

                } else {

                    alert(
                        'Erro: ' +
                        (
                            resultado.erro ||
                            resultado.mensagem ||
                            'Falha no cadastro'
                        )
                    );
                }

            } catch (erro) {

                console.error('Erro interno:', erro);
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


    let telCount = 1;

    function adicionarTelefone() {

        telCount++;
        const id = 'telefone-' + telCount;

        const div = document.createElement('div');
        div.className = 'telefone-item';
        div.id = id;

        div.innerHTML = `
                <div class="telefone-header">
                    <span class="telefone-label">Telefone #${telCount}</span>
                    <button type="button" class="btn-remove-tel" onclick="removeTelefone('${id}')" title="Remover">✕</button>
                </div>
                <div class="form-grid telefone-grid">
                    <div class="form-group">
                        <label>País (DDI)</label>
                        <input type="text" name="tel_pais[]" maxlength="4" placeholder="+55" value="+55">
                    </div>
                    <div class="form-group">
                        <label>DDD</label>
                        <input type="text" name="tel_ddd[]" maxlength="3" placeholder="Ex: 28">
                    </div>
                    <div class="form-group">
                        <label>Número</label>
                        <input type="text" name="tel_numero[]" maxlength="9" placeholder="Ex: 999999999">
                    </div>
                    <div class="form-group">
                        <label>Tipo</label>
                        <select name="tel_tipo[]">
                            <option value="Fixo">Fixo</option>
                            <option value="Celular">Celular</option>
                        </select>
                    </div>
                    <div class="form-group tel-bool-group">
                        <label>Principal</label>
                        <div class="toggle-wrapper">
                            <label class="toggle">
                                <input type="checkbox" name="tel_principal[]" value="1">
                                <span class="toggle-track"><span class="toggle-thumb"></span></span>
                            </label>
                            <span class="toggle-caption">Não</span>
                        </div>
                    </div>
                    <div class="form-group tel-bool-group">
                        <label>Ativo</label>
                        <div class="toggle-wrapper">
                            <label class="toggle">
                                <input type="checkbox" name="tel_ativo[]" value="1" checked>
                                <span class="toggle-track"><span class="toggle-thumb"></span></span>
                            </label>
                            <span class="toggle-caption">Sim</span>
                        </div>
                    </div>
                </div>
            `;

        document.getElementById('telefones-container').appendChild(div);
        div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function removeTelefone(id) {
        const el = document.getElementById(id);
        if (el && document.querySelectorAll('.telefone-item').length > 1) {
            el.classList.add('tel-removing');
            setTimeout(() => el.remove(), 250);
        }
    }


}