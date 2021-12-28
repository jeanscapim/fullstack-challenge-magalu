import { Injectable } from '@angular/core';
import { HttpClientHelper } from "../helpers/http.helper";
import { Venda } from "../models/venda/venda";
import { environment } from "../../environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VendaService {
    client: HttpClientHelper;

    constructor(http: Http) {
        this.client = new HttpClientHelper(http);
    }

    getVenda(id: number): Observable<Venda> {
        let url = `${environment.API_VENDA}/vendas/venda/${id}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    getVendas(id: number): Observable<Venda[]> {
        let url = `${environment.API_VENDA}/vendas/${id}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    buscarVendas(q: string, id: number): Observable<Venda[]> {
        let url = `${environment.API_VENDA}/vendas/buscar/${q}/${id}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    encontrarVendas(q: string, cep: number): Observable<Venda[]> {
        let url = `${environment.API_VENDA}/vendas/encontrar/${q}/${cep}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    postVendas(venda: Venda): Observable<Venda> {
        let url = `${environment.API_VENDA}/vendas/venda`;
        return this.client.post(url, venda)
            .map(res => res.json());
    }

    putVendas(venda: Venda): Observable<Venda> {
        let url = `${environment.API_VENDA}/vendas/venda/${venda.id}`;
        return this.client.put(url, venda)
            .map(res => res.json());
    }

    deleteVendas(venda: Venda): Observable<Venda> {
        let url = `${environment.API_VENDA}/vendas/venda/${venda.id}`;
        return this.client.delete(url)
            .map(res => res.json());
    }
}