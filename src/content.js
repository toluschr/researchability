import { Readability } from "@mozilla/readability";
import TurndownService from 'turndown';

let article = new Readability(document.cloneNode(true)).parse();
let turndownService = new TurndownService({codeBlockStyle: "fenced"});

turndownService.addRule('preCodeBlock', {
    filter: 'pre',
    replacement: function (content, node, options) {
        let code = node.textContent;
        let language = node.dataset.language ?? "";

        return `\n\`\`\`${language}\n${code}\`\`\`\n`;
    }
});

let markdown = turndownService.turndown(article.content);
let blob = new Blob([markdown], { type: "text/markdown" });
let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = `${document.title}.md`;
link.click();
URL.revokeObjectURL(link.href);
