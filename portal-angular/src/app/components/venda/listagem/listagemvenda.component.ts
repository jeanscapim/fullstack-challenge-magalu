import { Component, OnInit, Input } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../models/venda/venda';
import { LojaService } from '../../../services/loja.service';
import { Loja } from '../../../models/loja/loja';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;

@Component({
    selector: 'app-listagemvenda',
    templateUrl: '../../../template/venda/listagem/listagemvenda.html'
})
export class ListagemVendaComponent implements OnInit {
    vendas: Venda[] = [];
    q: string;
    @Input() lojas_id: number;
    loja: Loja;
    loja_id: number;

    constructor(
        private service: VendaService,
        private serviceLoja: LojaService,
        private route: ActivatedRoute,
        private router: Router
    ) { 
        this.loja = new Loja();
    }

    ngOnInit() {
        this.route.params
            .map(params => params['lojas_id'])
            .subscribe((lojas_id) => {
                this.loja_id = lojas_id;
                this.getLoja(lojas_id)
                    .then(loja => this.loja = loja)
                    .catch(error => console.error(error));
            });
            
        this.getVendas();
    }

    getLoja(lojas_id: number): Promise<Loja> {
        return new Promise((resolve, reject) => {
            this.serviceLoja.getLoja(lojas_id)
                .subscribe(loja => {
                    resolve(loja);
                }, error => reject(error));
        });
    }

    getVendas() {
        this.service.getVendas(this.loja_id)
            .subscribe(vendas => {
                this.vendas = vendas;
            }, error => console.log(error));
    }

    buscarVendas(q: string, event) {
        event.preventDefault();
        this.service.buscarVendas(q, this.loja_id)
            .subscribe(vendas => {
                this.vendas = vendas;
            }, error => console.log(error));
    }

    removeVenda(venda: Venda, event) {
        event.preventDefault();
        swal({
            title: `Deseja remover a venda (${venda.descricao_produto})?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                this.service.deleteVendas(venda)
                    .subscribe(() => {
                        swal(
                            'Removido!',
                            `Venda (${venda.descricao_produto}) removida com sucesso.`,
                            'success'
                        );
                        this.getVendas();
                    }, error => {
                        let message = '';
                        if (error.status === 500)
                            message = `Não foi possível excluir a venda (${venda.descricao_produto})`
                        else message = error.text();

                        swal({
                            title: `Erro ao excluir a venda.`,
                            text: message,
                            type: "error",
                            confirmButtonText: "OK"
                        });
                    });
            }
        });
    }
}