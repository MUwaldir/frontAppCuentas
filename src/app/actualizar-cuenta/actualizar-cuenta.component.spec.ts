import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCuentaComponent } from './actualizar-cuenta.component';

describe('ActualizarCuentaComponent', () => {
  let component: ActualizarCuentaComponent;
  let fixture: ComponentFixture<ActualizarCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarCuentaComponent]
    });
    fixture = TestBed.createComponent(ActualizarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
