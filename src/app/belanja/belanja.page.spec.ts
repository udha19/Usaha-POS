import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BelanjaPage } from './belanja.page';

describe('BelanjaPage', () => {
  let component: BelanjaPage;
  let fixture: ComponentFixture<BelanjaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BelanjaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
