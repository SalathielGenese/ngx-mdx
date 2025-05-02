import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MdxComponent} from './mdx.component';
import {Component, OnInit} from '@angular/core';


describe('MdxComponent', () => {
  let component: WithMdxComponent;
  let fixture: ComponentFixture<WithMdxComponent>;

  @Component({
    selector: 'with-mdx',
    imports: [MdxComponent],
    preserveWhitespaces: true,
    template: `
      <article ngx-jokeaside-mdx>
        # How {{ name }} works!

        This explains how to setup and work with {{ name }}!
      </article>`
  })
  class WithMdxComponent implements OnInit {
    name = 'mdx';

    ngOnInit() {
      setTimeout(() => this.name = 'MDX', 3_000);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [WithMdxComponent, MdxComponent]}).compileComponents();
    fixture = TestBed.createComponent(WithMdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should contain "mdx works" text', async () => {
    expect((fixture.elementRef.nativeElement as HTMLElement).outerHTML).toContain('How mdx works!');
    await new Promise(resolve => setTimeout(resolve, 3_000));
    fixture.detectChanges();
    expect((fixture.elementRef.nativeElement as HTMLElement).outerHTML).toContain('How MDX works!');
  });
});
