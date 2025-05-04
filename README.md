# `ngx-mdx`

The React vibrant ecosystem makes Markdown integration seamless with MDX.
So this project is all about bringing a similar experience to Angular,
with as less hurdle as we can.

## Usage

### Install

```shell
# npm install npx-mdx
# yarn add npx-mdx
pnpm add npx-mdx
```

### API

`ngx-mdx` exposes:

+ one component:
  + ```typescript
    // Component Selectors: ngx-mdx, ngxMdx
    import {MdxComponent} from "ngx-mdx";
    ```
+ two directives:
  + ```typescript
    // Directive Selectors: [ngx-mdx-ignore], [ngxMdxIgnore]
    import {MdxIgnoreDirective} from "ngx-mdx";
    
    // Useful to ignore a DOM tree starting on the node it is applied on.
    ```
  + ```typescript
    // Directive Selectors: [ngx-mdx-inline], [ngxMdxInline]
    import {MdxIgnoreDirective} from "ngx-mdx";
    ```

### Templating

```angular2html
<!-- Input -->
<article ngx-mdx>Hello **world**!</article>

<!-- Output -->
<article><p>Hello <strong>world</strong>!</p></article>
```

Markdown in nested DOM:
```angular2html
<!-- Input -->
<article ngx-mdx>Hello <a href="#">dancing **world**</a>!</article>

<!-- Output -->
<article><p>Hello </p><a href="#"><p>dancing <strong>world</strong></p></a><p>!</p></article>
```

> **NOTE:** You may have noticed those extract `<p>` tags.
> You can inline the rendering and rid of them...
>
> It works on ngx-mdx hosts:
> ```angular2html
> <!-- Input -->
> <article ngx-mdx ngx-mdx-inline>Hello **world**!</article>
>
> <!-- Output -->
> <article>Hello <strong>world</strong>!</article>
> ```
>
>
> But also when Markdown in nested DOM:
> ```angular2html
> <!-- Input -->
> <article ngx-mdx>Hello <a href="#" ngx-mdx-inline>dancing **world**</a>!</article>
>
> <!-- Output -->
> <article><p>Hello </p><a href="#">dancing <strong>world</strong></a><p>!</p></article>
> ```


## Licencing

This project is delivered under MIT Licence.

## Contributing

You are encouraged to:

+ Open issues, with your Angular/ngx-mdx versions
+ Fork this repository and submit feature requests
