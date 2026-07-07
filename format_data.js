const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('extracted_data.json', 'utf8'));

const categoryMap = [
    { name: 'Carreras y sedes', color: 'bg-indigo', icon: 'map-pin' },
    { name: 'Primer contacto', color: 'bg-pink', icon: 'user-plus' },
    { name: 'Información académica clave', color: 'bg-emerald', icon: 'book-open' },
    { name: 'Financiamiento y costos', color: 'bg-orange', icon: 'credit-card' },
    { name: 'Proceso de matrícula y trámites', color: 'bg-blue', icon: 'file-text' },
    { name: 'Correos del proceso de matrícula', color: 'bg-purple', icon: 'mail' }
];

const workspaceCategories = [];
const defaultMessages = [];

let catIdCounter = 1;
let msgIdCounter = 1;

extracted.forEach(cat => {
    const catConfig = categoryMap.find(c => c.name === cat.name);
    const catId = `cat_${catIdCounter++}`;
    
    workspaceCategories.push({
        id: catId,
        name: cat.name,
        color: catConfig.color,
        icon: catConfig.icon
    });

    cat.messages.forEach(msg => {
        let subCategory = null;
        let title = msg.title;

        if (title.includes('🔬 Lab Presencial') || title.includes('🔬 Lab Presencial')) {
            subCategory = '🔬 CON LABORATORIO PRESENCIAL';
            title = title.replace('🔬 Lab Presencial', '').trim();
        } else if (title.includes('🚌 Gira Académica')) {
            subCategory = '🚌 CON GIRA ACADÉMICA';
            title = title.replace('🚌 Gira Académica', '').trim();
        } else if (title.includes('📚 Curso Doble')) {
            subCategory = '📚 CURSOS DOBLES';
            title = title.replace('📚 Curso Doble', '').trim();
        }

        defaultMessages.push({
            id: msgIdCounter++,
            categoryId: catId,
            subCategory: subCategory,
            code: msg.code,
            title: title,
            excerpt: msg.excerpt
        });
    });
});

fs.writeFileSync('generated_app_data.js', `
const workspaceCategories = ${JSON.stringify(workspaceCategories, null, 4)};

const defaultMessages = ${JSON.stringify(defaultMessages, null, 4)};
`);

console.log("Data formatted for app.js!");
