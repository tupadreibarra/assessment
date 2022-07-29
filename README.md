# Headless WordPress Assessment

This is the assessment for incoming developers aimed toward experience with WordPress combined with a JavaScript-centric front-end.

Please follow the steps below and turn it in to us when you are done!

> NOTE: Anything marked as 'BONUS' is **NOT** required and is only there if you feel like showing off. That being said, feel free to show off. Have fun with it!

## Setup

> WARNING: This setup assumes a Linux-based system (Linux, macOS, Windows >= 10 w/ WSL) running node version ~16 with npm version ~8 and Docker. If you have trouble running anything, it probably has something to do with the above.

1. Clone this repo and cd into the directory.
1. Run `npm install`
1. Run `npm run env:init`
1. Run `npm run env:launch`
1. Run `npm run env:installcontent`

**Away We Go!**

In a few minutes, you should have a fresh WordPress install up and running with a simple theme named Headless Theme activated. The service assumes it can run on port 8888, so if there's a conflict there, you'll have to edit `.wp-env.json`, run `npm run env:destroy` and then re-run `npm run env:init`.

Any changes made to the `./content/` folder will show up on the WordPress install.

**WP-CLI**

If you need to run any wp-cli commands, it is available via either `npx wp-env run cli [command]` OR, you can use the `./bin/wp.sh` which should make things a bit easier.

## Steps

- [*] Clone or fork this repo, then establish a public repository where your code will live and can be viewed by us.
- [*] Create 5 sample posts and 5 pages inside WordPress.
  - Bonus points: Use wp-cli, or some automated way to do this.
- [*] Create a custom "Movie" post type and create 10 sample Movie posts.
  - [*] Create a custom "Genre" taxonomy and attach it to the `movie` post type only.
- [*] Create a React app with a standard header w/ nav linking to pages, a standard footer, which talks to WordPress REST API. Create the following pages in the React app:
  - [*] Homepage - 5 Movie Posts
    - Each post should have a featured image, an excerpt and a link to the movie single post page.
    - Bonus points: infinite scroll or pagination.
  - [*] Single Movie Post (Featured image, title, genre, full text)
    - Bonus points: Showcase other movies.
  - [*] Single Post (Featured image, author, title, text)
  - [*] Single Page (Can be just title, author and text)
  - Bonus points: Hot or live refresh.
- [*] Add SCSS compiling in and style your React app.
  - Bonus points: Uglify your JavaScript/SCSS build
- [*] Add instructions on requirements, installation and running everything to your README file.
 
## Requirements

- Your environment should run in Docker.
- Any JavaScript libraries should be installed via package.json.
- Add installation and instructions for running your code in your README.

## Preferences

- Please don't include your whole database image (if you need to, you can include a database dump, like `dump.sql`).
- The more automated the better (think fewer steps for the assessor to complete to get things working).

## Bonus

- Extend [@wordpress/scripts/config/webpack.config](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#provide-your-own-webpack-config) and utilize as much WordPress-native JavaScript as possible.
- Add a WordPress REST cache plugin for GET requests.
