import { Routes } from '@angular/router';
import { ListarVeiculosComponent } from './listar-veiculos/listar-veiculos.component';
import { AnunciarVeiculoComponent } from './anunciar-veiculo/anunciar-veiculo.component';

export const routes: Routes = [
    {path: 'anuncios', component: ListarVeiculosComponent},
    {path: '', redirectTo: '/anuncios', pathMatch: 'full'},
    {path: 'anunciar', component: AnunciarVeiculoComponent}
];
