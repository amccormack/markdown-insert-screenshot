# kali-markdown-insert-screenshot

A lightweight Atom plugin for inserting interactive screenshots into Markdown files from Kali linux.

This plugin has been forked from https://github.com/cavaunpeu/markdown-insert-screenshot

## About

This plugin uses the `import` command from ImageMagick to automatically insert a screenshot into a markdown file.


## How to use it

### Assumptions

Since I modified this code for myself, I made some pretty opinionated choices for how it would work.

1. Screenshots are placed in a folder called `screenshots` next to the current file.
2. Names for screenshot files are sanitized so that only characters from `/a-zA-Z0-9\-_/` are allowed. Any other character is replaced with a `_`.
3. Images are `.png` files, and an epoch timestamp is included in the filename.

### Usage without a description.

1. Right click where you want your screenshot to appear, and select `Take screenshot and save to relative destination`

Your cursor should change and you can alt-tab to a different window, drag the cursor to grab a section of the screen and a file will be saved with a name like `1503643021492.png` in the `screenshots` folder.

Then the following text will be inserted into your markdown `![description](screenshots/1503643021492.png)`.

Then hit enter so your markdown preview will update.

### Usage with a description

1. Type a short description of the screenshot you want to capture, ie: `root shell of web server`.
2. Highlight your description, right click and select `Take screenshot and save to relative destination`.

Your cursor should change and you can alt-tab to a different window, drag the cursor to grab a section of the screen and a file will be saved with a name like `root_shell_of_web_server-1503676385263.png` in the `screenshots` folder.

Then the following text will be inserted into your markdown `![root shell of web server](screenshots/root_shell_of_web_server-1503676385263.png)`

Then hit enter so your markdown preview will update.
