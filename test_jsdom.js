const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const options = {
    resources: "usable",
    runScripts: "dangerously",
    url: "http://localhost:5173/"
};

JSDOM.fromFile('index.html', options).then(dom => {
    // Inject mocks before scripts load
    dom.window.eval(`
        window.supabase = {
            auth: { getSession: async () => ({ data: { session: null } }) },
            from: () => ({ select: () => ({ is: () => ({ order: async () => ({ data: [], error: null }) }) }) })
        };
        window.lucide = { createIcons: () => {} };
        
        window.addEventListener('error', (event) => {
            console.error("BROWSER ERROR CAUGHT:", event.error || event.message);
        });
        window.addEventListener('unhandledrejection', (event) => {
            console.error("BROWSER PROMISE ERROR:", event.reason);
        });
    `);

    setTimeout(() => {
        console.log("Checking after 2 seconds...");
        console.log("Body has classes:", dom.window.document.body.className);
        console.log("Is activeConjuntoId set?", dom.window.activeConjuntoId);
        
        const editBtn = dom.window.document.querySelector('.btn-edit');
        if (editBtn) {
            console.log("Edit button found! Clicking...");
            editBtn.click();
            console.log("Modal show class:", dom.window.document.getElementById('edit-modal').className);
        } else {
            console.log("Edit button NOT found!");
        }
        process.exit(0);
    }, 2000);
}).catch(err => {
    console.error("JSDOM Init Error:", err);
});
