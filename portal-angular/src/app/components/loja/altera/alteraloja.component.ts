import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LojaService } from '../../../services/loja.service';
import { Loja } from '../../../models/loja/loja';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;
declare var $: any;

@Component({
    selector: 'app-alteraloja',
    templateUrl: '../../../template/loja/altera/alteraloja.html'
})
export class AlteraLojaComponent implements OnInit {
    @Input() id: number;
    lojaForm: FormGroup;
    loja: Loja;

    constructor(
        formBuilder: FormBuilder,
        private service: LojaService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        /* Validação de formulário. */
        this.lojaForm = formBuilder.group({
            codigo: ['', Validators.required],
            descricao: ['', Validators.required],
            cep: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8)
            ])],
        });

        this.loja = new Loja();
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.getLoja(id)
                    .then(loja => this.loja = loja)
                    .catch(error => console.error(error));
            });
    }

    getLoja(id: number): Promise<Loja> {
        return new Promise((resolve, reject) => {
            this.service.getLoja(id)
                .subscribe(loja => {
                    resolve(loja);
                }, error => reject(error));
        });
    }

    alteraLoja(event) {
        event.preventDefault();
        if (this.lojaForm.invalid) {
            for (let i in this.lojaForm.controls) {
                (<any>this.lojaForm.controls[i])._touched = true;
            }

            /* Alerta o usuário em caso de falha de campos obrigatórios. */
            swal({
                title: `Falha ao alterar a loja!`,
                text: 'Os campos informados com * são obrigatórios',
                type: "error",
                confirmButtonText: "OK"
            });
        }
        else {
            this.service.putLojas(this.loja)
                .subscribe(loja => {
                    /* Alerta o usuário em caso de sucesso em cadastro. */
                    swal({
                        title: `Loja alterada!`,
                        text: `Loja (${loja.descricao}) alterada com sucesso!`,
                        type: "success",
                        confirmButtonText: "OK"
                    });

                    this.router.navigate(['lojas', 'listagem']);
                }, error => {
                    let message = '';
                    if (error.status === 500) message = 'Falha no servidor'
                    else message = error.json();

                    var textMessage = '';
                    var arrayMessage = $.map(message, function (el) { return el });
                    arrayMessage.forEach(function (res) {
                        textMessage += res.msg + '<br>';
                    });

                    /* Alerta usuário exibindo os erros de validação da api de lojas. */
                    swal({
                        title: `Falha ao alterar a loja (${this.loja.descricao})`,
                        html: textMessage,
                        type: "error",
                        confirmButtonText: "OK"
                    });
                });
        }
    }

    hasError(key: string): boolean {
        return (this.lojaForm.controls[key].touched && this.lojaForm.controls[key].invalid);
    }
}