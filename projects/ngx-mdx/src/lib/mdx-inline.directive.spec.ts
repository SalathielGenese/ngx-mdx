import {MdxInlineDirective} from './mdx-inline.directive';
import {render} from './render.fixture.spec';
import {MdxComponent} from '../public-api';
import {Component} from '@angular/core';

describe('MdxInlineDirective', () => {
  it('should replace with markdown processed text, even in nested HTML element', async () => {
    @Component({
      template: `
        <article ngxMdx>A <a href="#" ngxMdxInline>friendly hello **World**</a>!</article>`,
      imports: [MdxComponent, MdxInlineDirective],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>A</p>\n<a href=\"#\" ngxmdxinline="">friendly hello <strong>World</strong></a><p>!</p>\n');
  });
});

// TODO: try detecting inlining on ndxMdx host element (that'd be awesome)
