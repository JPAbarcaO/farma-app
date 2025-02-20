import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FarmaciaService } from '../services/farmacia.service';
import { IFarmaciaList } from '../models/IFarmaciaList.model';

@Component({
  selector: 'app-farmacia-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './farmacia.component.html',
})
export class FarmaciaListComponent implements OnInit {
  farmacias: IFarmaciaList[] = [];
  farmaciasFiltradas: IFarmaciaList[] = [];
  comunas: string[] = [];
  comunasFiltradas: string[] = [];
  comunaSeleccionada: string = '';

  constructor(private farmaciaService: FarmaciaService) {}

  ngOnInit() {
    this.getFarmacias();
  }

  getFarmacias() {
    this.farmaciaService.getFarmacias().subscribe((data) => {
      // Ordenamos las farmacias por nombre antes de asignarlas
      this.farmacias = data.sort((a, b) =>
        a.local_nombre.localeCompare(b.local_nombre, 'es', {
          sensitivity: 'base',
        })
      );

      // Ordenamos las comunas alfabéticamente y eliminamos duplicados
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

  generarGoogleMapsLink(
    lat: string | null,
    lng: string | null,
    direccion: string
  ): string {
    if (direccion) {
      // Si NO hay coordenadas, hacemos una búsqueda por dirección
      const direccionLimpia = this.limpiarDireccion(direccion);
      const direccionFormateada = encodeURIComponent(direccionLimpia.trim());
      return `https://www.google.com/maps/search/?q=${direccionFormateada}`;
    } else {
      // Si tenemos coordenadas, generamos un enlace con marcador
      return `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=16`;
    }
  }

  limpiarDireccion(direccion: string): string {
    return direccion.replace(/(\d+)[A-Za-z]$/, '$1'); // 🔥 Reemplaza letras al final de un número
  }
}
