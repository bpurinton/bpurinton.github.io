---
title: Building an Interactive CV Builder with Claude
toc: true
toc_label: "Content"
toc_sticky: true
tags: web-development javascript claude-ai cv-builder html css
header:
  teaser: /assets/images/cv-builder-preview.png
excerpt: "How I built a dynamic, printable CV builder for my Jekyll site using Claude's new Artifacts feature and some creative problem-solving"
---

As someone who straddles the worlds of academic research and tech education, I've always struggled with maintaining different versions of my CV. I have a comprehensive academic CV in LaTeX that spans multiple pages, and a condensed one-page version for industry roles. But updating both is tedious, and neither really captures my unique career trajectory.

So I decided to build something better: an interactive, web-based CV builder that I could customize on the fly and publish directly to my Jekyll site. Here's how I did it with the help of Claude.

(It's linked below at the end of the post, but if you're anxious to have a look now: [CV Builder](/cv-builder){: target="_blank"})

# The Journey Begins: Claude Artifacts

I started with Claude's web-based Artifacts tool, which lets you iterate on code in a visual interface. My initial prompt was simple:

> I want a slick CV template. I'm a scientist with a bunch of education and research credentials, but I now work for an education startup that teaches people to code. I'm the head of operations there.

Claude generated a beautiful, interactive CV template with:
- Editable fields (using `contenteditable`)
- A professional gradient header
- Organized sections for experience, skills, education, etc.
- Print-friendly CSS
- Dynamic add/remove functionality for list items

After some iteration in the Artifacts interface to refine the design and functionality, I had a solid foundation. But I wanted to integrate this into my Jekyll site and add some crucial features.

# Moving to the Repository

I brought the code over to my GitHub Pages repository and continued working with Claude in my local development environment. This is where things got interesting.

## The localStorage Dilemma

My first challenge: the CV builder would reset to the template every time I visited the page. Annoying! My initial thought was to use localStorage to persist edits between sessions.

```javascript
function saveToLocalStorage() {
    const cvContent = document.querySelector('.main-content').innerHTML;
    localStorage.setItem('cvBuilderContent', cvContent);
    localStorage.setItem('cvBuilderLastSaved', new Date().toISOString());
}
```

But then I realized the fundamental issue: localStorage is browser-specific. Other visitors to my site wouldn't see my actual CV—they'd see the blank template! 

## The Static HTML Solution

After discussing options with Claude, we landed on a clever solution:

1. **Edit locally**: Use the CV builder at `/cv-builder` to create and edit my CV
2. **Publish to static**: Export the completed CV as a static HTML file
3. **Commit to repo**: Save this as `cv-current.html` in my repository
4. **Display publicly**: Embed the static CV on my main `/cv` page

Here's the publish function that makes the magic happen:

```javascript
function publishCV() {
    // Clone the current CV
    const cvClone = document.querySelector('.cv-container').cloneNode(true);
    
    // Remove all edit controls and buttons
    cvClone.querySelectorAll('.print-controls, .section-controls, .item-controls')
        .forEach(el => el.remove());
    
    // Remove contenteditable attributes
    cvClone.querySelectorAll('[contenteditable]')
        .forEach(el => el.removeAttribute('contenteditable'));
    
    // Create the full HTML document
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${document.querySelector('.name').textContent} - CV</title>
    <style>${document.querySelector('style').textContent}</style>
</head>
<body>
    ${cvClone.outerHTML}
</body>
</html>`;
    
    // Trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-current.html';
    a.click();
}
```

## The Template Literal Trap

One interesting bug we encountered: when generating the static HTML, I initially had a `<script>` tag inside a template literal, which confused the browser's parser. The solution? Break it up:

```javascript
// Instead of <script>, use:
<${'script'}>
    function printCV() { window.print(); }
</${'script'}>
```

# The Final Product

The result is a three-part system:

1. **CV Builder** (`/cv-builder`): An interactive editor where I can update my CV
2. **Static CV** (`/cv-current`): The published, read-only version for visitors. I can print this page to save it as PDF for distribution.
3. **CV Page** (`/cv`): Displays the static CV in an iframe with links to the builder and PDF versions

## Key Features

- **Fully editable**: Click any text to edit it in place
- **Dynamic sections**: Add/remove experience items, skills, publications, etc.
- **Print-friendly**: Optimized CSS for clean PDF generation
- **Mobile responsive**: Works great on all devices
- **Version controlled**: The published CV is committed to Git
- **No database needed**: Perfect for static sites like Jekyll

## Next Up Features

The interactive CV builder page doesn't persist edits, since I didn't want to complicate my static website with a database hookup for persistence. I'm okay with that for now, since I only rarely update my CV, and I don't need the page to save work. Also, if I really want to make minor tweaks, I can just update the exported static HTML page.

That said, the next thing to add to my CV builder would be persistence, so a visitor could save their work and load previous versions.

# Lessons Learned

1. **Start simple**: Claude's Artifacts tool was perfect for rapid prototyping
2. **Think about your users**: localStorage is great for personal tools, but not for public content
3. **Static sites have constraints**: But creative solutions can work around them
4. **AI assistants are incredible collaborators**: Claude helped me think through architectural decisions, not just write code

# Try It Yourself

The code is all open source in my [GitHub repository](https://github.com/bpurinton/bpurinton.github.io){: target="_blank"}. Feel free to adapt it for your own needs!

Building this CV builder was a fun exercise in creative problem-solving. It's not every day you get to combine academic credentials, web development skills, and AI assistance to solve a personal productivity problem. But that's exactly the kind of interdisciplinary thinking I love about my current role bridging research and education technology.

Now if you'll excuse me, I need to go update my CV... which is now as easy as clicking [CV Builder](/cv-builder){: target="_blank"} and typing! 🚀
