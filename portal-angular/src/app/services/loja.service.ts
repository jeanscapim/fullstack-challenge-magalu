import { Injectable } from "@angular/core";
import { HttpClientHelper } from "../helpers/http.helper";
import { Loja } from "../models/loja/loja";
import { environment } from "../../environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LojaService {
    client: HttpClientHelper;

    constructor(http: Http) {
        this.client = new HttpClientHelper(http);
    }

    getLoja(id: number): Observable<Loja> {
        let url = `${environment.API_LOJA}/lojas/loja/${id}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    getLojas(): Observable<Loja[]> {
        let url = `${environment.API_LOJA}/lojas`;
        return this.client.get(url)
            .map(res => res.json());
    }

    buscarLojas(q): Observable<Loja[]> {
        let url = `${environment.API_LOJA}/lojas/buscar/${q}`;
        return this.client.get(url)
            .map(res => res.json());
    }

    postLojas(loja: Loja): Observable<Loja> {
        let url = `${environment.API_LOJA}/lojas/loja`;
        return this.client.post(url, loja)
            .map(res => res.json());
    }

    putLojas(loja: Loja): Observable<Loja> {
        let url = `${environment.API_LOJA}/lojas/loja/${loja.id}`;
        return this.client.put(url, loja)
            .map(res => res.json());
    }

    deleteLojas(loja: Loja): Observable<Loja> {
        let url = `${environment.API_LOJA}/lojas/loja/${loja.id}`;
        return this.client.delete(url)
            .map(res => res.json());
    }
}