# Readme

### DEVELOPING PLEASE Ignore the project until is ready

## Notion Integrations

### About the project

The intent of this project is to automate some integration and tasks with third-party libraries. 
Let’s start with Medium and see how things are going. 

I wanted this project easy to understand, and I am open to contributions, because the popularity,  Javascript, and Express are the answers, Check architecture docs if you like to understand the project.

### About Medium

Medium is probably the most popular blog platform, you are probably using notion as your main notes, articles, and content manager, so would be better to export Articles as soon as they are ready in your original source?

### Context

I’ve tried to achieve this for a while, this led me to automation tools like Zapier, Make, n8n, Pipedream, etc. These are great tools but I found it very tricky to get the complete flow, some solutions I found from other developer includes external APIs and is barely customizable, that is why I decided to create my own solution, that will share with you, so please leave a start, will be so significant for me to continue the project. 

 

### How is automation possible?

One of the conditions to automate is to have an event driver architecture, There are special APIs called webhooks capable of creating this system, but I was looking at all the notion API documentation, there is no webhook, no events, and no triggers at the creation time. 

So how can Make and Zappier integrate these events? after looking at the platform, I found it.

The always old reliable trick 😑, make a request, ask for new data, and do it forever. Well, nothing to do here, we're going to do the same.

Notion recently integrated automation in databases, You can automate internal things like a page or block creation, I see it coming, This is the first step to get events that we can use to improve automation architecture. 

### How it works?

Is an application that you can run locally or deploy it. 

will query your notion database identify new entries and publish with your medium account trying to mimic the best possible format. 

For more information about why a database is required or how it works check links. 

subscribe to the channel I will explain better how to use the project and what you can achieve. 

## Getting Started

### What you need

- Notion Integration token
    - Follow the official documentation
- Medium Token
    - Follow official documentation
- Identify databases you want to export.
    - The only way is when the page is public you can see the ID
    - Give permission to the integration app you created previusly

### Start the project

The 3 most simple instructions 

1) clone, download 

2) Set environment variables

- use the file to add the tokens and databases you want to export.

```jsx
NOTION_KEY=secret_cZALRUr4CSrOXXXXXXXXXXXXXXXXXLucZIM7
NOTION_DB_IDs=1262c9f128f140000000006eb39c4,c64b0abe2af84000000000d0ae64
MEDIUM_TOKEN=2d048ec47XXXXXXXXXXXXXXX14df7ab6ae89da9aa0836f4ea0a5419f8
```

- Rename file from .env-example to .env

3) Run it

- install dependencies npm install
- run command npm run start

3.1 Optional)

- Deploy it

### How to test in local

Use the script to test on the local

open url, it will look your tables and init exportation

### How to automate it

Well deploy the project and call API every certain time like 10 minutes, so it will simulate and automate almost real time. 

### 

### My Best choice for architecture

I selected this because of my experience with Google Cloud I can select the best components and create an easier tutorial with 0 cost forever!!!!!

![Untitled](Readme%2085d09a8d95934e2cbc0b4da62a643f99/Untitled.png)

I’ll post a video and article on how to do this, check my Spanish YouTube channel use subtitles will be worthy

### Some other tech details

this part will be moved to technical guide. 

### Debugging

```jsx
Browser: npm run dev add the flag --inspect to nodemon so you can open devtool kits in google chrome and add debugger break points manually.
```

### Libraries

| Name | Why |
| --- | --- |
| express |  |
| nodemon |  |
| dotenv |  |
| notionhq/client |  |
| notion-page-to-html | Actually this convert the notion page into HTML to publish in medium |

### Some other cool projects

but this can be a better option for future. [https://github.com/kerwanp/notion-render](https://github.com/kerwanp/notion-render)