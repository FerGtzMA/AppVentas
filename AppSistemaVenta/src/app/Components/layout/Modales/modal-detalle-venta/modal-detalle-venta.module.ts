import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../Reutilizable/shared/shared.module";
import { ModalDetalleVentaComponent } from "./modal-detalle-venta.component";

@NgModule({
    declarations: [
      ModalDetalleVentaComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [
      
    ]
  })
  export class ModalDetalleVentaModule { }