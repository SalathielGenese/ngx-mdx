import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MdxComponent} from './mdx.component';
import {Component} from '@angular/core';


describe('MdxComponent', () => {
  let container: HTMLElement;
  let component: WithMdxComponent;
  let fixture: ComponentFixture<WithMdxComponent>;

  @Component({
    imports: [MdxComponent],
    selector: 'ngx-with-mdx',
    preserveWhitespaces: true,
    template: `
      <article ngx-mdx>
        # How {{ name }} works!

        This explains how to **set up** and _work with_ {{ name }}!
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

    container = (fixture.elementRef.nativeElement as HTMLElement).querySelector('article')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove original Markdown markers', () => {
    expect(container).not.toContain('# How mdx works!');
    expect(container).not.toContain('# How {{ name }} works!');
    expect(container).not.toContain('This explains how to set up and work with mdx!');
    expect(container).not.toContain('This explains how to set up and work with {{ name }}!');
  });

  it('should render markdown text', async () => {
    expect(container.innerHTML.trim()).toBe([
      `<h1>How ${component.name} works!</h1>`,
      `<p>This explains how to <strong>set up</strong> and <em>work with</em> ${component.name}!</p>`,
    ].join(''));
  });

  it('should update rendered markdown text when Angular re-renders', async () => {
    component.name = 'MDX';
    fixture.detectChanges();

    expect(container.innerHTML.trim()).toBe([
      `<h1>How ${component.name} works!</h1>`,
      `<p>This explains how to <strong>set up</strong> and <em>work with</em> ${component.name}!</p>`,
    ].join(''));
  });
});
