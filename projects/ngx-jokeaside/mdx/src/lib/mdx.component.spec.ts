import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdxComponent } from './mdx.component';

describe('MdxComponent', () => {
  let component: MdxComponent;
  let fixture: ComponentFixture<MdxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
