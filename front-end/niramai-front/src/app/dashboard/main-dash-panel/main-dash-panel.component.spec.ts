import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashPanelComponent } from './main-dash-panel.component';

describe('MainDashPanelComponent', () => {
  let component: MainDashPanelComponent;
  let fixture: ComponentFixture<MainDashPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDashPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
