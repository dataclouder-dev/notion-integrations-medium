### First Commit Ignore project until is ready 

ignore ignore ignore everything. 

### Actualizacion

Retomar la idea del integrador cuando notion exponga sus APIs de eventos. 
llegué a la conclusion de que los automatizadores en el mercado usan llamadas get a las api para detectar cambios cada cierto tiempo. inefiente pero funciona. :(

### ultimo codigo 

revisar server.js en webform-with-express las api para crear!


### Scripts

npm run build :compilar codigo 
npm run start: ejecutar codigo en dist
npm run dev: servidor para leer cambios en archivos

### Descripcion 

Mi proyecto personal con miras a tener miles de estrellas, integrar notion con medium y otras redes sociales 
automatizando el flujo de lo que será mi Metologia Adamo Fig para el Exito en Startups. 


### Creación de projecto 
type se cambio a module para tener sintaxis import dotenv from 'dotenv';
seguí el tutorial de fireship https://www.youtube.com/watch?v=H91aqUHn8sE


### Notion Integrations 
Medium 



## Libraries

dotenv: put your variables
express: web framework
@notionhq/client : connectar con notion v
axios: i know there is native solution, but integrations is all about http request, so lets make it easier with axios

Estos 2 venian juntos segun para recargar el proyecto
"concurrently": "^8.2.1",
"nodemon": "^3.0.1",


### Como funciona 

1) Crear integración y conseguir token

2) Autorizar la base que quieres exportar 

   * Haz click en la base de datos, identificala. 

  * Dale la integración con la app que vas a integrar. 

3) Agrega estas variables al archivo .env  

4) Despliega. 


