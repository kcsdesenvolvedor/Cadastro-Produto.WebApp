import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produtos';
import { ProdutoService } from 'src/app/services/produto.service';
import { Global } from 'src/shared/Global';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})
export class CadProdutoComponent implements OnInit {

  data: any;
  produtoForm: FormGroup;
  produto: Produto;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private snackBarRef: MatSnackBar
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras.state;
   }

  ngOnInit(): void {
    if (this.data.operation == "create") {
      this.createForm();
      this.produtoForm.reset();
    }else if(this.data.operation == "update"){
      this.createForm();
      this.produtoForm.setValue(this.data.produto);
    }else if(this.data.operation == 'delete'){
      this.createFormDisable();
      this.produtoForm.setValue(this.data.produto);
    }
  }

  onSubmit(){
    if (this.data.operation == 'create') {
      this.createProduto();
    } else if(this.data.operation == 'update') {
      this.updateProduto();
    } else if(this.data.operation == 'delete'){
      this.deleteProduto(this.data.produto.id);
    }
  }

  createForm(){
    this.produtoForm = new FormGroup({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      dataInclusaoProduto: new FormControl()
    })
  }

  createFormDisable(){
    this.produtoForm = new FormGroup({
      id: new FormControl(),
      nome: new FormControl({ value: '', disabled: true }),
      estoque: new FormControl({ value: '', disabled: true }),
      valor: new FormControl({ value: '', disabled: true }),
      dataInclusaoProduto: new FormControl()
    })
  }

  createProduto(){
    if(this.produtoForm.valid){
      this.produto = Object.assign({}, this.produtoForm.value);
      this.produto.estoque = parseInt(this.produtoForm.controls['estoque'].value);
      this.produto.valor = parseFloat(this.produtoForm.controls['valor'].value);

      this.produtoService.create(`${Global.BASE_URL_API}/produto`, this.produto).subscribe({
        next: produtoReturn => {
          this.snackBarRef.open(produtoReturn.message, 'Fechar');
          this.router.navigateByUrl('');
        },
        error: produtoError => {
          this.snackBarRef.open(produtoError.error, 'Fechar');
        }
      });
    }else{
      this.snackBarRef.open('Preencha todos os campos', 'Fechar');
    }
  }

  updateProduto(){
    if(this.produtoForm.valid){
      this.produto = Object.assign({}, this.produtoForm.value);
      this.produto.estoque = parseInt(this.produtoForm.controls['estoque'].value);
      this.produto.valor = parseFloat(this.produtoForm.controls['valor'].value);

      this.produtoService.Update(`${Global.BASE_URL_API}/produto`, this.produto).subscribe({
        next: produtoReturn => {
          this.snackBarRef.open(produtoReturn.message, 'Fechar');
          this.router.navigateByUrl('');
        },
        error: produtoError => {
          this.snackBarRef.open(produtoError.error, 'Fechar');
        }
      });
    }else{
      this.snackBarRef.open('Preencha todos os campos', 'Fechar');
    }
  }

  deleteProduto(id: number){
    this.produtoService.Delete(`${Global.BASE_URL_API}/produto`, id).subscribe({
      next: produtoReturn => {
        this.snackBarRef.open(produtoReturn.message, 'Fechar');
        this.router.navigateByUrl('');
      },
      error: produtoError => {
        this.snackBarRef.open(produtoError.message, 'Fechar');
        this.router.navigateByUrl('');
      }
    })
  }

  cancel(){
    this.router.navigateByUrl('');
  }

}
