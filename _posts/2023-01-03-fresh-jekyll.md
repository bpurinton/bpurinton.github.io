---
layout: posts
title: Getting started with a jekyll, minimal mistakes, and github pages
toc: true
toc_label: "Content"
tags: jekyll github-pages minimal-mistakes
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

This site was built with [jekyll](https://jekyllrb.com/){:target="_blank"}. In my own words, this is a static (as opposed to dynamic? I think so) website generator that is written in the programming language Ruby. Jekyll uses a defined file structure, similar to Ruby on Rails, where there are specific ways to name folders and files (e.g., `_layouts/`, `_includes/`, `_data/navigation.yml`). 

The files are a combination of CSS, Markdown, and HTML. There are also control-flow embedded tags in [Liquid](https://shopify.github.io/liquid/){:target="_blank"}, that work very similar to embedded Ruby, and give access to global variables like `paginator` and `site`. If you see a `.md` or `.html` file headed by `---`, then you can put Liquid tags there, because this is frontmatter that jekyll is looking for. All sorts of things go in there like the page title, navigation links, and more. I could go on, but let's get to the practical implementation.


## Starting a site

The easiest way to learn jekyll is by following their simple [tutorial](https://jekyllrb.com/docs/step-by-step){:target="_blank"}. I just want to summarize the steps that *I* did to get up and running.

I opened a new VS Code project in a folder call `my-website/`. I previously installed Ruby and RubyGems on my local laptop (running Windows 10), so I was able to go to the PowerShell terminal in VS Code and run

```ruby
> gem install jekyll bundler
```

This installed jekyll (somewhere in my `C:\Ruby31-x64` directory -- sidenote, this is similar to the way I'm used to `conda` installing Python packages). Then I ran:

```ruby
> bundle init
```

That created a blank `Gemfile` in the directory, and into that file I dropped:

```ruby
gem "jekyll"
```

After this, back at the terminal I ran:

```ruby
> bundle
```

This installed jekyll, because that's what `bundle` does! It looks in you `Gemfile` and installs all the gems you need for the project.

At this point, I was able to make a toy file `index.html` in the `my-website/` root directory, and then run at the terminal:

```ruby
> jekyll serve --livereload
```

**Jekyll is a static site generator! So when I run this command, it first automatically does a `jekyll build`, which creates a new directory `_site/` containing all the pages to be published online as HTML.**

With the `_site/` built, `jekyll serve` now gives me access to a local port `http://localhost:4000/` that I can navigate to in a new internet browser window, and `--livereload` will insure that most changes I make on VS Code are automatically shown in the browser! Some changes (like those to `_config.yml`) will need to have the server restarted to show them (i.e., a new `jekyll build` has to run).

Overall, we have a great environment with VS Code for editing files, and the browser for viewing our website. There's so much more jekyll [to learn](https://jekyllrb.com/docs/step-by-step/02-liquid/){:target="_blank"}.


## Minimal Mistakes

Building up an entire website from scratch with jekyll would be a lot of work, especially for something asthetically pleasing. So I took a common shortcut, and used the [minimal mistakes](https://mmistakes.github.io/minimal-mistakes/){:target="_blank"} jekyll theme to get something decent up and running. 

Basically, you get a whole bunch of page layouts and boilerplate code in the jekyll language and structure with this repository that you can do a ton of customization on. There's a nice quick-start guide [here](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/){:target="_blank"} that I used.


### Getting Minimal Mistakes to Work on GitHub

At first, I naively tried to use the [gem-based method](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#gem-based-method){:target="_blank"} to get the template running. That actually worked pretty well in VS Code in my local browser. Just adding this gem and running the build and server got it working locally. I was able to play around a lot and spin up a website. 

**BUT WAIT,** since the location I was deploying the site (github pages, coming up below) is limited in its build-ability (see [this SO conversation](https://stackoverflow.com/questions/71001952/github-pages-cant-find-jekyll-theme-minimal-mistakes){:target="_blank"}), my naive approach didn't work. 

Instead you need to follow [here](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#remote-theme-method){:target="_blank"}, and have a `Gemfile` that looks like:

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-include-cache", group: :jekyll_plugins
```

You also need to:

 1. Add `jekyll-include-cache` to the plugins array of your `_config.yml`
 1. Run `bundle` in the directory to update teh bundled gems
 1. Add `remote_theme: "mmistakes/minimal-mistakes"` to your `_config.yml` file. Remove any other `theme:` or `remote_theme:` entry


## Proto Directory Structure

After a lot of fooling around, I ended up with a prototype for my website that basically looked like:

```
my-website
├── _data                      # data files for customizing the theme
|  ├── navigation.yml          # main navigation links
|  └── ui-text.yml             # text used throughout the theme's UI
├── _pages                     # a sub-directory with all pages on my site
|  ├── 404.md                  
|  ├── about.md                
|  ├── cv.md                   
|  ├── publications.md         
|  └── research.md             
├── assets
|  ├── documents               # some documents I link to
|  ├── images                  # images on my website
|  └── videos                  # videos on my website
├── README.md                 
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
└── Gemfile.lock               # gemlock file, you can actually delete this
```

The git commit with all of that is [here](https://github.com/bpurinton/bpurinton.github.io/tree/7c44f0e0646bb909de8b03e9153904f581ed1489){:target="_blank"}.

**BUT WAIT,** where the heck is all of the other files that jekyll needs... `assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme's gem! So I don't need to make these directories or files! If you would like to make changes, create the files and Jekyll will prefer your local copy ([source](https://mmistakes.github.io/minimal-mistakes/docs/structure/){:target="_blank"}).


## Where to host?

If you're like me, then you may have dove deep on spinning up a nice website at `http://localhost:4000/` while running `jekyll serve` in VS Code. Now comes the question, where do I actually deploy my website online so other people can see it?

Basically, this comes down to a matter of getting the static `_site/` directory hosted on a server somewhere. 

I deployed my site with [github pages](https://pages.github.com/){:target="_blank"}, mostly because it's free and you can find a lot of help online from people doing the same.


## Setting up github

First I created a new repository on my github account called `[USERNAME].github.io` (for me that would be repo at `https://github.com/bpurinton/bpurinton.github.io`). I set it to Public and initialized it with no license or README.

Now, back in my nice website directory, I renamed the directory `bpurinton.github.io` to match my github repo. I also added a README file, but I left this mostly blank. 

Since I had been running the static site built with `jekyll serve` (which runs `jekyll build`), I had the `_site/` directory ready to go. **But github pages runs its own build on the repo, so at this point I can actually delete the `_site/` directory.** Basically, I use `_site/` when I'm in production mode in VS Code and using the local port browser to make updates. When it's time to push stuff to github, I just delete this directory. *There's probably a better way to do this by preventing `_site/` from pushing, but that's something for future Ben.*

At this point I ran the following git commands from the VS Code terminal in the website directory (because I have git installed and available at the command line):

```ruby
# initialize the repository with a .git/ directory
git init

# add all files in the directory
git add .

# commit the files
git commit -m "first commit"

# set the current branch (I think?)
git branch -M main

# set the upstream push location
git remote add origin https://github.com/bpurinton/bpurinton.github.io.git

# push my files up
git push -u origin main
```

## Deploying

Now we need to do a few things (always pushing the changes with new git commits):

 1. In `_config.yml` set `url : "https://[USERNAME].github.io"` and set `repository : "[USERNAME]/[USERNAME].github.io"`
 1. On the github repository, go to "Settings" > "Pages" and set the "Source" > "Deploy from branch", "Branch" to `main`.
 1. Make sure the page is deployed at `https://[USERNAME].github.io`

The deployment will be running in the "Actions" tab of the repository, and you can monitor it there (*everytime you push a change to your github repo, this action will be run*). If there are errors, the page won't deploy, but if everything goes well, then you will see the confirmation and if you navigate to `https://[USERNAME].github.io`, then you will see your static website online!

