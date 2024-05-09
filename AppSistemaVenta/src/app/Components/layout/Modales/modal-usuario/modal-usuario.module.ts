import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../Reutilizable/shared/shared.module";
import { ModalUsuarioComponent } from "./modal-usuario.component";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
      ModalUsuarioComponent
    ],
    imports: [
      SharedModule

    ],
    exports: [
      ModalUsuarioComponent
    ]
  })
  export class ModalUsuarioModule { }