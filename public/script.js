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

    // 1. Captura o formulário correto usando o ID novo que colocamos no HTML
    const formEscola = document.getElementById('formCadastroEscola');

    // Só roda o código se o formulário realmente existir nesta página atual
    if (formEscola) {
        formEscola.addEventListener('submit', async (event) => {
            
            // 2. PRIMEIRA COISA: Para o comportamento padrão do botão (evita recarregar a tela)
            event.preventDefault(); 
            // 3. Coleta os valores digitados de forma segura
            try {
                const dados = {
                    nomeFantasia: document.getElementById('nome_fantasia').value,
                    razaoSocial: document.getElementById('razao_social').value,
                    cnpj: document.getElementById('cnpj').value,
                    codigoInep: document.getElementById('codigo_inep').value,
                    tipoGestao: document.getElementById('tipo_gestao').value,
                    email: document.getElementById('email').value,
                    telefone: document.getElementById('telefone').value,
                    fk_id_endereco: document.getElementById('cep').value
                };

                // 4. Dispara a requisição direto para a sua rota CORRETA (sem o "s" no final)
                const resposta = await fetch('/escolas/cadastrar-escola', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert('Cadastrado com sucesso!');
                    formEscola.reset(); // Limpa a tela após salvar
                } else {
                    alert('Erro: ' + (resultado.erro || 'Falha no cadastro'));
                }

            } catch (erro) {
                console.error("Erro interno no envio:", erro);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});