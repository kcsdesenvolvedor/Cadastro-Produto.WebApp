import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { CadProdutoComponent } from "./pages/produtos/cad-produto/cad-produto.component";
import { ListProdutoComponent } from "./pages/produtos/list-produto/list-produto.component";

const routes: Routes = [
    {path: '', component: ListProdutoComponent},
    {path: 'produto', component: CadProdutoComponent}
]

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule] 
})
export class AppRoutingModule {

}