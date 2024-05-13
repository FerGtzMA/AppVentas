import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

// Trabajar con el formato de las fechas
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

// import * as XLSX from 'xlsx'

import { Reporte } from '../../../../Interfaces/reporte';
import { VentaService } from '../../../../Services/venta.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';

export const MY_DATA_FORMATS = {
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class ReporteComponent implements AfterViewInit{
  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro', 'numeroVenta', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProdcuto'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTotal! : MatPaginator;

  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
    private _utilidadService: UtilidadService
  ){
    this.formularioFiltro = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTotal;
  }

  buscarVentas(){
    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format('DD/MM/YYYY');

    if (_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date') {
      this._utilidadService.mostrarAlerta("Debe ingresar ambas fechas", "Aviso");
      console.log("Que pedi con esto");
      
      return;
    }

    this._ventaService.reporte(_fechaInicio, _fechaFin).subscribe({
      next: (data) => {
        if (data.status) {
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value;
        }else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadService.mostrarAlerta("No se encontraron datos", "Error");
        }
      },
      error: (e) => {
        console.log("Error en buscarVentas en el reporte.");
        
      }
    });
  }

  /* exportarExcel(){
    const wb = XLSX.utils.
  } */
}
