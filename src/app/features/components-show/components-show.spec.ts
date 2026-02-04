import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsShow } from './components-show';

describe('ComponentsShow', () => {
  let component: ComponentsShow;
  let fixture: ComponentFixture<ComponentsShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
