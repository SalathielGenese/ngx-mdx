import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MdxComponent} from './mdx.component';
import {Component} from '@angular/core';


describe('MdxComponent', () => {
  let component: WithMdxComponent;
  let fixture: ComponentFixture<WithMdxComponent>;

  @Component({
    imports: [MdxComponent],
    selector: 'ngx-with-mdx',
    preserveWhitespaces: true,
    template: `
      <article ngx-mdx>
        # How {{ name }} works!

        This explains how to set up and work with {{ name }}!
      </article>`
  })
  class WithMdxComponent {
    name = 'mdx';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [WithMdxComponent, MdxComponent]}).compileComponents();
    fixture = TestBed.createComponent(WithMdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should contain "mdx works" text', async () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).querySelector('article')?.innerHTML).toBe([
        `<h1>How ${component.name} works!</h1>`,
        `<p>This explains how to set up and work with ${component.name}!</p>`,
        '\n'
      ].join(''));

    component.name = 'MDX';
    fixture.detectChanges();

    expect((fixture.elementRef.nativeElement as HTMLElement).querySelector('article')?.innerHTML).toBe([
      `<h1>How ${component.name} works!</h1>`,
      `<p>This explains how to set up and work with ${component.name}!</p>`,
      '\n'
    ].join(''));
  });
});
