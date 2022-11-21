## Introduction

This is a step-by-step guide to build a simple nodejs web app with an express server and connect to a remote github repository. I am using macOS so windows or linux users may have to adapt where necessary.

The web app just sends okay. but the focus on this article is to set up a connection with github.

## Pre-requisites

- An IDE. I prefer [VS Code](https://code.visualstudio.com/)
- node and npm on your local system: Check if they are installed using `node -v` and `npm -v` commands. If not found, then install using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
- A [github](https://github.com/) account
- Basic understanding of using VS Code and the command line

## Build the nodejs App

### Initiate the project

1. Create an empty folder named simple-node-app on your computer and open it on vs code.
2. Open the terminal on VS Code using command palette or pressing the `control` and `~` keys together
3. Run the command `npm init -y`. This initiates the node project. The `-y` tag accepts all defaults.

Now we should have

### Create the express application

1. Create an empty file named `index.js` in your root folder by running the command `touch index.js`
2. Install Express using npm: `npm i express`. (This should create a file named `package-lock.json` and a directory named `node_modules`.)
3. Put the following code block in the `index.js` file:

```js
/**
 * Import the express module and initiate the express app
 */
const express = require("express");
const app = express();

/**
 * Set up the app to return "Okay" for any get request
 *
 * app.get() is the method to set up the app to do certain actions
 * upon a get request is sent to the app in the specified route.
 *
 * In this case we are using "*" indicating that the app should just
 * send "Okay" as a response to any get request to any route on the
 * app.
 */
app.get("*", (req, res) => {
  res.send("Okay");
});

/**
 * Set up the PORT
 *
 * app.listen() is a method to set up the app to listen to the specified
 * PORT - meaning if we go to http://localhost:8080 on our browser, this
 * app responds. Here we are setting up the app to listen to PORT 8080 and
 * once the app is running, it should log the given message on the console.
 */
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT} 🔥`);
});
```

Now the application is ready. test it out:

1. Run `node index.js` on the terminal and we should see `Server live on port 8080 🔥` on our console.
2. Go to any browser and paste and go to the url `http://localhost:8080` and we should see "Okay".

## Install and setup git

### Install git

1. Check if you already have git installed using `git -v`.
2. If not found, install git on your system globally using npm: `npm i git -g`.

### Set up git for this project

Create a file named `.gitignore` on your root folder and put the following in the file:

```gitignore
.DS_Store
node_modules
```

This file tells git to ignore the changes made to the files and folders mentioned here.

Next,

1. On the command line enter `git init`
2. Check the status of changes by running the command `git status`. It shows you the changes made on the directory so far
3. Run the command `git add .` to stage all changes to commit
4. Run the command `git commit -m "Initial Commit"`. This commits all staged changes with the message "Initial Commit"

## Connect with github remote repository

### Setup SSH Connection to gihub

1. Check if you already have an SSH Key, run the command `ls -al ~/.ssh`
2. Check the directory listing to see if you already have a public SSH key. By default, the filenames of supported public keys for GitHub are one of the following. id_rsa.pub / id_ecdsa.pub / id_ed25519.pub
3. First, check to see if your ~/.ssh/config file exists in the default location, run the command `open ~/.ssh/config`
4. If the file does not exit, create one by running `touch ~/.ssh/config`
5. Open the ssh config file by running `open ~/.ssh/config`
6. Paste the following in the file:

```
Host *.github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

Now, lets create the keypair:

1. run the following command `ssh-keygen -t ed25519` and press enter to select the default location.
2. Next the prompt will ask you to enter a passphrase. Enter a passphrase, you need to remember this for future connections.
3. Enter the same passphrase again to confirm
4. Add your SSH private key to the ssh-agent and store your passphrase in the keychain. Run `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`

Next, we need to add the public key to gihub

1. Runn the following command to copy the contents of the public key `pbcopy < ~/.ssh/id_ed25519.pub`
2. Go to github > Settings > SSH and GPG Keys ([URL](https://github.com/settings/keys))
3. Click New SSH Key, select a title of your choice, select key type "Authentication Key" and add the contents of the public key in the text box then press Add SSH Key.

Now we are ready to connect to github using SSH.

### Create empty gihub repository

1. Go to github.com and login to your account
2. Click on create new reporitory
3. Name the reporitory "simple-node-app" or anything of your choice
4. Select Private
5. Keep "Add a README file" option unchecked
6. Select .gitignore template none
7. Select License None
8. Click Create Reporitory
9. Now you should see an ssh endpoint on the top which is something like `git@github.com:yourusername/simple-node-app.git`, copy this endpoint.
10. Run the following commands one after the other but replace the endpoint in the first command with the actual one that you just copied

```command line
git remote add origin git@github.com:yourusername/simple-node-app.git
git branc -m main
git push -u origin main
```

That's it. Now the repository should be available on github.
