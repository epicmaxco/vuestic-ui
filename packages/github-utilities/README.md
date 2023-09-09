# Github utilities

This project is for scripts that interact with github api.

## Sync labels

This utility allows you to sync labels from one project to another.

You will be prompted to provide:
* github token
* source repo
* target repo

You can define these in `.env` if you want to avoid this dialogue.

```
GITHUB_TOKEN=your_github_token_here
GITHUB_LABEL_SOURCE=epicmaxco/vuestic-ui
GITHUB_LABEL_TARGET=epicmaxco/vuestic-admin
```

Then the script will ask you:
* for labels that are missing in target repo - which labels to create in target
* for labels that have different details in both repos - which labels to sync with target
* for labels that are missing in source repo - which labels to remove in target

