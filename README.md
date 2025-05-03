# `ngx-mdx`

React vibrant ecosystem makes Markdown integration seamless with MDX.
So this project is all about bringing a similar experience to Angular,
with as less hurdle as we can.

## Usage

### Install

```shell
# npm install npx-mdx
# yarn add npx-mdx
pnpm add npx-mdx
```

### Import

```typescript
import {MdxComponent} from "ngx-mdx";
```

### Enjoy

```angular2html
<article ngx-mdx>
  # Level 1 Title
  
  ## Level 2 title
  
  + a
  + list
  + of
  + items
  
  You can even _emphasize_ some **bold statement**.
  
  <my-hero></my-hero>
</article>
```

> **NOTE:** Anything rendered under `<my-hero></my-hero>` will not be accounted for.


## Licencing

This project is delivered under MIT Licence.

## Contributing

You are encouraged to:

+ Open issues, with your Angular/ngx-mdx versions
+ Fork this repository and submit feature requests
