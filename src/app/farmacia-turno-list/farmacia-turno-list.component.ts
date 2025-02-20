import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FarmaciaService } from '../services/farmacia.service';
import { IFarmaciaTurno } from '../models/IFarmaciaTurnos.model';

@Component({
  selector: 'app-farmacia-turno-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './farmacia-turno-list.component.html',
})
export class FarmaciaTurnoListComponent implements OnInit {
  farmacias: IFarmaciaTurno[] = [];
  farmaciasFiltradas: IFarmaciaTurno[] = [];
  comunas: string[] = [];
  comunasFiltradas: string[] = [];
  comunaSeleccionada: string = '';

  constructor(private farmaciaService: FarmaciaService) {}

  ngOnInit() {
    this.getFarmaciasTurno();
  }

  getFarmaciasTurno() {
    this.farmaciaService
      .getFarmaciasTurnos()
      .subscribe((data: IFarmaciaTurno[]) => {
        // Ordenamos las farmacias por nombre antes de asignarlas
        this.farmacias = data.sort((a, b) =>
          a.local_nombre.localeCompare(b.local_nombre, 'es', {
            sensitivity: 'base',
          })
        );

        // Extraemos y ordenamos las comunas alfabéticamente, eliminando duplicados
        this.comunas = [
          ...new Set(this.farmacias.map((f) => f.comuna_nombre)),
        ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

        this.comunasFiltradas = [...this.comunas]; // Inicializa con todas las comunas
      });
  }

  filtrarComunas() {
    const input = this.comunaSeleccionada.toLowerCase();
    this.comunasFiltradas = this.comunas.filter((comuna) =>
      comuna.toLowerCase().includes(input)
    );

    // Si la comuna seleccionada coincide con una existente, filtrar farmacias
    if (this.comunas.includes(this.comunaSeleccionada)) {
      this.filtrarPorComuna();
    } else {
      this.farmaciasFiltradas = []; // No mostrar farmacias si la comuna no existe
    }
  }

  filtrarPorComuna() {
    this.farmaciasFiltradas = this.comunaSeleccionada
      ? this.farmacias.filter(
          (f) => f.comuna_nombre === this.comunaSeleccionada
        )
      : [];
  }

  generarGoogleMapsLink(farmacia: IFarmaciaTurno): string {
    if (farmacia.local_lat && farmacia.local_lng) {
      return `https://www.google.com/maps?q=${farmacia.local_lat},${farmacia.local_lng}&hl=es&z=16`;
    } else {
      const direccionLimpia = this.limpiarDireccion(farmacia.local_direccion);
      const direccionFormateada = encodeURIComponent(direccionLimpia.trim());
      return `https://www.google.com/maps/search/?q=${direccionFormateada}`;
    }
  }

  limpiarDireccion(direccion: string): string {
    return direccion.replace(/(\d+)[A-Za-z]$/, '$1'); // 🔥 Reemplaza letras al final de un número
  }
}
