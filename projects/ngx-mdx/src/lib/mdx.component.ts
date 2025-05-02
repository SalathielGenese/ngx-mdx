import {AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {parse} from 'marked';
import dedent from 'dedent';


@Component({
  selector: '[ngx-mdx], ngx-mdx',
  template: `
    <ng-content></ng-content>`,
})
export class MdxComponent implements AfterViewInit, AfterViewChecked {
  readonly #synthetics = new Set<Node>();

  constructor(private readonly renderer: Renderer2,
              private readonly elRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    this.#processMarkdown();
  }

  ngAfterViewChecked() {
    this.#processMarkdown(true);
  }

  #processMarkdown(trim = false) {
    for (const synthetic of new Set(this.#synthetics)) {
      synthetic.parentNode?.removeChild(synthetic);
      this.#synthetics.delete(synthetic);
    }

    for (const node of this.elRef.nativeElement.childNodes) {
      if (3 !== node.nodeType) return;
      const temporary: HTMLDivElement = this.renderer.createElement('div');
      this.renderer.setProperty(temporary, 'innerHTML', `${parse(dedent(node.textContent ?? ''))}`);
      temporary.childNodes.forEach(child => {
        const ref = node?.parentNode?.insertBefore(child.cloneNode(true), node);
        ref && this.#synthetics.add(ref);
      });
      if (trim) node.textContent = '';
    }
  }
}
