const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

appJs = appJs.replace('const workspaceCategories = [', 'const defaultWorkspaceCategories = [');
appJs = appJs.replace('const defaultMessages = [', 'const defaultAppMessages = [');

const replaceStr = `// Cargar estado de LocalStorage o usar por defecto
// Usamos las variables definidas arriba como default.
const allMessages = JSON.parse(localStorage.getItem('uin_messages_v3')) || defaultMessages;
// Eliminamos el let workspaceCategories porque ya está como const arriba
// const workspaceCategories ya tiene los datos. Si quisiéramos sobreescribirlo:
// workspaceCategories = JSON.parse(localStorage.getItem('uin_categories_v3')) || workspaceCategories; (si fuera let)
// Como es solo local, usaremos directo las const definidas arriba para workspaceCategories.

`;

const newStr = `let allMessages = JSON.parse(localStorage.getItem('uin_messages_v3')) || defaultAppMessages;
let workspaceCategories = JSON.parse(localStorage.getItem('uin_categories_v3')) || defaultWorkspaceCategories;
`;

appJs = appJs.replace(replaceStr, newStr);

fs.writeFileSync('app.js', appJs);
console.log('Fixed app.js declarations.');
