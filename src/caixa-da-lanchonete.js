class CaixaDaLanchonete {
    //Definição da classe com um construtor que inicializa os itens do cardápio e
    //as formas de pagamento com suas respectivas propriedades.
    constructor() {
        
        //Armazena o cardápio da lanchonete em um objeto com código, descrição e valor.
        
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };

        //Armazena as formas de pagamento da lanchonete, com código, descrição, taxa ou desconto.

        this.formasDePagamento = {
            dinheiro: { descricao: 'dinheiro', desconto: 0.05 },
            debito: { descricao: 'debito' },
            credito: { descricao: 'credito', taxa: 0.03 },
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        //Verifica se a forma de pagamento é válida e se há no mínimo 1 item no carrinho de compra
        if (!this.formasDePagamento[formaDePagamento]) {
            return 'Forma de pagamento inválida!';
        }
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Inicializa as variáveis 'total' e 'extras', para armazenar o valor total da compra e
        // rastrear os itens extras, respectivamente.
        // Cria duas variáveis booleanas para rastrear se há sanduíche ou café no carrinho.

        let total = 0;
        const extras = {};
        let temSanduiche = false;
        let temCafe = false;

        // O loop for ... of itera sobre cada item da array itens.

        for (const item of itens) {

            //Divide a string em duas partes, o código do item e a quantidade, 
            // atribuindo esses valores às variáveis codigo e quantidade
            const [codigo, quantidade] = item.split(',');

            //Cria uma condição para caso a quantidade de um item for zero.
            if (parseInt(quantidade) === 0) {
                return 'Quantidade inválida!';
            }
            //Cria uma condição para caso o código do item não esteja no cardápio.
            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }
            // Se o código do item não for algum dos dois extras, o cálculo do total
            // vai ser feito normalmente multiplicando o valor pela quantidade.
            if (codigo !== 'chantily' && codigo !== 'queijo') {
                total += this.cardapio[codigo].valor * parseInt(quantidade);
                
                // Se o código do item for igual a 'sanduiche' ou 'cafe', as variáveis 
                // booleanas serão definidas como true.
                if (codigo === 'sanduiche') {
                    temSanduiche = true;
                } else if (codigo === 'cafe') {
                    temCafe = true;
                }
            } 
            //Se o item for um extra, a quantidade de extras vai ser atualizada no objeto 'extras'.
            else {
                if (extras[codigo]) {
                    extras[codigo] += parseInt(quantidade);
                } else {
                    extras[codigo] = parseInt(quantidade);
                }
            }
        }
        // Caso haja 'chantily' e não haja 'café' no carrinho, retorna uma mensagem de erro.
        if (extras['chantily'] && !extras['cafe'] && !temCafe) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        // Caso haja 'queijo' e não haja 'sanduiche' no carrinho, retorna uma mensagem de erro.
        if (extras['queijo'] && !temSanduiche) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        // Um loop que itera sobre o objeto 'extras' para calcular o valor dos itens extras
        // multiplicando o valor de cada extra pela quantidade correspondente e adicionando ao 'total'.
        for (const extra in extras) {
            total += this.cardapio[extra].valor * extras[extra];
        }

        // Aplica do desconto caso o pagamento seja em dinheiro e a taxa caso sejo seja no crédito.
        if (formaDePagamento === 'dinheiro') {
            total *= (1 - this.formasDePagamento.dinheiro.desconto);
        } else if (formaDePagamento === 'credito') {
            total *= (1 + this.formasDePagamento.credito.taxa);
        } else if (formaDePagamento === 'debito') {
            total *= (1);
        }

        // Retorna o valor total como uma string no formato "R$ X,XX".
        
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
