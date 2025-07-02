document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Destaque do Link Ativo no Menu Lateral ---
    const highlightActiveLink = () => {
        // Obtém o nome do arquivo da URL atual (ex: index.html, propriedades.html)
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.sidebar nav ul li a');

        navLinks.forEach(link => {
            // Obtém o nome do arquivo do atributo 'href' do link
            const linkPath = link.getAttribute('href').split('/').pop();

            if (linkPath === currentPath) {
                link.classList.add('active'); // Adiciona a classe 'active' para estilização no CSS
            } else {
                link.classList.remove('active'); // Remove a classe de outros links
            }
        });
    };

    highlightActiveLink(); // Chama a função para destacar o link quando a página carrega

    // --- 2. Lidar com o Envio de Formulários (Simulado) ---
    // Seleciona todos os formulários na página
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio real do formulário e o recarregamento da página

            // Tenta encontrar o título mais próximo para a mensagem de alerta
            const formTitleElement = form.closest('main') ? form.closest('main').querySelector('h2') : null;
            const formTitle = formTitleElement ? formTitleElement.innerText : 'este formulário';

            alert(`Dados do "${formTitle}" enviados com sucesso (simulado)!`);

            // Limpa o formulário após o "envio"
            form.reset();

            // Você pode adicionar lógica aqui para:
            // - Enviar os dados via AJAX/Fetch API para um servidor
            // - Atualizar uma lista ou tabela na página sem recarregar
            // - Exibir uma mensagem de sucesso mais elaborada
        });
    });

    // --- 3. Funcionalidade Específica: Alerta de Estoque Baixo (na página de Estoque) ---
    // Verifica se estamos na página de estoque
    if (window.location.pathname.includes('estoque.html')) {
        const estoqueTableBody = document.querySelector('#main-content table tbody'); // Assegure-se de que a tabela tem um ID ou selecione corretamente

        if (estoqueTableBody) {
            const linhasEstoque = estoqueTableBody.querySelectorAll('tr');

            linhasEstoque.forEach(linha => {
                const quantidadeElement = linha.children[1]; // Supondo que a quantidade é a segunda coluna (índice 1)
                const alertaMinimoElement = linha.children[3]; // Supondo que o alerta mínimo é a quarta coluna (índice 3)

                if (quantidadeElement && alertaMinimoElement) {
                    const quantidade = parseFloat(quantidadeElement.innerText);
                    // Remove texto " kg", " L" etc. para converter em número
                    const alertaMinimoText = alertaMinimoElement.innerText.replace(/[^0-9.,]/g, '').replace(',', '.');
                    const alertaMinimo = parseFloat(alertaMinimoText);

                    if (!isNaN(quantidade) && !isNaN(alertaMinimo) && quantidade < alertaMinimo) {
                        linha.classList.add('low-stock'); // Adiciona classe para estilização CSS
                    }
                }
            });
        }
    }

    // --- 4. Funcionalidade Específica: Cálculo de Saldo Financeiro (na página Financeiro) ---
    // Verifica se estamos na página financeira
    if (window.location.pathname.includes('financeiro.html')) {
        const financeiroTableBody = document.querySelector('#main-content table tbody');
        const saldoAtualElement = document.getElementById('saldoAtual');

        if (financeiroTableBody && saldoAtualElement) {
            let saldoTotal = 0;

            const linhasFinanceiras = financeiroTableBody.querySelectorAll('tr');
            linhasFinanceiras.forEach(linha => {
                const tipoLancamentoElement = linha.children[1]; // Coluna do Tipo (Receita/Despesa)
                const valorLancamentoElement = linha.children[3]; // Coluna do Valor

                if (tipoLancamentoElement && valorLancamentoElement) {
                    const tipo = tipoLancamentoElement.innerText.trim();
                    // Remove "R$", "." e substitui "," por "." para converter em número
                    let valor = parseFloat(valorLancamentoElement.innerText.replace('+', '').replace('-', '').replace('R$', '').replace('.', '').replace(',', '.'));

                    if (!isNaN(valor)) {
                        if (tipo === 'Receita') {
                            saldoTotal += valor;
                        } else if (tipo === 'Despesa') {
                            saldoTotal -= valor;
                        }
                    }
                }
            });
            // Formata o saldo para moeda brasileira
            saldoAtualElement.innerText = saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }

    console.log('Script JavaScript do Sistema Rural carregado e executado em todas as páginas!');
});