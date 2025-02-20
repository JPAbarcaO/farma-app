import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmaciaTurnoListComponent } from '../farmacia-turno-list/farmacia-turno-list.component';
import { FarmaciaListComponent } from '../farmacia/farmacia.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FarmaciaListComponent, FarmaciaTurnoListComponent], // ✅ IMPORTAR AMBOS COMPONENTES
  templateUrl: './index.component.html',
})
export class IndexComponent {
  selectedComponent: 'farmacia' | 'turno' = 'farmacia'; // Controla qué vista mostrar

  setView(view: 'farmacia' | 'turno') {
    this.selectedComponent = view;
  }
}
