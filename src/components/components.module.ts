import { NgModule } from '@angular/core';
import { NavegadorUtnComponent } from './navegador-utn/navegador-utn';
import { ComponentsClienteComponent } from './components-cliente/components-cliente';
import { ComponentsEncuestaClienteComponent } from './components-encuesta-cliente/components-encuesta-cliente';
@NgModule({
	declarations: [NavegadorUtnComponent,
    ComponentsClienteComponent,
    ComponentsEncuestaClienteComponent],
	imports: [],
	exports: [NavegadorUtnComponent,
    ComponentsClienteComponent,
    ComponentsEncuestaClienteComponent]
})
export class ComponentsModule {}
