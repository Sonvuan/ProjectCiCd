import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaCurrencyRateCreateComponent } from './para-currency-rate-create.component';

describe('ParaCurrencyRateCreateComponent', () => {
  let component: ParaCurrencyRateCreateComponent;
  let fixture: ComponentFixture<ParaCurrencyRateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParaCurrencyRateCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParaCurrencyRateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
