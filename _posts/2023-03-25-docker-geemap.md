---
# layout: posts
title: Running dockerized google earth engine (GEE) map 
toc: true
toc_label: "Content"
toc_sticky: true
tags: docker geemap python jupyter 
# header:
  # teaser: /assets/images/thumbnails/udacity-ds-nanodegree-800.png
# excerpt: "Review of Udacity Data Science Nanodegree and Intro to Machine Learning Nanodegree"
---

The steps I took to open and run a dockerized [geemap](https://geemap.org/){:target="_blank"}:

1. Install docker and learn some useful commands
2. Gather the geemap image from [https://hub.docker.com/r/bkavlak/geemap](https://hub.docker.com/r/bkavlak/geemap) with a `docker pull` because it seemed like the most updated. I did not follow the instructions for staring things there exactly. I also used a nice [youtube video from Simon Mudd](https://www.youtube.com/watch?v=X1qbmmIfD74&ab_channel=SimonMariusMudd). So the following instructions are somewhat bespoke.
3. Make a local directory `~/geemap-data` which will be the bridge between the container running the application and my local computer
4. Start the docker container based on the image by running:
	```bash
	docker run -it --name geemap -p 8888:8888 -v ~/geemap-data:/geemap/data bkavlak/geemap:latest
	```
5. This will put me inside the container, where I should see the `data` directory that is connected to my `~/geemap-data` local folder.
6. Start a jupyter environment by running:
	```bash
	jupyter lab --ip=0.0.0.0 --port=8888 --allow-root
	```
7. Open `localhost:8888` and copy-paste the unique `token=...` into the browser.
8. Start a notebook and run `ee.Authenticate()` to go through the pipeline of getting an authentication token. This needs to be done everytime I open the container. There's probably a way around this but it's not a huge deal to re-authenticate when I'm starting work for the day.
9. Work away and save everything into `data/` (which will pipe it to my local `~/geemap-data` folder).
10. When I exit the container, I also need to delete it or it won't open next time due to the name being taken. I have tried to just re-open the container, but I'm having problems there. Again, not ideal but it works for now! This is how I drop the container (the image stays though so it makes for quick rebooting from step 4 above):
	```bash
	docker ps -a
	docker rm -f <container-ID>
	```

Now I can make some sweet maps:

![](/assets/images/sentinel1.gif)

# Some more notes on docker

On my M2 Mac with `arm64` Apple Silicon architecture, I need to build images by adding `FROM --platform=linux/amd64 <parent-image>` to the top of the `Dockerfile`.

Then I can build as usual with `docker build -t <image-name> .`

Then when I want to run an image locally I need to supply the platform with `docker run -it --platform linux/amd64 <image-name>` 
