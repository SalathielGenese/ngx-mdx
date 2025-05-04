import {MdxComponent, MdxIgnoreDirective} from '../public-api';
import {render} from './render.fixture.spec';
import {Component} from '@angular/core';

describe('MdxInlineDirective', () => {
  it('should ignore paths marked for ignoring', async () => {
    @Component({
      template: `
        <article ngxMdx>_Hello_ <button ngxMdxIgnore>**World**</button>!</article>`,
      imports: [MdxComponent, MdxIgnoreDirective],
      selector: 'ngx-test',
    })
    class TestComponent {
    }

    const fixture = await render(TestComponent);
    expect(fixture.nativeElement.childNodes[0].innerHTML).toBe('<p><em>Hello</em></p>\n<button ngxmdxignore="">**World**</button><p>!</p>\n');
  });
});
