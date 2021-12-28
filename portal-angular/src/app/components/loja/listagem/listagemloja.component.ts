import { Component, OnInit } from '@angular/core';
import { LojaService } from '../../../services/loja.service';
import { Loja } from '../../../models/loja/loja';

declare var swal: any;

@Component({
    selector: 'app-listagemloja',
    templateUrl: '../../../template/loja/listagem/listagemloja.html'
})
export class ListagemLojaComponent implements OnInit {
    lojas: Loja[] = [];
    q: string;

    constructor(
        private service: LojaService
    ) { }

    ngOnInit() {
        this.getLojas();
    }

    getLojas(){
        this.service.getLojas()
        .subscribe(lojas => {
            this.lojas = lojas;
        }, error => console.log(error));
    }
    
    buscarLojas(q: string, event){
        event.preventDefault();
        this.service.buscarLojas(q)
        .subscribe(lojas => {
            this.lojas = lojas;
        }, error => console.log(error));
    }
    
    removeLoja(loja: Loja, event) {
        event.preventDefault();
        swal({
            title: `Deseja remover a loja (${loja.descricao})?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                this.service.deleteLojas(loja)
                    .subscribe(() => {
                        swal(
                            'Removido!',
                            `Loja (${loja.descricao}) removida com sucesso.`,
                            'success'
                        );
                        this.getLojas();
                    }, error => {
                        let message = '';
                        if (error.status === 500)
                            message = `Não foi possível excluir a loja (${loja.descricao})`
                        else message = error.text();

                        swal({
                            title: `Erro ao excluir a loja.`,
                            text: message,
                            type: "error",
                            confirmButtonText: "OK"
                        });
                    });
            }
        });
    }
}