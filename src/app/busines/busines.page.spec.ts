import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinesPage } from './busines.page';

describe('BusinesPage', () => {
  let component: BusinesPage;
  let fixture: ComponentFixture<BusinesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
