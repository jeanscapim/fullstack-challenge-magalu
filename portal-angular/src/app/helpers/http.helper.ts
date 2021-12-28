import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientHelper{
    headers: Headers;

    constructor(private http: Http){
        this.headers = new Headers();
    }

    /**
     * Adiciona o cabeçalho para cada requisição nas API's
     * @param {any} [params=[]] 
     * @memberof HttpClientHelper
     */
    setHeaders(params = []) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Cache-control', 'no-cache');
        this.headers.append('Cache-control', 'no-store');
        this.headers.append('Expires', '0');
        this.headers.append('Pragma', 'no-cache');
        
        params.forEach(param => {
          this.headers.append(param['key'], param['value']);
        });
    }

    getHeaders(): Headers {
        return this.headers;
    }

    /**
     * Executa uma requisição do tipo GET
     * @param {any} url 
     * @param {any} [params=[]] 
     * @returns 
     * @memberof HttpClientHelper
     */
    get(url, params = []): Observable<any> {
        this.setHeaders(params);
        return this.http.get(url, {headers: this.headers});
    }

    /**
     * Executa uma requisição do tipo POST
     * @param {any} url 
     * @param {any} data 
     * @returns {Observable<any>} 
     * @memberof HttpClient
     */
    post(url, data): Observable<any> {
        this.setHeaders([]);
        return this.http.post(url, data, {
            headers: this.headers
        });
    }

    /**
     * Executa uma requisição do tipo PUT
    * @param {any} url 
    * @param {any} data 
    * @returns {Observable<any>} 
    * @memberof HttpClient
    */
    put(url, data): Observable<any> {
        this.setHeaders([]);
        return this.http.put(url, data, {
            headers: this.headers
        });
    }

    /**
     * Executa uma requisição do tipo DELETE
     * @param {any} url 
     * @returns {Observable<any>} 
     * @memberof HttpClient
    */
    delete(url): Observable<any> {
        this.setHeaders([]);
        return this.http.delete(url, {
        headers: this.headers
        });
    }
}