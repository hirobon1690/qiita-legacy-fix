// ==UserScript==
// @name         Qiita legacy fix
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Replace markdown-style headers (#, ##, etc.) with <h1>, <h2>, etc. in the entire article.
// @author       hirobon1690 using chatGPT
// @match        *://*.qiita.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Debugging function
    function log(msg) {
        console.log(`[MarkdownHeaderScript] ${msg}`);
    }
    // Select the article body container
    const articleBody = document.querySelector('#personal-public-article-body .mdContent-inner');

    if (articleBody) {

        // Convert Markdown headers to HTML headers
        articleBody.innerHTML = articleBody.innerHTML.replace(/(#{1,6})\s*(.+)/g, (_, hashes, text) => {
            const headerLevel = hashes.length; // Number of '#' determines the level
            if (headerLevel <= 6) {
                return `<h${headerLevel}>${text.trim()}</h${headerLevel}>`;
            }
            return _;
        });

    } else {
        log("Article body container not found.");
    }
})();
