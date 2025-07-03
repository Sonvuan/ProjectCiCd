import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaCurrencyRateListComponent } from './para-currency-rate-list.component';

describe('ParaCurrencyRateListComponent', () => {
  let component: ParaCurrencyRateListComponent;
  let fixture: ComponentFixture<ParaCurrencyRateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParaCurrencyRateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParaCurrencyRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
