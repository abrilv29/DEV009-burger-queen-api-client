import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeseroOrdenesComponent } from './mesero-ordenes.component';

describe('MeseroOrdenesComponent', () => {
  let component: MeseroOrdenesComponent;
  let fixture: ComponentFixture<MeseroOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeseroOrdenesComponent]
    });
    fixture = TestBed.createComponent(MeseroOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
