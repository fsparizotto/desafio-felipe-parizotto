class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];

        this.formasPagamento = ['dinheiro', 'debito', 'credito'];
        this.itensPrincipais = ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2'];
        this.itensExtras = ['chantily', 'queijo'];
    }

    validarFormaPagamento(formaPagamento) {
        return this.formasPagamento.includes(formaPagamento);
    }

    validarItem(codigo) {
        return this.cardapio.some(item => item.codigo === codigo);
    }

    calcularDescontoAcréscimo(total, formaPagamento) {
        if (formaPagamento === 'dinheiro') {
            return total * 0.95; // Desconto de 5% para pagamento em dinheiro
        } else if (formaPagamento === 'credito') {
            return total * 1.03; // Acréscimo de 3% para pagamento a crédito
        }
        return total;
    }

    calcularValorDaCompra(formaPagamento, itens) {
        if (!this.validarFormaPagamento(formaPagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const itensSelecionados = [];

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!this.validarItem(codigo)) {
                return 'Item inválido!';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            const menuItem = this.cardapio.find(menuItem => menuItem.codigo === codigo);
            total += menuItem.valor * quantidade;
            itensSelecionados.push(codigo);
        }

        for (const itemExtra of this.itensExtras) {
            if (itensSelecionados.includes(itemExtra)) {
                const itemPrincipal = itemExtra === 'chantily' ? 'cafe' : 'sanduiche';
                if (!itensSelecionados.includes(itemPrincipal)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }
        }

        total = this.calcularDescontoAcréscimo(total, formaPagamento);

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };