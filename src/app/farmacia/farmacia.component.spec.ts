import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaListComponent } from './farmacia.component';

describe('FarmaciaComponent', () => {
  let component: FarmaciaListComponent;
  let fixture: ComponentFixture<FarmaciaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmaciaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmaciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
