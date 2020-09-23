import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorDialogComponent } from './debtor-dialog.component';

describe('DebtorDialogComponent', () => {
  let component: DebtorDialogComponent;
  let fixture: ComponentFixture<DebtorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
