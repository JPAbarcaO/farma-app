import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFarmaciaList } from '../models/IFarmaciaList.model';
import { IFarmaciaTurno } from '../models/IFarmaciaTurnos.model';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  private apiUrl = 'https://midas.minsal.cl/farmacia_v2/WS/getLocales.php';

  private apiUrlTurnos = 'https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php';

  constructor(private http: HttpClient) {}

  getFarmacias(): Observable<IFarmaciaList[]> {
    return this.http.get<IFarmaciaList[]>(this.apiUrl);
  }

  getFarmaciasTurnos(): Observable<IFarmaciaTurno[]> {
    return this.http.get<IFarmaciaTurno[]>(this.apiUrlTurnos);
  }
}
