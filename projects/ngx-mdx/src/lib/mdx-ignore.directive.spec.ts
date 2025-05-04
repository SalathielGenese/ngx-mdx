import {render} from './render.fixture.spec';
import {MdxComponent} from './mdx.component';
import {Component} from '@angular/core';
import {MdxIgnoreDirective} from './mdx-ignore.directive';

describe('MdxInlineDirective', () => {
  it('should remove original text node with markdown', async () => {
    @Component({
      template: `
        <article ngxMdx>Hello <button ngxMdxIgnore>**World**</button>!</article>`,
      imports: [MdxComponent, MdxIgnoreDirective],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p>Hello</p>\n<button ngxmdxignore="">**World**</button><p>!</p>\n');
  });
});
