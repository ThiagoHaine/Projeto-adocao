import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptPage } from './adopt.page';

describe('AdoptPage', () => {
  let component: AdoptPage;
  let fixture: ComponentFixture<AdoptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
