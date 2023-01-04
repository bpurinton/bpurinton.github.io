var store = [{
        "title": "Changing in-line code color",
        "excerpt":"I was getting annoyed with the difficulty of seeing the code with `` (backtick) symbols in my blog posts. To change these colors I went into my _sass/minimal-mistakes/_base.scss file and changed this part of the code:   /* code */  tt, code, kbd, samp, pre {   font-family: $monospace; }   to:   /* code */  tt, code, kbd, samp, pre {   font-family: $monospace;   color: #CC5500;   // background: $link-color }   #CC5500 is a nice burnt oragne color. I also tried changing the background color, but this also affected triple-backtick code snippets.  ","categories": [],
        "tags": [],
        "url": "/backtick-code-color/",
        "teaser": "/assets/images/favicon-32x32.png"
      },{
        "title": "Deploying github page to own domain",
        "excerpt":"I wanted something a little more professional than https://[USERNAME].github.io for my website name. Come on, https://bendirt.com is at least memorable!   I mostly just followed this amazing guide. I recommend checking out that whole four part series, although it uses Docker, which I didn’t touch for my site… Another thing for future Ben.   Let me summarize the steps:      Go to your favorite place to buy domains and find a good one. I bought mine for 12/year from google domains.   Add a file called CNAME (no extension) to your https://github.com/[USERNAME]/[USERNAME].github.io website directory. That file will contain the name of your domain (e.g., www.bendirt.com).   Go the DNS settings on your google domain page and add github’s servers and the repository to the “Resource records”:            Host name: [YOUR DOMAIN].[YOUR EXTENSION] (e.g., bendirt.com); Type: A; TTL: 1h; Data:                    185.199.108.153           185.199.109.153           185.199.110.153           185.199.111.153                       Host name: www.[YOUR DOMAIN].[YOUR EXTENSION] (e.g., www.bendirt.com); Type: CNAME; TTL: 1h; Data: [USERNAME].github.io           Go back to your repository “Settings” &gt; “Pages”, and you should see your domain as the deployment location!   You need to be patient for a bit, but once the domain is ready you can also check “Enforce HTTPS” to protect visitors to the website   If you are having problems, github has a good troubleshooting page.  ","categories": [],
        "tags": [],
        "url": "/deploying-own-domain/",
        "teaser": "/assets/images/favicon-32x32.png"
      },{
        "title": "Getting started with a jekyll, minimal mistakes, and github pages",
        "excerpt":"This site was built with jekyll. In my own words, this is a static (as opposed to dynamic? I think so) website generator that is written in the programming language Ruby. Jekyll uses a defined file structure, similar to Ruby on Rails, where there are specific ways to name folders and files (e.g., _layouts/, _includes/, _data/navigation.yml).   The files are a combination of CSS, Markdown, and HTML. There are also control-flow embedded tags in Liquid, that work very similar to embedded Ruby, and give access to global variables like paginator and site. If you see a .md or .html file headed by ---, then you can put Liquid tags there, because this is frontmatter that jekyll is looking for. All sorts of things go in there like the page title, navigation links, and more. I could go on, but let’s get to the practical implementation.   Starting a site   The easiest way to learn jekyll is by following their simple tutorial. I just want to summarize the steps that I did to get up and running.   I opened a new VS Code project in a folder call my-website/. I previously installed Ruby and RubyGems on my local laptop (running Windows 10), so I was able to go to the PowerShell terminal in VS Code and run   &gt; gem install jekyll bundler   This installed jekyll (somewhere in my C:\\Ruby31-x64 directory – sidenote, this is similar to the way I’m used to conda installing Python packages). Then I ran:   &gt; bundle init   That created a blank Gemfile in the directory, and into that file I dropped:   gem \"jekyll\"   After this, back at the terminal I ran:   &gt; bundle   This installed jekyll, because that’s what bundle does! It looks in you Gemfile and installs all the gems you need for the project.   At this point, I was able to make a toy file index.html in the my-website/ root directory, and then run at the terminal:   &gt; jekyll serve --livereload   Jekyll is a static site generator! So when I run this command, it first automatically does a jekyll build, which creates a new directory _site/ containing all the pages to be published online as HTML.   With the _site/ built, jekyll serve now gives me access to a local port http://localhost:4000/ that I can navigate to in a new internet browser window, and --livereload will insure that most changes I make on VS Code are automatically shown in the browser! Some changes (like those to _config.yml) will need to have the server restarted to show them (i.e., a new jekyll build has to run).   Overall, we have a great environment with VS Code for editing files, and the browser for viewing our website. There’s so much more jekyll to learn.   Minimal Mistakes   Building up an entire website from scratch with jekyll would be a lot of work, especially for something asthetically pleasing. So I took a common shortcut, and used the minimal mistakes jekyll theme to get something decent up and running.   Basically, you get a whole bunch of page layouts and boilerplate code in the jekyll language and structure with this repository that you can do a ton of customization on. There’s a nice quick-start guide here that I used.   Getting Minimal Mistakes to Work on GitHub   At first, I naively tried to use the gem-based method to get the template running. That actually worked pretty well in VS Code in my local browser. Just adding this gem and running the build and server got it working locally. I was able to play around a lot and spin up a website.   BUT WAIT, since the location I was deploying the site (github pages, coming up below) is limited in its build-ability (see this SO conversation), my naive approach didn’t work.   Instead you need to follow here, and have a Gemfile that looks like:   source \"https://rubygems.org\"  gem \"github-pages\", group: :jekyll_plugins gem \"jekyll-include-cache\", group: :jekyll_plugins   You also need to:      Add jekyll-include-cache to the plugins array of your _config.yml   Run bundle in the directory to update teh bundled gems   Add remote_theme: \"mmistakes/minimal-mistakes\" to your _config.yml file. Remove any other theme: or remote_theme: entry   Proto Directory Structure   After a lot of fooling around, I ended up with a prototype for my website that basically looked like:   my-website ├── _data                      # data files for customizing the theme |  ├── navigation.yml          # main navigation links |  └── ui-text.yml             # text used throughout the theme's UI ├── _pages                     # a sub-directory with all pages on my site |  ├── 404.md                   |  ├── about.md                 |  ├── cv.md                    |  ├── publications.md          |  └── research.md              ├── assets |  ├── documents               # some documents I link to |  ├── images                  # images on my website |  └── videos                  # videos on my website ├── README.md                  ├── _config.yml                # site configuration ├── Gemfile                    # gem file dependencies └── Gemfile.lock               # gemlock file, you can actually delete this   The git commit with all of that is here.   BUT WAIT, where the heck is all of the other files that jekyll needs… assets, _layouts, _includes, and _sass are stored in the theme’s gem! So I don’t need to make these directories or files! If you would like to make changes, create the files and Jekyll will prefer your local copy (source).   Where to host?   If you’re like me, then you may have dove deep on spinning up a nice website at http://localhost:4000/ while running jekyll serve in VS Code. Now comes the question, where do I actually deploy my website online so other people can see it?   Basically, this comes down to a matter of getting the static _site/ directory hosted on a server somewhere.   I deployed my site with github pages, mostly because it’s free and you can find a lot of help online from people doing the same.   Setting up github   First I created a new repository on my github account called [USERNAME].github.io (for me that would be repo at https://github.com/bpurinton/bpurinton.github.io). I set it to Public and initialized it with no license or README.   Now, back in my nice website directory, I renamed the directory bpurinton.github.io to match my github repo. I also added a README file, but I left this mostly blank.   Since I had been running the static site built with jekyll serve (which runs jekyll build), I had the _site/ directory ready to go. But github pages runs its own build on the repo, so at this point I can actually delete the _site/ directory. Basically, I use _site/ when I’m in production mode in VS Code and using the local port browser to make updates. When it’s time to push stuff to github, I just delete this directory. There’s probably a better way to do this by preventing _site/ from pushing, but that’s something for future Ben.   At this point I ran the following git commands from the VS Code terminal in the website directory (because I have git installed and available at the command line):   # initialize the repository with a .git/ directory git init  # add all files in the directory git add .  # commit the files git commit -m \"first commit\"  # set the current branch (I think?) git branch -M main  # set the upstream push location git remote add origin https://github.com/bpurinton/bpurinton.github.io.git  # push my files up git push -u origin main   Deploying   Now we need to do a few things (always pushing the changes with new git commits):      In _config.yml set url : \"https://[USERNAME].github.io\" and set repository : \"[USERNAME]/[USERNAME].github.io\"   On the github repository, go to “Settings” &gt; “Pages” and set the “Source” &gt; “Deploy from branch”, “Branch” to main.   Make sure the page is deployed at https://[USERNAME].github.io   The deployment will be running in the “Actions” tab of the repository, and you can monitor it there (everytime you push a change to your github repo, this action will be run). If there are errors, the page won’t deploy, but if everything goes well, then you will see the confirmation and if you navigate to https://[USERNAME].github.io, then you will see your static website online!   ","categories": [],
        "tags": ["jekyll","github-pages","minimal-mistakes"],
        "url": "/fresh-jekyll/",
        "teaser": "/assets/images/favicon-32x32.png"
      },{
        "title": "First Post!",
        "excerpt":"This blog is going to be a collection of notes to myself, hopefully some of these are useful to others. I will post about computer programming and mix that in with some Earth science, because, you guessed it, I &lt;3 Dirt.   After years of working off a forked copy of the minimal mistakes Jekyll theme for academic pages (here), I decided it was time to start from scratch. I had little understanding of website development in 2018 when I first setup my site. Now that I’m learning more about Ruby on Rails, HTML, CSS, and how to deploy a site, I’m ready to build up a new, simplified website.   ","categories": [],
        "tags": [],
        "url": "/hi/",
        "teaser": "/assets/images/favicon-32x32.png"
      },{
    "title": "Page Not Found",
    "excerpt":"Sorry, but the page you were trying to view does not exist — perhaps you can try searching for it below.       ","url": "http://localhost:4000/404.html"
  },{
    "title": "Earth Scientist",
    "excerpt":"   I used to sit in class and listen to the terms come floating down the room like paper airplanes. Geology was called a descriptive science, and with its pitted outwash plains and drowned rivers, its hanging tributaries and starved coastlines, it was nothing if not descriptive. It was a fountain of metaphor… - John McPhee    Who?   Hey, I’m Ben. Formerly a scientist within the Remote Sensing and Earth Surface Processes research group at the University of Potsdam in Germany. Now freelancing in sub-arctic Nome, Alaska.   What?   My background is in geology, including field observations and mapping, but I specialized in remote sensing and geomorphology. I use satellites, drones, handheld cameras, geodetic measurements, and a lot of computer coding to investigate water and sediment (boulders, pebbles, and, yes, even dirt) routing through landscapes. I’m particularly interested in bridging gaps between close-up and far-away measurements, and in pushing the limits of available technologies with quantitative techniques.   Where?   I try and keep things open source, you can check out my GitHub for code snippets and inspiration. I enjoy science communication and get my fix via instagram. I should probably tweet, but I don’t.   On this site, my research page contains some of the science I’ve done, with a few links to the publications that came out of it. You can also find my current CV.   By the way, I started blogging. Let’s see how that goes!         Quebrada del Toro in northwestern Argentina, my PhD study area.     Opportunities  Get in touch for collaboration!  ","url": "http://localhost:4000/"
  },{
    "title": "CV",
    "excerpt":"  Link to my current full CV     And here’s a reduced one pager  ","url": "http://localhost:4000/cv/"
  },{
    "title": "My Blog - Science, Coding, etc.",
    "excerpt":"                              First Post!                   03 Jan 2023      This blog is going to be a collection of notes to myself, hopefully some of these are useful to others. I will post about computer programming and mix that in with some Earth science, because, you guessed it, I &lt;3 Dirt.                                 Getting started with a jekyll, minimal mistakes, and github pages                   03 Jan 2023      This site was built with jekyll. In my own words, this is a static (as opposed to dynamic? I think so) website generator that is written in the programming language Ruby. Jekyll uses a defined file structure, similar to Ruby on Rails, where there are specific ways to name folders and files (e.g., _layouts/, _includes/, _data/navigation.yml).                                 Deploying github page to own domain                   03 Jan 2023      I wanted something a little more professional than https://[USERNAME].github.io for my website name. Come on, https://bendirt.com is at least memorable!                                 Changing in-line code color                   03 Jan 2023      I was getting annoyed with the difficulty of seeing the code with `` (backtick) symbols in my blog posts. To change these colors I went into my _sass/minimal-mistakes/_base.scss file and changed this part of the code:                    Older           Newer    ","url": "http://localhost:4000/blog/"
  },{
    "title": null,
    "excerpt":"var idx = lunr(function () {   this.field('title')   this.field('excerpt')   this.field('categories')   this.field('tags')   this.ref('id')    this.pipeline.remove(lunr.trimmer)    for (var item in store) {     this.add({       title: store[item].title,       excerpt: store[item].excerpt,       categories: store[item].categories,       tags: store[item].tags,       id: item     })   } });  $(document).ready(function() {   $('input#search').on('keyup', function () {     var resultdiv = $('#results');     var query = $(this).val().toLowerCase();     var result =       idx.query(function (q) {         query.split(lunr.tokenizer.separator).forEach(function (term) {           q.term(term, { boost: 100 })           if(query.lastIndexOf(\" \") != query.length-1){             q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })           }           if (term != \"\"){             q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })           }         })       });     resultdiv.empty();     resultdiv.prepend(''+result.length+' Result(s) found ');     for (var item in result) {       var ref = result[item].ref;       if(store[ref].teaser){         var searchitem =           ''+             ''+               ''+                 ''+store[ref].title+''+               ' '+               ''+                 ''+               ''+               ''+store[ref].excerpt.split(\" \").splice(0,20).join(\" \")+'... '+             ''+           '';       }       else{     \t  var searchitem =           ''+             ''+               ''+                 ''+store[ref].title+''+               ' '+               ''+store[ref].excerpt.split(\" \").splice(0,20).join(\" \")+'... '+             ''+           '';       }       resultdiv.append(searchitem);     }   }); }); ","url": "http://localhost:4000/assets/js/lunr/lunr-en.js"
  },{
    "title": null,
    "excerpt":"step1list = new Array(); step1list[\"ΦΑΓΙΑ\"] = \"ΦΑ\"; step1list[\"ΦΑΓΙΟΥ\"] = \"ΦΑ\"; step1list[\"ΦΑΓΙΩΝ\"] = \"ΦΑ\"; step1list[\"ΣΚΑΓΙΑ\"] = \"ΣΚΑ\"; step1list[\"ΣΚΑΓΙΟΥ\"] = \"ΣΚΑ\"; step1list[\"ΣΚΑΓΙΩΝ\"] = \"ΣΚΑ\"; step1list[\"ΟΛΟΓΙΟΥ\"] = \"ΟΛΟ\"; step1list[\"ΟΛΟΓΙΑ\"] = \"ΟΛΟ\"; step1list[\"ΟΛΟΓΙΩΝ\"] = \"ΟΛΟ\"; step1list[\"ΣΟΓΙΟΥ\"] = \"ΣΟ\"; step1list[\"ΣΟΓΙΑ\"] = \"ΣΟ\"; step1list[\"ΣΟΓΙΩΝ\"] = \"ΣΟ\"; step1list[\"ΤΑΤΟΓΙΑ\"] = \"ΤΑΤΟ\"; step1list[\"ΤΑΤΟΓΙΟΥ\"] = \"ΤΑΤΟ\"; step1list[\"ΤΑΤΟΓΙΩΝ\"] = \"ΤΑΤΟ\"; step1list[\"ΚΡΕΑΣ\"] = \"ΚΡΕ\"; step1list[\"ΚΡΕΑΤΟΣ\"] = \"ΚΡΕ\"; step1list[\"ΚΡΕΑΤΑ\"] = \"ΚΡΕ\"; step1list[\"ΚΡΕΑΤΩΝ\"] = \"ΚΡΕ\"; step1list[\"ΠΕΡΑΣ\"] = \"ΠΕΡ\"; step1list[\"ΠΕΡΑΤΟΣ\"] = \"ΠΕΡ\"; step1list[\"ΠΕΡΑΤΑ\"] = \"ΠΕΡ\"; step1list[\"ΠΕΡΑΤΩΝ\"] = \"ΠΕΡ\"; step1list[\"ΤΕΡΑΣ\"] = \"ΤΕΡ\"; step1list[\"ΤΕΡΑΤΟΣ\"] = \"ΤΕΡ\"; step1list[\"ΤΕΡΑΤΑ\"] = \"ΤΕΡ\"; step1list[\"ΤΕΡΑΤΩΝ\"] = \"ΤΕΡ\"; step1list[\"ΦΩΣ\"] = \"ΦΩ\"; step1list[\"ΦΩΤΟΣ\"] = \"ΦΩ\"; step1list[\"ΦΩΤΑ\"] = \"ΦΩ\"; step1list[\"ΦΩΤΩΝ\"] = \"ΦΩ\"; step1list[\"ΚΑΘΕΣΤΩΣ\"] = \"ΚΑΘΕΣΤ\"; step1list[\"ΚΑΘΕΣΤΩΤΟΣ\"] = \"ΚΑΘΕΣΤ\"; step1list[\"ΚΑΘΕΣΤΩΤΑ\"] = \"ΚΑΘΕΣΤ\"; step1list[\"ΚΑΘΕΣΤΩΤΩΝ\"] = \"ΚΑΘΕΣΤ\"; step1list[\"ΓΕΓΟΝΟΣ\"] = \"ΓΕΓΟΝ\"; step1list[\"ΓΕΓΟΝΟΤΟΣ\"] = \"ΓΕΓΟΝ\"; step1list[\"ΓΕΓΟΝΟΤΑ\"] = \"ΓΕΓΟΝ\"; step1list[\"ΓΕΓΟΝΟΤΩΝ\"] = \"ΓΕΓΟΝ\";  v = \"[ΑΕΗΙΟΥΩ]\"; v2 = \"[ΑΕΗΙΟΩ]\"  function stemWord(w) {   var stem;   var suffix;   var firstch;   var origword = w;   test1 = new Boolean(true);    if(w.length '+result.length+' Result(s) found ');     for (var item in result) {       var ref = result[item].ref;       if(store[ref].teaser){         var searchitem =           ''+             ''+               ''+                 ''+store[ref].title+''+               ' '+               ''+                 ''+               ''+               ''+store[ref].excerpt.split(\" \").splice(0,20).join(\" \")+'... '+             ''+           '';       }       else{     \t  var searchitem =           ''+             ''+               ''+                 ''+store[ref].title+''+               ' '+               ''+store[ref].excerpt.split(\" \").splice(0,20).join(\" \")+'... '+             ''+           '';       }       resultdiv.append(searchitem);     }   }); }); ","url": "http://localhost:4000/assets/js/lunr/lunr-gr.js"
  },{
    "title": null,
    "excerpt":"var store = [   {%- for c in site.collections -%}     {%- if forloop.last -%}       {%- assign l = true -%}     {%- endif -%}     {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}     {%- for doc in docs -%}       {%- if doc.header.teaser -%}         {%- capture teaser -%}{{ doc.header.teaser }}{%- endcapture -%}       {%- else -%}         {%- assign teaser = site.teaser -%}       {%- endif -%}       {         \"title\": {{ doc.title | jsonify }},         \"excerpt\":           {%- if site.search_full_content == true -%}             {{ doc.content | newline_to_br |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \"|             strip_html | strip_newlines | jsonify }},           {%- else -%}             {{ doc.content | newline_to_br |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \" |               replace:\" \", \" \"|             strip_html | strip_newlines | truncatewords: 50 | jsonify }},           {%- endif -%}         \"categories\": {{ doc.categories | jsonify }},         \"tags\": {{ doc.tags | jsonify }},         \"url\": {{ doc.url | relative_url | jsonify }},         \"teaser\": {{ teaser | relative_url | jsonify }}       }{%- unless forloop.last and l -%},{%- endunless -%}     {%- endfor -%}   {%- endfor -%}{%- if site.lunr.search_within_pages -%},   {%- assign pages = site.pages | where_exp:'doc','doc.search != false' -%}   {%- for doc in pages -%}     {%- if forloop.last -%}       {%- assign l = true -%}     {%- endif -%}   {     \"title\": {{ doc.title | jsonify }},     \"excerpt\":         {%- if site.search_full_content == true -%}           {{ doc.content | newline_to_br |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \"|           strip_html | strip_newlines | jsonify }},         {%- else -%}           {{ doc.content | newline_to_br |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \" |             replace:\" \", \" \"|           strip_html | strip_newlines | truncatewords: 50 | jsonify }},         {%- endif -%}       \"url\": {{ doc.url | absolute_url | jsonify }}   }{%- unless forloop.last and l -%},{%- endunless -%}   {%- endfor -%} {%- endif -%}] ","url": "http://localhost:4000/assets/js/lunr/lunr-store.js"
  },{
    "title": "Publications",
    "excerpt":"  See also: [Google Scholar Profile](https://scholar.google.de/citations?user=EacO3GQAAAAJ&hl=en){:target=\"_blank\"} and [ORCID](https://orcid.org/0000-0001-8504-8115){:target=\"_blank\"}     If you can't access a paper, email me and I'll send you a personal copy.     **Purinton, B.**, Mueting, A. and Bookhagen, B.: Image Texture as Quality Indicator for Optical DEM Generation: Geomorphic Applications in the Arid Central Andes, _Remote Sensing_, [https://doi.org/10.3390/rs15010085](https://www.mdpi.com/2072-4292/15/1/85){:target=\"_blank\"}, 2023.  **Purinton, B.** and Bookhagen, B.: Beyond vertical point accuracy: Assessing inter-pixel consistency in 30 m global DEMs for the arid Central Andes, _Frontiers in Earth Science_, [https://doi.org/10.3389/feart.2021.758606](https://www.frontiersin.org/articles/10.3389/feart.2021.758606){:target=\"_blank\"}, 2021.  **Purinton, B.** and Bookhagen, B.: Tracking Downstream Variability in Large Grain-Size Distributions in the South-Central Andes, _Journal of Geophysical Research: Earth Surface_, 126(8):e2021JF006260, [https://doi.org/10.1029/2021JF006260](https://doi.org/10.1029/2021JF006260){:target=\"_blank\"}, 2021.  **Purinton, B.** and Bookhagen, B.: Multiband (X, C, L) radar amplitude analysis for a mixed sand- and gravel-bed river in the eastern Central Andes, _Remote Sensing of Environment_, 246:111799, [https://doi.org/10.1016/j.rse.2020.111799](https://doi.org/10.1016/j.rse.2020.111799){:target=\"_blank\"}, 2020.  **Purinton, B.** and Bookhagen, B.: Introducing PebbleCounts: A grain-sizing tool for photo surveys of dynamic gravel-bed rivers, _Earth Surface Dynamics_, 7, 859–877, [https://doi.org/10.5194/esurf-7-859-2019](https://doi.org/10.5194/esurf-7-859-2019){:target=\"_blank\"}, 2019.  **Purinton, B.** and Bookhagen, B.: Measuring decadal vertical land-level changes from SRTM-C (2000) and TanDEM-X (~2015) in the south-central Andes, _Earth Surface Dynamics_, 6, 971-987, [https://doi.org/10.5194/esurf-6-971-2018](https://doi.org/10.5194/esurf-6-971-2018){:target=\"_blank\"}, 2018.  **Purinton, B.** and Bookhagen, B.: Validation of digital elevation models (DEMs) and comparison of geomorphic metrics on the southern Central Andean Plateau, _Earth Surface Dynamics_, 5, 211-237, [https://doi.org/10.5194/esurf-5-211-2017](https://doi.org/10.5194/esurf-5-211-2017){:target=\"_blank\"}, 2017. ","url": "http://localhost:4000/publications/"
  },{
    "title": "Research",
    "excerpt":"## Landscape recovery following wildfire  For my B.A. at Wesleyan University I had the opportunity to work on a [Keck Consortium](https://keckgeology.org/){:target=\"_blank\"} research project in the Colorado Front Range. In summer 2012, following geology field camp school in Wyoming, Idaho, and Montana, I moved into a cabin at Colorado University's [Mountain Research Station](https://www.colorado.edu/mrs/){:target=\"_blank\"} to begin four weeks studying the impact of a 2010 wildfire in Fourmile Canyon outside Boulder, Colorado. I studied the relaxation time of extreme erosion events brought on by moderate rainfall following the fire, and also the influence of historical mine tailings piles on the geochemistry of the sediment. Here's my [thesis](/assets/documents/BP_ba_thesis.pdf){:target=\"_blank\"}.      A typical Wyoming view during field school.      Return of grasses and shrubs among severely burned trees in Fourmile Canyon.    ---  ## Measuring topography from space  ### Validation of DEMs  In this work for my masters I validated the elevation accuracy and geomorphic potential of near-global spaceborne Digital Elevation Models (DEMs), including SRTM-C, TanDEM-X, ALOS World 3D, and ASTER GDEM2. I also worked on photogrammetric DEM production with raw optical scenes like ASTER L1A, RapidEye, SPOT6, and ALOS PRISM, as well as interferometric DEM production from TerraSAR-X/TanDEM-X CoSSC scenes. Validation was carried out with a huge dataset of differential GNSS measurements collected over three field seasons in northwestern Argentina. Here's the [publication in Earth Surface Dynamics](https://www.earth-surf-dynam.net/5/211/2017/){:target=\"_blank\"} that came out of it. More recently, we also improved on validation using sparse benchmark data through Fourier analysis in the frequency domain to examine the inter-pixel consistency of spaceborne DEMs. You can read about that in [Frontiers](https://www.frontiersin.org/articles/10.3389/feart.2021.758606){:target=\"_blank\"}.    Collecting differential GPS measurements from a salar following a rare rain event on the arid and remote Puna Plateau in Argentina.    ### Measuring decadal land-level changes using DEMs  Akin to studies of DEM differencing for measuring snow and ice change, I applied careful correction and differencing to the TanDEM-X (collected 2011-2015) and SRTM-C (collected 2000) DEMs to measure ~15 years of land-level changes in some large catchments draining the eastern flank of the Andes in northwestern Argentina. Due to the small magnitude of most land-level changes, the 15-year separation between the DEMs only allowed for sparse automated geophysical results. These vertical change signals were defined outside of remaining vertical uncertainty, primarily caused by the lower quality SRTM-C DEM, despite careful bias correction procedures developed. We were able to gain insight into riverbed aggradation and incision in the Río Toro and Río Grande, particulalry in downstream sections, which are steeper (due to knickpoints), wetter, and modified by anthropogenic activity. Here's the [publication in Earth Surface Dynamics](https://www.earth-surf-dynam.net/6/971/2018/){:target=\"_blank\"} that came out of it.          Lower Río Toro shot on a DJI Mavic Pro drone. Note the big gravel piles being formed to prevent rapid channel-bed aggradation.    ---   ## River surveys, pebble counting, and downstream changes in sediment character from SAR  Moving from the scale of entire catchments using meter-scale spaceborne DEMs, I collected 1,000-5,000 m2 river-bed surveys at sub-cm scales. The surveys, amounting to over 50,000 photos, were collected using a camera-on-mast setup (see the videos below). We also flew some drone surveys to supplement these data. Point clouds, micro-DEMs, and orthomosaics were generated by structure-from-motion and multi-view stereo (SfM-MVS) processing. Following dissatisfying results from existing tools, our intention to count the grain-size distributions was realized in our Python-based software [PebbleCounts](https://github.com/UP-RS-ESP/PebbleCounts){:target=\"_blank\"}, with the accompanying paper [in Earth Surface Dynamics](https://www.earth-surf-dynam.net/7/859/2019/){:target=\"_blank\"}.  Recently, we applied PebbleCounts to examine downstream fining in the Quebrada del Toro in northwestern Argentina, and we found some interesting variability at the coarse tail of the distribution. Read about that in [JGR](https://doi.org/10.1029/2021JF006260){:target=\"_blank\"}.  We also explored the use of spaceborne Synthetic Aperature Radar (SAR) measurements of surface roughness from channel beds using satellites like TerraSAR-X, Sentinel-1, and ALOS PALSAR. These SAR data can be used mainly for discerning gravel and sand transitions over huge areas, but it is hard to look at absolute grain sizes in the channel...see the publication [in Remote Sensing of Environment](https://doi.org/10.1016/j.rse.2020.111799){:target=\"_blank\"}.          Surveying in the upper Quebrada del Toro Catchment in calm conditions.             Surveying in the upper Quebrada del Toro Catchment in high winds on a Quaternary fluvial terrace.   ","url": "http://localhost:4000/research/"
  },{
    "title": null,
    "excerpt":"{% if page.xsl %}{% endif %}Jekyll{{ site.time | date_to_xmlschema }}{{ page.url | absolute_url | xml_escape }}{% assign title = site.title | default: site.name %}{% if page.collection != \"posts\" %}{% assign collection = page.collection | capitalize %}{% assign title = title | append: \" | \" | append: collection %}{% endif %}{% if page.category %}{% assign category = page.category | capitalize %}{% assign title = title | append: \" | \" | append: category %}{% endif %}{% if title %}{{ title | smartify | xml_escape }}{% endif %}{% if site.description %}{{ site.description | xml_escape }}{% endif %}{% if site.author %}{{ site.author.name | default: site.author | xml_escape }}{% if site.author.email %}{{ site.author.email | xml_escape }}{% endif %}{% if site.author.uri %}{{ site.author.uri | xml_escape }}{% endif %}{% endif %}{% if page.tags %}{% assign posts = site.tags[page.tags] %}{% else %}{% assign posts = site[page.collection] %}{% endif %}{% if page.category %}{% assign posts = posts | where: \"category\", page.category %}{% endif %}{% unless site.show_drafts %}{% assign posts = posts | where_exp: \"post\", \"post.draft != true\" %}{% endunless %}{% assign posts = posts | sort: \"date\" | reverse %}{% assign posts_limit = site.feed.posts_limit | default: 10 %}{% for post in posts limit: posts_limit %}{% assign post_title = post.title | smartify | strip_html | normalize_whitespace | xml_escape %}{{ post_title }}{{ post.date | date_to_xmlschema }}{{ post.last_modified_at | default: post.date | date_to_xmlschema }}{{ post.id | absolute_url | xml_escape }}{% assign excerpt_only = post.feed.excerpt_only | default: site.feed.excerpt_only %}{% unless excerpt_only %}{{ post.content | strip | xml_escape }}{% endunless %}{% assign post_author = post.author | default: post.authors[0] | default: site.author %}{% assign post_author = site.data.authors[post_author] | default: post_author %}{% assign post_author_email = post_author.email | default: nil %}{% assign post_author_uri = post_author.uri | default: nil %}{% assign post_author_name = post_author.name | default: post_author %}{{ post_author_name | default: \"\" | xml_escape }}{% if post_author_email %}{{ post_author_email | xml_escape }}{% endif %}{% if post_author_uri %}{{ post_author_uri | xml_escape }}{% endif %}{% if post.category %}{% elsif post.categories %}{% for category in post.categories %}{% endfor %}{% endif %}{% for tag in post.tags %}{% endfor %}{% if post.excerpt and post.excerpt != empty %}{{ post.excerpt | strip_html | normalize_whitespace | xml_escape }}{% endif %}{% assign post_image = post.image.path | default: post.image %}{% if post_image %}{% unless post_image contains \"://\" %}{% assign post_image = post_image | absolute_url %}{% endunless %}{% endif %}{% endfor %}","url": "http://localhost:4000/feed.xml"
  },{
    "title": null,
    "excerpt":" {% if page.xsl %} {% endif %} {% assign collections = site.collections | where_exp:'collection','collection.output != false' %}{% for collection in collections %}{% assign docs = collection.docs | where_exp:'doc','doc.sitemap != false' %}{% for doc in docs %} {{ doc.url | replace:'/index.html','/' | absolute_url | xml_escape }} {% if doc.last_modified_at or doc.date %}{{ doc.last_modified_at | default: doc.date | date_to_xmlschema }} {% endif %} {% endfor %}{% endfor %}{% assign pages = site.html_pages | where_exp:'doc','doc.sitemap != false' | where_exp:'doc','doc.url != \"/404.html\"' %}{% for page in pages %} {{ page.url | replace:'/index.html','/' | absolute_url | xml_escape }} {% if page.last_modified_at %}{{ page.last_modified_at | date_to_xmlschema }} {% endif %} {% endfor %}{% assign static_files = page.static_files | where_exp:'page','page.sitemap != false' | where_exp:'page','page.name != \"404.html\"' %}{% for file in static_files %} {{ file.path | replace:'/index.html','/' | absolute_url | xml_escape }} {{ file.modified_time | date_to_xmlschema }}  {% endfor %} ","url": "http://localhost:4000/sitemap.xml"
  },{
    "title": null,
    "excerpt":"Sitemap: {{ \"sitemap.xml\" | absolute_url }} ","url": "http://localhost:4000/robots.txt"
  }]
