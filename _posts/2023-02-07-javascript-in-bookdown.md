---
# layout: posts
title: Custom JavaScript in Bookdown
toc: true
toc_label: "Content"
toc_sticky: true
tags: bookdown markdown html javascript
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

I wanted some custom behavior in my bookdown project. Specifically, I wanted all the internal cross references to open in new tabs so that the reading flow is unbroken. 

# The Issue

With _external_ references, bookdown's formatting makes it easy to write:

```markdown
[some website](theURL){target="_blank"}
```

which parses to 

```html
<a href="theURL" target="_blank">some website</a>
``` 

But the bookdown _internal_ cross-reference works like:

```markdown
[some cross reference][the section ID]
```

This doesn't accept the additional `{target="_blank"}`. So how to fix this?

# JavaScript to the Rescue

JavaScript `<script>`s in the HTML document allow you to modify the HTML after bookdown (well, pandoc actually) finishes rendering the output into HTML static files. My understanding is that this re-rendering and HTML addition is actually carried out by the browser when it encounters the `<script></script>` tags in an HTML document.

First, I found [this post](https://stackoverflow.com/questions/6822945/add-target-blank-to-link-with-javascript){:target="_blank"}, and the first answer there ([this one](https://stackoverflow.com/a/6823034){:target="_blank"}) told me that I could use a very simple JS script to retroactively add all my nice `target="_blank"`s:

```js
var links = document.getElementsByTagName('a');
var len = links.length;

for(var i=0; i<len; i++)
{
   links[i].target = "_blank";
}
```

This script gets all the `<a></a>` link tags, and adds the code iteratively in a loop. If the link already had a `target="_blank"` tag, it just overwrites it. Probably it would be "more correct" to ignore those that already have the tag, but it ain't broke so I ain't fixin it.

## How do I get this thing to run?

I'm fairly new to JS, but luckily I found [this post](https://community.rstudio.com/t/insertion-of-javascript-into-bookdown-project/44176){:target="_blank"} regarding JS and bookdown. Unfortunately the person was not answered, but their code told me I just needed to do three things in my bookdown project.

First, I needed to make a new file in the `assets/styling/` folder called `scripts.html`. I could put this file anywhere and call it anything, but I consider what I'm doing here "styling". Now any other JS scripts I want in my project can go into `assets/styling/scripts.html`.

Second, I just need to drop the above JS script into the new file with some HTML tags:

```html
<script>
  var links = document.getElementsByTagName('a');
  var len = links.length;

  for(var i=0; i<len; i++)
  {
    links[i].target = "_blank";
  }
</script>
```

Lastly, I need to point the file out to bookdown, so that it will add the script to each HTML file, which will then later be interpreted by the browser. I just need to add the following to the `_output.yml` file associated with my bookdown project:

```yml
bookdown::gitbook:
  css: assets/styling/style.css
  pandoc_args: ["--lua-filter=assets/styling/footnote.lua"]
  includes:
    in_header: assets/styling/style.html
    after_body: assets/styling/scripts.html
  # ...
```

Now the project includes my custom script added to every HTML page.