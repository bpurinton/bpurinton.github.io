# my-website

[bendirt.com](https://www.bendirt.com/)

## Some notes

`assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme's gem (see `gem "minimal-mistakes-jekyll"` in Gemfile). So I don't need to make these pages! **If you would like to make changes, create the files and Jekyll will prefer your local copy.** [source](https://mmistakes.github.io/minimal-mistakes/docs/structure/){:target="_blank"}

Note: Jekyll 3.3 overrides config site.url with url: http://localhost:4000 when running jekyll serve locally in development. If you want to avoid this behavior set JEKYLL_ENV=production to force the environment to production.

Lots of useful tips here: https://www.cross-validated.com/Personal-website-with-Minimal-Mistakes-Jekyll-Theme-HOWTO-Part-II/ (here is the repo: https://github.com/k-bosko/k-bosko.github.io)

Be sure to always make changes on new branches and follow the best practices for merging as [outlined in this blog post](https://www.bendirt.com/merging-feature-branch/).