const fs = require('fs');
const path = require('path');

const setupSql = fs.readFileSync('setup_database.sql', 'utf8');

// Extraer el cuerpo de la función handle_new_user_setup
const match = setupSql.match(/BEGIN([\s\S]*?)RETURN new;/);
if (match) {
    let body = match[1];
    // Reemplazar new.id por v_user_id
    body = body.replace(/new\.id/g, 'v_user_id');

    const resultSql = `-- SCRIPT 3: INSTALACIÓN DEL CONJUNTO "GUÍA OFICIAL"
DO $$
DECLARE
  v_user_id UUID;
  new_conjunto_id UUID;
  cat_id UUID;
BEGIN
  -- 1. Buscar al usuario
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'sgamboa@uin.ac.cr' LIMIT 1;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'El usuario sgamboa@uin.ac.cr no existe en auth.users.';
  END IF;

  ${body}

END $$;
`;
    fs.writeFileSync('3_install_oficial.sql', resultSql);
    console.log('Script 3 generado con éxito!');
} else {
    console.log('No se pudo encontrar el cuerpo de la función');
}
