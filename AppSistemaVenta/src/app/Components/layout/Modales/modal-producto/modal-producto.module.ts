import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../Reutilizable/shared/shared.module";
import { ModalProductoComponent } from "./modal-producto.component";

@NgModule({
    declarations: [
      ModalProductoComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [
      
    ]
  })
  export class ModalProductoModule { }