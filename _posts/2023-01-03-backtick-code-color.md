---
layout: posts
title: Changing in-line code color
---

I was getting annoyed with the difficulty of seeing the code with \`\` (backtick) symbols in my blog posts. To change these colors I went into my `_sass/minimal-mistakes/_base.scss` file and changed this part of the code:

```ruby
/* code */

tt,
code,
kbd,
samp,
pre {
  font-family: $monospace;
}
```

to:

```ruby
/* code */

tt,
code,
kbd,
samp,
pre {
  font-family: $monospace;
  color: #CC5500;
  // background: $link-color
}
```

`#CC5500` is a nice burnt oragne color. I also tried changing the `background` color, but this also affected triple-backtick code snippets.