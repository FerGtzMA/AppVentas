import { Component, AfterViewInit, viewChild, ViewChild, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from '../../../../Interfaces/producto';
import { ProductoService } from '../../../../Services/producto.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit, AfterViewInit{
  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones'];
  dataInicio: Producto[] = [];
  dataListaProductos =  new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _utilidadService: UtilidadService){
    
  }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  obtenerProducto(){
    this._productoService.lista().subscribe({
      next: (data) => {
        if(data.status) {
          this.dataListaProductos.data =  data.value;
          console.log('Datos cargados', data.value);
        }
        else 
          this._utilidadService.mostrarAlerta("No se encontraron productos", "Opps");
      },
      error: (e) => {
        console.log("Hay error en la funcion de obtener productos");
      }
    });
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoProducto(){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerProducto();
      }
    });
  }

  editarProducto(producto: Producto){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerProducto();
      }
    });
  }

  eliminarProducto(producto: Producto){
    Swal.fire({
      title: "¿Desea eliminar el producto?",
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoService.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadService.mostrarAlerta("El usuario fue eliminado", "Listo");
              this.obtenerProducto();
            }else{
              this._utilidadService.mostrarAlerta("No se pudo eliminar el usuario", "Error");
            }
          },
          error: (e) => {}
        });
      }
    });
  }
}
