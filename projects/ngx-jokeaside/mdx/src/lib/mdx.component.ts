import { MdxService } from './mdx.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-jokeaside-mdx, [ngx-jokeaside-mdx], .ngx-jokeaside-mdx',
  template: `
    <p>
      {{ mdxService.sayItWorks("mdx") }}
    </p>
  `,
  styles: ``
})
export class MdxComponent {
  constructor(protected readonly mdxService: MdxService) {
  }
}
