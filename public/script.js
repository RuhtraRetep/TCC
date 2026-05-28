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

        //VERIFICAÇÃO INPUT NOME FANTASIA
        inputNomeFantasia = document.getElementById('nome_fantasia');

        inputNomeFantasia.addEventListener('blur', (evento) => {
            const valorAtual = inputNomeFantasia.value.trim();
            const tamanho = valorAtual.length;

            if (tamanho > 100) {
                inputNomeFantasia.value = "";
                inputNomeFantasia.placeholder = "Nome Fantasia muito grande"
                inputNomeFantasia.style.borderColor = "red";
            }

            else if (tamanho <= 2) {
                inputNomeFantasia.value = "";
                inputNomeFantasia.placeholder = "Nome Fantasia muito pequeno"
                inputNomeFantasia.style.borderColor = "red";
            }

            else {
                inputNomeFantasia.style.borderColor = "";
            }
        });

        //VERIFICAÇÃO INPUT RAZÃO SOCIAL
        inputRazaoSocial = document.getElementById('razao_social');

        inputRazaoSocial.addEventListener('blur', (evento) => {
            const valorAtual = inputRazaoSocial.value.trim();
            const tamanho = valorAtual.length;

            if (tamanho > 60) {
                inputRazaoSocial.value = "";
                inputRazaoSocial.placeholder = "Nome Fantasia muito grande"
                inputRazaoSocial.style.borderColor = "red";
            }

            else if (tamanho < 1) {
                inputRazaoSocial.value = "";
                inputRazaoSocial.placeholder = "Nome Fantasia muito pequeno"
                inputRazaoSocial.style.borderColor = "red";
            }

            else {
                inputRazaoSocial.style.borderColor = "";
            }
        });

        //VERIFICAÇÃO INPUT CNPJ

        inputCnpj = document.getElementById('cnpj');

        inputCnpj.addEventListener('blur', (evento) => {
            const valorAtual = inputCnpj.value.trim();

            if (!/^\d{14}$/.test(valorAtual)) {
                inputCnpj.value = "";
                inputCnpj.placeholder = "CNPJ Inválido"
                inputCnpj.style.borderColor = "red";
            }

            else {
                inputCnpj.style.borderColor = "";
            }
        });

        //VERIFICAÇÃO INPUT CÓDIGO INEP

        inputInep = document.getElementById('codigo_inep');

        inputInep.addEventListener('blur', (evento) => {
            const valorAtual = inputInep.value.trim();

            if (!/^\d{8}$/.test(valorAtual)) {
                inputInep.value = "";
                inputInep.placeholder = "Código Inep Inválido"
                inputInep.style.borderColor = "red";
            }

            else {
                inputInep.style.borderColor = "";
            }
        });

        //VERIFICAÇÃO INPUT EMAIL

        const inputEmail = document.getElementById('email');

        inputEmail.addEventListener('invalid', (evento) => {
            evento.preventDefault();
            inputEmail.style.borderColor = "red";
            const container = inputEmail.parentElement;

            // Verifica se já não criamos o aviso antes para não duplicar
            if (!document.getElementById('erro-email-msg')) {
                const mensagemErro = document.createElement('span');
                mensagemErro.id = 'erro-email-msg';
                mensagemErro.style.color = 'red';
                mensagemErro.style.fontSize = '12px';
                mensagemErro.textContent = ' ❌ Por favor, insira um e-mail válido com @ e domínio.';

                // Agora sim o container existe e vai receber o span
                container.appendChild(mensagemErro);
            }

            // Faz o formulário ir até o input
            inputEmail.scrollIntoView({
                behavior: 'smooth', // Deixa a rolagem suave e bonita
                block: 'center'     // Centraliza o campo na tela do usuário
            });
        });

        inputEmail.addEventListener('input', () => {
            inputEmail.style.borderColor = "";
            inputEmail.style.backgroundColor = "";

            const msg = document.getElementById('erro-email-msg');
            if (msg) {
                msg.remove();
            }
        });


        //VERIFICAÇÃO INPUT CEP

        const inputCep = document.getElementById('cep');
        const inputLogradouro = document.getElementById('logradouro');
        const inputBairro = document.getElementById('bairro');
        const inputCidade = document.getElementById('cidade');

        inputCep.addEventListener('blur', async (evento) => {

            // Pega o valor e limpa pontos/traços
            const valorAtual = inputCep.value.trim().replace(/\D/g, '');

            // SE O CAMPO ESTIVER VAZIO (O cara apagou o CEP)
            if (valorAtual === "") {
                inputCep.style.borderColor = "";

                // Libera os campos para digitação manual e limpa tudo
                inputLogradouro.readOnly = false;
                inputBairro.readOnly = false;
                inputCidade.readOnly = false;

                inputLogradouro.value = "";
                inputBairro.value = "";
                inputCidade.value = "";

                limparCamposEndereco();
                return; // Para a execução aqui
            }

            // SE O CEP FOR INVÁLIDO (Menos ou mais de 8 números)
            if (!/^\d{8}$/.test(valorAtual)) {
                inputCep.value = "";
                inputCep.placeholder = "CEP Inválido (8 dígitos)";
                inputCep.style.borderColor = "red";

                // LIBERA os campos 
                inputLogradouro.readOnly = false;
                inputBairro.readOnly = false;
                inputCidade.readOnly = false;
                //APAGA os campos
                inputLogradouro.value = "";
                inputBairro.value = "";
                inputCidade.value = "";

                limparCamposEndereco();
            }

            // SE O CEP TEM 8 NÚMEROS (Vai buscar na API)
            else {
                inputCep.style.borderColor = "";

                inputLogradouro.value = "Carregando...";
                inputBairro.value = "Carregando...";
                inputCidade.value = "Carregando...";

                try {
                    const resposta = await fetch(`https://viacep.com.br/ws/${valorAtual}/json/`);
                    const dados = await resposta.json();

                    if (!dados.erro) {
                        inputLogradouro.value = dados.logradouro;
                        inputBairro.value = dados.bairro;
                        inputCidade.value = dados.localidade;

                        // TRAVA pois a API achou o endereço certinho
                        inputLogradouro.readOnly = true;
                        inputBairro.readOnly = true;
                        inputCidade.readOnly = true;
                    } else {
                        // Formato certo, mas o CEP não existe
                        inputCep.value = "";
                        inputCep.placeholder = "CEP não encontrado";
                        inputCep.style.borderColor = "red";

                        // DESTRAVA pro cara não ficar preso
                        inputLogradouro.readOnly = false;
                        inputBairro.readOnly = false;
                        inputCidade.readOnly = false;

                        limparCamposEndereco();
                    }
                } catch (erro) {
                    console.error("Erro na API de CEP:", erro);

                    // DESTRAVA caso o serviço do ViaCEP caia
                    inputLogradouro.readOnly = false;
                    inputBairro.readOnly = false;
                    inputCidade.readOnly = false;

                    limparCamposEndereco();
                    alert("Erro ao conectar ao serviço de CEP. Digite o endereço manualmente.");
                }
            }
        });

        const inputNumeroEscola = document.getElementById('numero');

        inputNumeroEscola.addEventListener('blur', (evento) => {
            const valorAtual = inputNumeroEscola.value.trim();

            // Modificado para aceitar números de 1 a 5 dígitos de comprimento
            if (!/^\d{1,5}$/.test(valorAtual)) {
                inputNumeroEscola.value = "";
                inputNumeroEscola.placeholder = "Número inválido";
                inputNumeroEscola.style.borderColor = "red";
            } else {
                inputNumeroEscola.style.borderColor = "";
            }
        });

        const inputTelefonePais = document.getElementById('telefone_pais');

        inputTelefonePais.addEventListener('blur', (evento) => {
            const valorAtual = inputTelefonePais.value.trim();

            // Corrigido: Removido o '}' extra da regex
            if (!/^\d{2,3}$/.test(valorAtual)) {
                inputTelefonePais.value = "";
                inputTelefonePais.placeholder = "Código inválido";
                inputTelefonePais.style.borderColor = "red";
            } else {
                inputTelefonePais.style.borderColor = "";
            }
        });

        const inputTelefoneDDD = document.getElementById('telefone_ddd');

        inputTelefoneDDD.addEventListener('blur', (evento) => {
            // Corrigido: Agora lê o input correto (inputTelefoneDDD) e não o do país
            const valorAtual = inputTelefoneDDD.value.trim();

            // Corrigido: Removido o '}' extra da regex
            if (!/^\d{2}$/.test(valorAtual)) {
                inputTelefoneDDD.value = "";
                inputTelefoneDDD.placeholder = "DDD inválido";
                inputTelefoneDDD.style.borderColor = "red";
            } else {
                inputTelefoneDDD.style.borderColor = "";
            }
        });

        const inputTelefoneNumero = document.getElementById('telefone_numero');
        const selectTelefoneTipo = document.getElementById('telefone_tipo');

        let temporizador; // Variável para controlar o tempo fora do evento

        inputTelefoneNumero.addEventListener('input', (evento) => {
            const ehFixo = selectTelefoneTipo.value === 'Fixo';
            inputTelefoneNumero.maxLength = ehFixo ? 8 : 9;

            // Limpa o temporizador antigo toda vez que o usuário aperta uma tecla
            clearTimeout(temporizador);

            // Cria um novo temporizador de 400ms
            temporizador = setTimeout(() => {
                const valorAtual = inputTelefoneNumero.value.trim();
                const regexValidacao = ehFixo ? /^\d{8}$/ : /^\d{9}$/;

                if (!regexValidacao.test(valorAtual)) {
                    inputTelefoneNumero.value = "";
                    inputTelefoneNumero.placeholder = ehFixo ? "Fixo inválido (8 dígitos)" : "Celular inválido (9 dígitos)";
                    inputTelefoneNumero.style.borderColor = "red";
                } else {
                    inputTelefoneNumero.style.borderColor = "";
                }
            }, 400); // Tempo de espera em milissegundos (800ms)
        });

        formEscola.addEventListener('submit', async (event) => {

            event.preventDefault();

            try {

                // Dados do formulário
                const dados = {
                    nomeFantasia: document.getElementById('nome_fantasia').value.Trim(),
                    razaoSocial: document.getElementById('razao_social').value.Trim(),
                    cnpj: document.getElementById('cnpj').value.Trim(),
                    codigoInep: document.getElementById('codigo_inep').value.Trim() || null,
                    tipoGestao: document.getElementById('tipo_gestao').value.Trim(),
                    email: document.getElementById('email').value.Trim() || null,

                    // Endereço
                    logradouro: document.getElementById('logradouro').value.Trim(),
                    numero: document.getElementById('numero').value.Trim() || null,
                    bairro: document.getElementById('bairro').value.Trim(),
                    cidade: document.getElementById('cidade').value.Trim(),
                    cep: document.getElementById('cep').value.Trim(),

                    //Telefone 
                    pais: document.getElementById('telefone_pais').value.Trim(),
                    ddd: document.getElementById('telefone_ddd').value.Trim(),
                    numeroTel: document.getElementById('telefone_numero').value.Trim(),
                    tipo: document.getElementById('telefone_tipo').value.Trim(),
                    principal: document.getElementById('telefone_principal').value.Trim(),
                    ativo: document.getElementById('telefone_ativo').value.Trim()
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

/* ############### SENSORES ###############################*/

const ambientes = [
    {
        nome: 'Cozinha 01',
        tipo: 'COZINHA',
        agua: 0,
        energia: 0
    },
    {
        nome: 'Banheiro 01',
        tipo: 'BANHEIRO',
        agua: 0,
        energia: 0
    },
    {
        nome: 'Sala 01',
        tipo: 'SALA',
        agua: 0,
        energia: 0
    }
];

const consumoPorTipo = {
    SALA: { agua: 0, energia: 0.20 },
    LABORATORIO: { agua: 0, energia: 0.30 },
    PATIO: { agua: 0, energia: 0.08 },
    BANHEIRO: { agua: 0.15, energia: 0.10 },
    COZINHA: { agua: 0.20, energia: 0.25 },
    QUADRA: { agua: 0.05, energia: 0.12 }
};

function adicionarAmbiente() {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;

    if (!nome || !tipo) {
        alert('Preencha os campos');
        return;
    }

    ambientes.push({
        nome,
        tipo,
        agua: 0,
        energia: 0
    });

    document.getElementById('nome').value = '';
    document.getElementById('tipo').value = '';

    atualizarDashboard();
    atualizarHistorico();
}

function atualizarDashboard() {
    const dashboard = document.getElementById('dashboardAmbientes');

    dashboard.innerHTML = '';

    let totalAguaGeral = 0;
    let totalEnergiaGeral = 0;
    let totalGeral = 0;

    ambientes.forEach((ambiente) => {
        ambiente.agua = Number(ambiente.agua) || 0;
        ambiente.energia = Number(ambiente.energia) || 0;

        const regra = consumoPorTipo[ambiente.tipo] || {
            agua: 0,
            energia: 0.10
        };

        const consumoAgua = Math.random() * regra.agua;
        const consumoEnergia = Math.random() * regra.energia;

        ambiente.agua += consumoAgua;
        ambiente.energia += consumoEnergia;

        const total = ambiente.agua + ambiente.energia;

        totalAguaGeral += ambiente.agua;
        totalEnergiaGeral += ambiente.energia;
        totalGeral += total;

        dashboard.innerHTML += `
            <div class="gasto-card">
                <h3>${ambiente.nome}</h3>

                <p>
                    Água:
                    <strong>R$ ${ambiente.agua.toFixed(2)}</strong>
                </p>

                <p>
                    Energia:
                    <strong>R$ ${ambiente.energia.toFixed(2)}</strong>
                </p>

                <p>
                    Total:
                    <strong>R$ ${total.toFixed(2)}</strong>
                </p>
            </div>
        `;
    });

    dashboard.innerHTML += `
        <div class="gasto-card total-geral">
            <h2>TOTAL GERAL</h2>

            <p>
                Água:
                <strong>R$ ${totalAguaGeral.toFixed(2)}</strong>
            </p>

            <p>
                Energia:
                <strong>R$ ${totalEnergiaGeral.toFixed(2)}</strong>
            </p>

            <p>
                Total Final:
                <strong>R$ ${totalGeral.toFixed(2)}</strong>
            </p>
        </div>
    `;
}

function atualizarHistorico() {
    const tabela = document.getElementById('historicoTabela');

    tabela.innerHTML = '';

    ambientes.forEach((ambiente) => {
        const agua = Number(ambiente.agua) || 0;
        const energia = Number(ambiente.energia) || 0;
        const total = agua + energia;

        tabela.innerHTML += `
            <tr>
                <td>${ambiente.nome}</td>
                <td>R$ ${agua.toFixed(2)}</td>
                <td>R$ ${energia.toFixed(2)}</td>
                <td>R$ ${total.toFixed(2)}</td>
            </tr>
        `;
    });
}

function gerarPDF() {
    alert('Relatório PDF gerado!');
}

setInterval(() => {
    atualizarDashboard();
    atualizarHistorico();
}, 15000);

atualizarDashboard();
atualizarHistorico();