Instrucciones para ejecutarse:

1.- Ejecutar archivo script.sql
2.- Instalar dependencias: npm install
3.- Actualizar los campos del archivo: connection.js:
    const sequelize = new Sequelize("[Nombre de base de datos]", "[su usuario]", "[Su contraseña]", {
      host: "[host del servidor de base de datos]",
      dialect: "mysql",  <-- No modificar
      logging: false,
      ssl: true,
      port: "3306", <-- modificar si es que no instalaron MySQL de la forma siguiente, sieguiente...
    });
3.- ejecutar el servidor: npm run dev
