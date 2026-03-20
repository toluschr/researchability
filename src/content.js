import { Readability } from "@mozilla/readability";
import TurndownService from 'turndown';
import yaml from 'js-yaml';

let readability = new Readability(document.cloneNode(true))
let article = readability.parse();
let turndownService = new TurndownService({codeBlockStyle: "fenced"});

turndownService.addRule('preCodeBlock', {
    filter: 'pre',
    replacement: function (content, node, options) {
        let code = node.textContent;
        let language = node.dataset.language ?? "";

        return `\n\`\`\`${language}\n${code}\`\`\`\n`;
    }
});

let frontMatter = yaml.dump({
    title: article.title,
    date: article.publishedTime,
    lang: article.lang,
    url: document.URL,
})

let markdown = `---\n${frontMatter}---\n\n${turndownService.turndown(article.content)}`;
let blob = new Blob([markdown], { type: "text/markdown" });
let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `${article.title}.md`;
link.click();
URL.revokeObjectURL(link.href);
