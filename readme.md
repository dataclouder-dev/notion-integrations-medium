####  DEVELOPING PLEASE Ignore project until is ready 


## Notion Integrations 


Simple project to automate,

Context, i've trying to do this use marker tool available, this lead me to make.com, n8n, pipedream, zapier, make.com was better but somehow i need something custom.
How is posible to automate and create trigger when new item to database is created? that means notion has and event drive api, 
publish/suscription, webhook, trigger or whatever you can call it, but notion notifies first, 

Well after long long research, checking notion official API, and play around with the previus tools, i relieazed these were calling api every certain time and check for updates, so  i conclude is not posible suscribe to events possible comming soon since they add this feature call automation to the table. 

So lets do the same, 
one simple function that call notion api table, if new item then publish to medium. 

then you can call it manually from whatever tool even browser or automate with schedule with explain everything. 


### About the project 

I wanted this project easy to understand. universal almost every one should understand the code 
so Javascript and Express is the anwers, but is really hard to check Errors on JS so i update it to TS. 
don't let it scare you pretty much the same. common this little project only contains 2 TS files i encorage you to take a glance at the code. and feel free to comment or create pull Request. 


## How to run 
Well first get integrations token and identify DB.
### How to get notion integration
Follow the official documentation

#### identify the DB that you want to use as blog source and get id

rename file .env-example to just .env and add your variables

### How to test in local 
Use the script to test on local 

### Scripts

npm run build: compile code 
npm run start: compile and run
npm run dev: compile on file changes


### Debuging 
VS: go to debug and run tab, select node script, then run Script dev. 
Staring adding your breackpoits.

Browser: npm run dev add the flag --inspect to nodemon so you can open devtool kits in google chrome and add debugger break points manually.


### How to automate it 

Well deploy the project and call api when ever you want to post articles.


### My Best choice for architecture
I select this becouse my experice on google cloud and the 0 cost for ever!!!!!

For future
more information you can follow my  article or video in my spanish youtube channel use subtitles (No exists will be)




## Libraries

dotenv: put your variables
express: web framework
@notionhq/client : skd for notion

Estos 2 venian juntos segun para recargar el proyecto
"concurrently": "^8.2.1",
"nodemon": "^3.0.1",

### Other libraries 

to take in consideration 

Project render notion page. 
https://github.com/asnunes/notion-page-to-html

but this can be a better option for future. 
https://github.com/kerwanp/notion-render


TODOs:

medium.ts check last_edited_time, to update articles when they have change
Add properties to table to know if is exported, and check box to mark as draft. 
Error handling
