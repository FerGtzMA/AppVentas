import { Component, AfterViewInit, viewChild, ViewChild, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, AfterViewInit{
  columnasTabla: string[] = ['nombreCompleto', 'correo', 'rolDescripcion', 'estado', 'acciones'];
  
  //Inicializamos el origen de los datos
  dataInicio: Usuario[] = [];
  dataListaUsuarios =  new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _utilidadService: UtilidadService
  ){}

  obtenerUsuario(){
    this._usuarioService.lista().subscribe({
      next: (data) => {
        if(data.status) {
          this.dataListaUsuarios.data =  data.value;
          console.log('Datos cargados', data.value);
        }
        else 
          this._utilidadService.mostrarAlerta("No se encontraron usuarios", "Opps");
      },
      error: (e) => {
        console.log("Hay error en la funcion de obtener usuarios");
      }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerUsuario();
      }
    });
  }

  editarUsuario(usuario: Usuario){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerUsuario();
      }
    });
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: "¿Desea eliminar el usuario?",
      text: usuario.nombreCompleto,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._usuarioService.eliminar(usuario.idUsuario).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadService.mostrarAlerta("El usuario fue eliminado", "Listo");
              this.obtenerUsuario();
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