---
# layout: posts
title: Git merging main into an in-progress feature-branch
toc: true
toc_label: "Content"
toc_sticky: true
tags: git rebase
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

In a collaborative (or solo) `git` project I'm often in a position where I was working on a `feature-branch`, got busy, stopped working on it, then came back to it awhile later. In that time, there were changes on `main` (formerly `master`), that might affect my feature branch.

The question is: how do I merge the changes on `main` into my `feature-branch`, such that, when I merge the `feature-branch` into `main` down the road, there is a clean history?

We could `merge --squash`, but what we really want for a nice clean history is explained here.

**Note, this blog post is a companion to [this longer post](https://www.bendirt.com/notes-on-git/){:target="_blank"}**

# Change the editor

Before beginning, it's nice to change the editor that Github uses away from VIM, which I find to be a pain. On my macbook, I ran: 

```bash
$ git config --global core.editor "code --wait"`
``` 

to change the default editor to VS code. The `--wait` option freezes the command line until I close the file in the editor.

# Getting main up to date

First, I pull main locally:

```bash
$ git checkout main
(main) $ git pull
```

Once everything is up to date there, I switch back to my branch:

```bash
(main) $ git checkout feature-branch
(feature-branch) $
```

## Source vs. Target Branch

Quick note here. We are trying to merge like `main --> feature-branch`. The branch with added changes we are trying to gather is called the **source branch** (here `main`) while the branch you request to merge your changes into is called the **target branch** (here `feature-branch`). We want to merge `main` (source) _into_ `feature-branch` (target). 

# Rebase into `feature-branch`

Now I want to **rebase** the `main` _into_ `feature-branch`.

```bash
(feature-branch) $ git rebase main
```

I _could_ have added the `-i` (or `--interactive`) flag, like `git rebase main -i`. This would allow me to craft a commit history by `s`quashing all the commits except for one that I `p`ick (the top-most in the editor). `p`icking multiple is almost never worth it (or, alternatively, it means your branches are too long lived). We skip the `-i` flag at this stage because we don't need to make the history clean, we just need to get all the changes from `main`. Later, when we merge the feature to main, we will use `-i`.

After the `rebase`, I need to pull to get all the changes:

```bash
(feature-branch) $ git pull
```

If an error comes up regarding divergent branches, then we need to specify how to reconcile them. We can pass one of the flags `--rebase`, `--no-rebase`, or `--ff-only`. We need to use `--rebase` because `--ff-only` will fail since the local and remote branches have diverged:

```bash
(feature-branch) $ git pull --rebase
```

Now I can push:

```bash
(feature-branch) $ git push
```

And if I check on the open PR for the feature branch, I will see all of the history from `main`.

# Merge to `main`

When I'm done with the `feature-branch` (meaning I've made all the commits I'm going to and pushed them all to Github) and ready to merge to `main`, I can

  - merge on Github using the open PR, including receiving code review and then clicking "Squash and merge"

  OR (if I want to merge without the PR / code review)

  - run these commands:

```bash
git checkout main
git pull
git checkout feature-branch
git rebase main -i
```

At this point, an editor will pop up. I can replace `pick` for all but the first commit (top-most in the editor) with `s` (for `squash`). Then I save and close the file. 

Another text editor will open where you can craft [a wonderful commit message](https://chris.beams.io/posts/git-commit/) to [communicate the WHY](https://dhwthompson.com/2019/my-favourite-git-commit){:target="_blank"} of your changes (the WHAT is told by the diff).

Now, with the messy history of commits ironed out, we merge the feature to main:

```bash
git checkout main
git merge feature-branch
git push
```