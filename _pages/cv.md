---
layout: splash
classes:
  - wide
title: "CV"
permalink: /cv/
author_profile: false
redirect_from:
  - /resume
---

<style>
.cv-header {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
}

.cv-link-button {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #e8b76b, #d4a347);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 0 10px;
}

.cv-link-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    color: white;
}

.cv-iframe-container {
    width: 100%;
    height: 1200px;
    margin-top: 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.cv-iframe {
    width: 100%;
    height: 100%;
    border: none;
}

@media (max-width: 768px) {
    .cv-iframe-container {
        height: 800px;
    }
    
    .cv-link-button {
        display: block;
        margin: 10px auto;
        width: 200px;
        text-align: center;
    }
}
</style>

<div class="cv-iframe-container">
    <iframe src="/cv-current" class="cv-iframe" title="Benjamin Purinton CV"></iframe>
</div>

<div class="cv-header">
    <a href="/cv-builder" class="cv-link-button">✏️ CV Builder</a>
</div>
