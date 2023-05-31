import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiMarketInfoComponent } from './thai-market-info.component';

describe('ThaiMarketInfoComponent', () => {
  let component: ThaiMarketInfoComponent;
  let fixture: ComponentFixture<ThaiMarketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThaiMarketInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiMarketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
