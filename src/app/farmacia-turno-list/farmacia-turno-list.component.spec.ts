import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaTurnoListComponent } from './farmacia-turno-list.component';

describe('FarmaciaTurnoListComponent', () => {
  let component: FarmaciaTurnoListComponent;
  let fixture: ComponentFixture<FarmaciaTurnoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmaciaTurnoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmaciaTurnoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
