// Função do Menu Hamburguer
        function toggleMenu() {
            const menu = document.getElementById('navMenu');
            menu.classList.toggle('active');
        }

        // Fecha o menu ao clicar em um link (para mobile)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navMenu').classList.remove('active');
            });
        });

        document.getElementById('meuFormulario').addEventListener('submit', async (event) => {
        
        // 2. Para o comportamento padrão do botão (que seria recarregar a página)
        event.preventDefault(); 

        // 3. O botão faz o fetch disparar a requisição direto para a sua rota
        try {
            const resposta = await fetch('/escolas/cadastro-escola', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Escreva aqui as variáveis que pegam os valores dos seus inputs
                    nomeFantasia: document.getElementById('nomeFantasia').value,
                    cnpj: document.getElementById('cnpj').value,
                    // ... demais campos
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