# my-website

## Some notes

`assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme's gem (see `gem "minimal-mistakes-jekyll"` in Gemfile). So I don't need to make these pages! **If you would like to make changes, create the files and Jekyll will prefer your local copy.** [source](https://mmistakes.github.io/minimal-mistakes/docs/structure/){:target="_blank"}

Note: Jekyll 3.3 overrides config site.url with url: http://localhost:4000 when running jekyll serve locally in development. If you want to avoid this behavior set JEKYLL_ENV=production to force the environment to production.