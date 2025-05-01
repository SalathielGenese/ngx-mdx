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

  it('template should contain one child', () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).children.length).toBe(1);
  });

  it('template should contain one <p> child', () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).children.item(0)?.tagName).toBe('P');
  });

  it('template should contain one <p> child with "mdx works" text', () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).children.item(0)?.innerHTML).toBe(' mdx works! ');
  });
});
