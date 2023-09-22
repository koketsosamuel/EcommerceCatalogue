import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSelectorComponent } from './categories-selector.component';

describe('CategoriesSelectorComponent', () => {
  let component: CategoriesSelectorComponent;
  let fixture: ComponentFixture<CategoriesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesSelectorComponent]
    });
    fixture = TestBed.createComponent(CategoriesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
