import {AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {parse} from 'marked';
import dedent from 'dedent';


@Component({
  selector: '[ngx-jokeaside-mdx], ngx-jokeaside-mdx',
  template: `<ng-content></ng-content>`,
})
export class MdxComponent implements AfterViewInit, AfterViewChecked {
  constructor(private readonly elRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    this.#processMarkdown();
  }

  ngAfterViewChecked() {
    this.#processMarkdown();
  }

  #processMarkdown() {
    let node: null | Node = null;
    const walker = document.createTreeWalker(
      this.elRef.nativeElement,
      NodeFilter.SHOW_ALL,
      node => 3 === node.nodeType
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP);

    while (node = walker.nextNode()) {
      const source = node.textContent ?? '';
      const cleared = dedent(source);
      const parsed = parse(cleared) as string;
      node.textContent = '';
      this.elRef.nativeElement.insertAdjacentHTML('beforeend', parsed);
    }
  }
}
