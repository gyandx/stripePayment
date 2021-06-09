import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleCardComponent } from './multiple-card.component';

describe('MultipleCardComponent', () => {
  let component: MultipleCardComponent;
  let fixture: ComponentFixture<MultipleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
