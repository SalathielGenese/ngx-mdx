import {render} from './render.fixture.spec';
import {MdxComponent} from '../public-api';
import {Component} from '@angular/core';

describe('MdxComponent', () => {
  it('should remove original text node with markdown', async () => {
    @Component({
      template: `
        <article ngxMdx>Hello **World**!</article>`,
      imports: [MdxComponent],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.outerHTML).not.toContain('Hello **World**!');
  });

  it('should replace with markdown processed text', async () => {
    @Component({
      template: `
        <article ngxMdx>Hello **World**!</article>`,
      imports: [MdxComponent],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>Hello <strong>World</strong>!</p>\n');
  });

  it('should replace with markdown processed text, even in nested HTML element', async () => {
    @Component({
      template: `
        <article ngxMdx>A <a href="#">friendly hello **World**</a>!</article>`,
      imports: [MdxComponent],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>A</p>\n<a href=\"#\"><p>friendly hello <strong>World</strong></p>\n</a><p>!</p>\n');
  });

  it('should stop on tree nodes when component boundary is auto detected', async () => {
    @Component({
      template: `
        <span><ng-content></ng-content></span>`,
      selector: 'ngx-test',
    })
    class TestComponent {
    }
    @Component({
      template: `
        <article ngxMdx>A friendly <ngx-test>hello **World**</ngx-test>!</article>`,
      imports: [MdxComponent, TestComponent],
      selector: 'ngx-super-test',
    })
    class SuperTestComponent {
    }

    const fixture = await render(SuperTestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>A friendly</p>\n<ngx-test><span>hello **World**</span></ngx-test><p>!</p>\n');
  });

  it('should stop on tree nodes when component boundary is auto detected', async () => {
    @Component({
      template: `
        <ng-content></ng-content>`,
      selector: 'ngx-test',
    })
    class TestComponent {
    }
    @Component({
      template: `
        <article ngxMdx>A friendly <ngx-test>hello **World**</ngx-test>!</article>`,
      imports: [MdxComponent, TestComponent],
      selector: 'ngx-super-test',
    })
    class SuperTestComponent {
    }

    const fixture = await render(SuperTestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>A friendly</p>\n<ngx-test><p>hello <strong>World</strong></p>\n</ngx-test><p>!</p>\n');
  });
});

// TODO: try detecting inlining on ndxMdx host element (that'd be awesome)
