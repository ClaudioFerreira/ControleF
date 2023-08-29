import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasTableComponent } from './contas-table.component';

describe('ContasTableComponent', () => {
  let component: ContasTableComponent;
  let fixture: ComponentFixture<ContasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasTableComponent],
    });
    fixture = TestBed.createComponent(ContasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
