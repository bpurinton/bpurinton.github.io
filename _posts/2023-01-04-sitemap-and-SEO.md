---
# layout: posts
title: Adding a `sitemap.xml` for SEO
toc: true
toc_label: "Content"
toc_sticky: true
tags: github-pages seo jekyll
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

SEO stands for Search Engine Optimization. I want to improve how my site comes up when people search for it. As usual, I'm relying heavily on [this wonderful guide](https://www.cross-validated.com/Personal-website-with-Minimal-Mistakes-Jekyll-Theme-HOWTO-Part-IV/){:target="_blank"}.

## Register on Google Search Console

The first thing I did was register my domain on the [Google Search Console](https://search.google.com/search-console/about){:target="_blank"}. That was easy, because I had already purchased the domain from [Google Domains](https://domains.google/){:target="_blank"}. The search console allows us to track our site and improve the search results.

## Generate a sitemap

For the search console, we need a `sitemap.xml` that is just a map of all the URLs in our domain. I noticed the `site.xml` was in the `_site/` folder of my local build, and was updated everytime I ran:

```
bundle exec jekyll build
```

That's the handy command-line way to locally rebuild the website in the `_site/` folder when I make changes. **However,** if I run:

```
bundle exec jekyll serve
```

(which first executes a `build`), then the `sitemap.xml` appears like:

```html
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>http://localhost:4000/backtick-code-color/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
</url>
<url>
<loc>http://localhost:4000/deploying-own-domain/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
</url>
<url>
<loc>http://localhost:4000/fresh-jekyll/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
...
```

All of the domain is at the base URL of `http://localhost:4000/`. That's because *Jekyll 3.3 overrides config site.url with url: `http://localhost:4000` when running jekyll serve locally in development. If you want to avoid this behavior set `JEKYLL_ENV=production` to force the environment to production.*

Oops! I didn't want to mess with the `JEKYLL_ENV` variable, and I wanted to continue making local edits, so rather than this, I just ran a plain:

```
bundle exec jekyll build
```

And that gave me a nice `_site/sitemap.xml` file:

```html
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://bendirt.com/backtick-code-color/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
</url>
<url>
<loc>https://bendirt.com/deploying-own-domain/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
</url>
<url>
<loc>https://bendirt.com/fresh-jekyll/</loc>
<lastmod>2023-01-03T00:00:00-09:00</lastmod>
...
```

## Submit the sitemap

Now *this* is what I need to upload to the Google Search Console "Sitemap" at: `https://search.google.com/search-console/sitemaps`.

But I can't just upload this, I need to submit a URL.... 

**All that dancing around for nothing. If I visit my deployed website, then an updated `sitemap.xml` already exists at `https://www.bendirt.com/sitemap.xml`. I guess this was generated during the github-pages deployment?**

Now it's just about patience with the Google Search Console, since it may take a few days to update with analytics.
