import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CevizAccountIdComponent } from './nano-account-id.component';

describe('CevizAccountIdComponent', () => {
  let component: CevizAccountIdComponent;
  let fixture: ComponentFixture<CevizAccountIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CevizAccountIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CevizAccountIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
