import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdxComponent } from './mdx.component';
import {Component} from '@angular/core';

@Component({
  selector: 'with-mdx',
  imports: [MdxComponent],
  template: `<article ngx-jokeaside-mdx>
        # mdx works!
      </article>`
})
export class WithMdxComponent {
}

describe('MdxComponent', () => {
  let component: MdxComponent;
  let fixture: ComponentFixture<MdxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [WithMdxComponent, MdxComponent]}).compileComponents();
    fixture = TestBed.createComponent(WithMdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should contain "mdx works" text', () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).outerHTML).toContain(' # mdx works! ');
  });
});
