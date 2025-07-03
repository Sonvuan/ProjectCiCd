import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaCurrencyRateEditComponent } from './para-currency-rate-edit.component';

describe('ParaCurrencyRateEditComponent', () => {
  let component: ParaCurrencyRateEditComponent;
  let fixture: ComponentFixture<ParaCurrencyRateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParaCurrencyRateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParaCurrencyRateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
