# hello-world-probot

> a GitHub App built with [probot](https://github.com/probot/probot) 

Hey! This is my "Hello, World" app for Probot's Google Summer of Code application. I tried to trick it out a little to prove my knowledge of the APIs. I hope you like it!

I added functionality for the bot responding to comments,but only comments not made my bots... (I got stuck in one infinite loop too many). 

My ultimate goal for this "Hello, World" project is to be able to compile all of the open issue titles into one central locked issue.

EDIT: Okay this is where I will end this project for now, it now keeps a running list of all the open issues and update whenever someone comments or opens a new issue! Sorry it took so long but I took a break to do some school work... This was fun!

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
