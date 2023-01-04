---
layout: posts
title: Deploying github page to own domain
toc: true
toc_label: "Content"
tags: github-pages domain-name
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

I wanted something a little more professional than `https://[USERNAME].github.io` for my website name. Come on, `https://bendirt.com` is at least memorable!

I mostly just followed this [amazing guide](https://www.cross-validated.com/Personal-website-with-Minimal-Mistakes-Jekyll-Theme-HOWTO-Part-III/){:target="_blank"}. I recommend checking out that whole four part series, although it uses Docker, which I didn't touch for my site... *Another thing for future Ben*.

Let me summarize the steps:

  1. Go to your favorite place to buy domains and find a good one. I bought mine for 12/year from [google domains](https://domains.google/){:target="_blank"}.
  1. Add a file called `CNAME` (no extension) to your `https://github.com/[USERNAME]/[USERNAME].github.io` website directory. That file will contain the name of your domain (e.g., `www.bendirt.com`).
  1. Go the DNS settings on your google domain page and add github's servers and the repository to the "Resource records":
      - Host name: `[YOUR DOMAIN].[YOUR EXTENSION]` (e.g., `bendirt.com`); Type: A; TTL: 1h; Data:
        - 185.199.108.153
        - 185.199.109.153
        - 185.199.110.153
        - 185.199.111.153
      - Host name: `www.[YOUR DOMAIN].[YOUR EXTENSION]` (e.g., `www.bendirt.com`); Type: CNAME; TTL: 1h; Data: `[USERNAME].github.io`
  1. Go back to your repository "Settings" > "Pages", and you should see your domain as the deployment location! 

**You need to be patient for a bit, but once the domain is ready you can also check "Enforce HTTPS" to protect visitors to the website**

If you are having problems, github has a good [troubleshooting page](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages){:target="_blank"}.