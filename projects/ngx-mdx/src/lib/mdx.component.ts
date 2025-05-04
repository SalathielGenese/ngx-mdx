import {AfterViewChecked, Component, ContentChildren, ElementRef, QueryList, Renderer2} from '@angular/core';
import {MdxIgnoreDirective} from './mdx-ignore.directive';
import {MdxInlineDirective} from './mdx-inline.directive';
import {parse} from 'marked';
import dedent from 'dedent';


@Component({
  selector: 'ngx-mdx, [ngxMdx], [ngx-mdx]',
  template: `
    <ng-content></ng-content>`,
})
export class MdxComponent implements AfterViewChecked {
  readonly #synthetics = new Set<Node>();

  @ContentChildren(MdxIgnoreDirective, {read: ElementRef, descendants: true})
  private ignored!: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(MdxInlineDirective, {read: ElementRef, descendants: true})
  private inlined!: QueryList<ElementRef<HTMLElement>>;

  constructor(private readonly renderer: Renderer2,
              private readonly rootRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewChecked() {
    for (const synthetic of new Set(this.#synthetics)) {
      synthetic.parentNode?.removeChild(synthetic);
      this.#synthetics.delete(synthetic);
    }

    const {nativeElement: root} = this.rootRef;
    for (const [node, inlineContext] of this.#collectTextNodesOfInterest(root, this.#getNgContext(root)!)) {
      const temporary: HTMLDivElement = this.renderer.createElement('div');
      this.renderer.setProperty(temporary, 'innerHTML', `${parse(dedent(node.textContent ?? ''))}`);

      const children = inlineContext && this.#isInlineCandidate(temporary.childNodes)
        ? temporary.children[0].childNodes
        : temporary.childNodes;
      children.forEach(child => {
        const ref = node?.parentNode?.insertBefore(child.cloneNode(true), node);
        if (ref) this.#synthetics.add(ref);
      });

      node.textContent = '';
    }
  }

  #collectTextNodesOfInterest(node: Node, rootNgContext: number, inlineContext = false): [Node, boolean][] {
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        return node.textContent?.trim() ? [[node, inlineContext]] : [];
      case Node.ELEMENT_NODE:
        if (this.ignored.some(ref => ref.nativeElement === node)) return [];

        if ([...node.childNodes].some(child => {
          const childNgContext = this.#getNgContext(child);
          return childNgContext && rootNgContext !== childNgContext;
        })) return [];

        const childInlineContext = inlineContext || this.inlined.some(ref => ref.nativeElement === node);
        return [...node.childNodes].reduce((tracker, child) => {
          return [...tracker, ...this.#collectTextNodesOfInterest(child, rootNgContext, childInlineContext)];
        }, [] as [Node, boolean][]);
      default:
        return [];
    }
  }

  #isInlineCandidate(childNodes: NodeListOf<ChildNode>): boolean {
    return 2 === childNodes.length &&
      '\n' === childNodes[1].textContent &&
      Node.TEXT_NODE === childNodes[1].nodeType &&
      Node.ELEMENT_NODE === childNodes[0].nodeType &&
      'P' === (childNodes[0] as HTMLElement).tagName;
  }

  #getNgContext(node: Node): number | undefined {
    return (node as any).__ngContext__;
  }
}
