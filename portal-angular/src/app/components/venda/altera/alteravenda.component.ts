import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../models/venda/venda';
import { LojaService } from '../../../services/loja.service';
import { Loja } from '../../../models/loja/loja';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;
declare var $: any;

@Component({
    selector: 'app-alteravenda',
    templateUrl: '../../../template/venda/altera/alteravenda.html'
})
export class AlteraVendaComponent implements OnInit {
    @Input() id: number;
    vendaForm: FormGroup;
    venda: Venda;
    loja: Loja;
    lojas_id: number;

    constructor(
        formBuilder: FormBuilder,
        private service: VendaService,
        private serviceLoja: LojaService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        /* Validação de formulário. */
        this.vendaForm = formBuilder.group({
            codigo_produto: ['', Validators.required],
            descricao_produto: ['', Validators.required],
            valor_produto: ['', Validators.required],
        });

        this.venda = new Venda();
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.getVenda(id)
                    .then(venda => this.venda = venda)
                    .catch(error => console.error(error));
            });

        this.route.params
            .map(params => params['lojas_id'])
            .subscribe((lojas_id) => {
                this.venda.lojas_id = lojas_id;
                this.lojas_id = lojas_id;
                this.getLoja(lojas_id)
                    .then(loja => this.loja = loja)
                    .catch(error => console.error(error));
            });
    }

    getLoja(lojas_id: number): Promise<Loja> {
        return new Promise((resolve, reject) => {
            this.serviceLoja.getLoja(lojas_id)
                .subscribe(loja => {
                    resolve(loja);
                }, error => reject(error));
        });
    }

    getVenda(id: number): Promise<Venda> {
        return new Promise((resolve, reject) => {
            this.service.getVenda(id)
                .subscribe(venda => {
                    resolve(venda);
                }, error => reject(error));
        });
    }

    alteraVenda(event) {
        event.preventDefault();
        if (this.vendaForm.invalid) {
            for (let i in this.vendaForm.controls) {
                (<any>this.vendaForm.controls[i])._touched = true;
            }

            /* Alerta o usuário em caso de falha de campos obrigatórios. */
            swal({
                title: `Falha ao alterar a venda!`,
                text: 'Os campos informados com * são obrigatórios',
                type: "error",
                confirmButtonText: "OK"
            });
        }
        else {
            this.service.putVendas(this.venda)
                .subscribe(venda => {
                    /* Alerta o usuário em caso de sucesso em cadastro. */
                    swal({
                        title: `Venda alterada!`,
                        text: `venda (${venda.descricao_produto}) alterada com sucesso!`,
                        type: "success",
                        confirmButtonText: "OK"
                    });

                    this.router.navigate(['vendas', 'listagem', this.lojas_id]);
                }, error => {
                    let message = '';
                    if (error.status === 500) message = 'Falha no servidor'
                    else message = error.json();

                    var textMessage = '';
                    var arrayMessage = $.map(message, function (el) { return el });
                    arrayMessage.forEach(function (res) {
                        textMessage += res.msg + '<br>';
                    });

                    /* Alerta usuário exibindo os erros de validação da api de vendas. */
                    swal({
                        title: `Falha ao alterar a venda (${this.venda.descricao_produto})`,
                        html: textMessage,
                        type: "error",
                        confirmButtonText: "OK"
                    });
                });
        }
    }

    hasError(key: string): boolean {
        return (this.vendaForm.controls[key].touched && this.vendaForm.controls[key].invalid);
    }
}