# clasp-slackbot-example

## how to setup

```shell
npm install -g clasp
clasp login # -> Login your Google account at first.
```

```shell
git clone git@github.com:lilpacy/clasp-slackbot-example.git
cd clasp-slackbot-example
make setup # -> A spreadsheet and binded script will be created.
```

And change environmental variables in .env file.

## how to deploy

```shell
make deploy # transpile typescript into gs and upload it
# Now you can set some timer or something to fire each function with GUI.
```

## how to develop

It's really hard to debug the scraping part on Slack channel.
So I strongly recommend that you make sure to debug with curl.
