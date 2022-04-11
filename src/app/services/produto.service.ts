import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Produto } from "../models/produtos";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{

    
    constructor(private httpClient: HttpClient) {

    }

    create(url: string, produto: Produto): Observable<any>{
        return this.httpClient.post(url, produto);
    }

    GetById(id: number, url: string): Observable<any> {
        let newUrl = `${url}/${id}`;
        return this.httpClient.get<any>(newUrl);
      }
    
      GetProdutos(url: string): Observable<any> {
        return this.httpClient.get<any>(url);
      }
    
      Update(url: string, produto: Produto): Observable<any> {
        const newUrl = `${url}/${produto.id}`;
        return this.httpClient.put<any>(newUrl, produto);
      }
    
      Delete(url: string, id: number): Observable<any> {
        let newUrl = `${url}/${id}`;
        return this.httpClient.delete<any>(newUrl);
      }
}