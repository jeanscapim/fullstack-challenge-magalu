import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../models/venda/venda';

declare var swal: any;

@Component({
    selector: 'app-buscarloja',
    templateUrl: '../../../template/buscar/loja/buscarloja.html'
})
export class BuscarLojaComponent implements OnInit {
    vendas: Venda[] = [];
    q: string;
    cep: number;

    constructor(
        private service: VendaService
    ) { }

    ngOnInit() {
        this.encontrarVendas();
    }

    encontrarVendas() {
        this.service.encontrarVendas(this.q, this.cep)
            .subscribe(vendas => {
                this.vendas = vendas;
            }, error => console.log(error));
    }
}