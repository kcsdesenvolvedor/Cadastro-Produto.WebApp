import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  produtos: any[]=[];
  displayedColumns = ['Id', 'Nome', 'Estoque', 'Valor', 'dataInclusaoProduto', 'action']
  data: any;

  constructor(
    private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetProdutos();
  }

  GetProdutos(){
    this.produtoService.GetProdutos(`${Global.BASE_URL_API}/produto`).subscribe({
      next: produtoReturn => {
        this.produtos = produtoReturn;
        console.log(produtoReturn);
      }
    })
  }

  create(){
    this.router.navigateByUrl("produto", {state: {title: 'Adicionar Produto', btnTitle: "Adicionar", operation: 'create'}});
  }

  update(id: number) {
    const produto = this.produtos.filter(m => m.id === id)[0];
    this.router.navigateByUrl("produto", { state: { title: "Atualizar produto", btnTitle: "Atualizar", operation: 'update', produto: produto } })
  }

  delete(id: number){
    const produto = this.produtos.filter(m => m.id === id)[0];
    this.router.navigateByUrl("produto", { state: { title: "Deletar produto", btnTitle: "Deletar", operation: 'delete', produto: produto } })
  }

}
