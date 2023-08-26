import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasRecorrentesComponent } from './contas-recorrentes.component';

describe('ContasRecorrentesComponent', () => {
  let component: ContasRecorrentesComponent;
  let fixture: ComponentFixture<ContasRecorrentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasRecorrentesComponent]
    });
    fixture = TestBed.createComponent(ContasRecorrentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
