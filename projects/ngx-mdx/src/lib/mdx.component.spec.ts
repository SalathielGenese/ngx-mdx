import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MdxComponent} from './mdx.component';
import {Component, Type} from '@angular/core';

async function render<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({imports: [component]}).compileComponents();
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}

describe('MdxComponent', () => {
  it('should remove original text node with markdown', async () => {
    @Component({
      template: `
        <article ngxMdx>Hello **Word**!</article>`,
      imports: [MdxComponent],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.outerHTML).not.toContain('Hello **Word**!');
  });

  it('should replace with markdown processed text', async () => {
    @Component({
      template: `
        <article ngxMdx>Hello **Word**!</article>`,
      imports: [MdxComponent],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>Hello <strong>Word</strong>!</p>\n');
  });
});

// TODO: try detecting inlining on ndxMdx host element (that'd be awesome)
