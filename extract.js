const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('Guía de Respuestas para CRM — UIN III Cuatrimestre 2026.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

// Extract COPY object
const scriptContent = html.match(/const COPY=(\{.*?\});/s);
let copyDict = {};
if (scriptContent) {
    try {
        copyDict = JSON.parse(scriptContent[1]);
    } catch (e) {
        console.error("Failed to parse COPY JSON");
    }
}

const blocks = document.querySelectorAll('.block');
const result = [];

blocks.forEach(block => {
    const titleEl = block.querySelector('.blocktitle');
    if (!titleEl) return;
    const categoryName = titleEl.textContent.trim().replace(/^Bloque [A-Z] · /, '');

    const category = {
        name: categoryName,
        messages: []
    };

    const fichas = block.querySelectorAll('.ficha');
    fichas.forEach(ficha => {
        const h3 = ficha.querySelector('.fhead h3');
        const codeEl = ficha.querySelector('.fhead .code');
        if (!h3 || !codeEl) return;
        
        const mainTitle = h3.textContent.trim();
        const code = codeEl.textContent.trim();
        
        // Find all copyheads to handle multiple messages per ficha
        const copyHeads = ficha.querySelectorAll('.copyhead');
        
        if (copyHeads.length === 0) {
            // Some might not have copy text, like D3ref (just a table)
            // But we only care about actual messages.
            return;
        }

        copyHeads.forEach(ch => {
            const btn = ch.querySelector('.copybtn');
            if (!btn) return;
            const dataId = btn.getAttribute('data-id');
            const clText = ch.querySelector('.cl').textContent.trim();
            
            let messageTitle = mainTitle;
            
            // Check if there's a sub-title in the copyhead
            if (clText.includes('—')) {
                const subTitle = clText.split('—')[1].trim();
                messageTitle = `${mainTitle} - ${subTitle}`;
            }

            const text = copyDict[dataId] || '';
            if (text) {
                category.messages.push({
                    title: messageTitle,
                    code: code,
                    excerpt: text
                });
            }
        });
    });

    if (category.messages.length > 0) {
        result.push(category);
    }
});

fs.writeFileSync('extracted_data.json', JSON.stringify(result, null, 2));
console.log('Data extracted to extracted_data.json');
