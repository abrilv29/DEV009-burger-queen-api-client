import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeseroPedidosComponent } from './mesero-pedidos.component';

describe('MeseroPedidosComponent', () => {
  let component: MeseroPedidosComponent;
  let fixture: ComponentFixture<MeseroPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeseroPedidosComponent]
    });
    fixture = TestBed.createComponent(MeseroPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
