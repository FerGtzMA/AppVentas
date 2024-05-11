import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../../Reutilizable/shared/shared.module';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { HistorialVentaComponent } from './Pages/historial-venta/historial-venta.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { VentaComponent } from './Pages/venta/venta.component';
import { ModalProductoComponent } from './Modales/modal-producto/modal-producto.component';
import { ModalProductoModule } from './Modales/modal-producto/modal-producto.module';
import { ModalUsuarioModule } from './Modales/modal-usuario/modal-usuario.module';
import { ModalDetalleVentaModule } from './Modales/modal-detalle-venta/modal-detalle-venta.module';

@NgModule({
  declarations: [
    UsuarioComponent,
    DashBoardComponent,
    HistorialVentaComponent,
    ProductoComponent,
    ReporteComponent,
    VentaComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ModalProductoModule,
    ModalUsuarioModule,
    ModalDetalleVentaModule
  ]
})
export class LayoutModule { }
