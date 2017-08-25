'use babel';

import { CompositeDisposable } from 'atom'
import child_process from 'child_process'
import fs from 'fs'
import shelljs from 'shelljs'
import path from 'path'

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      "kali-markdown-insert-screenshot:screenshot-to-relative-destination": (e) => this.screenshotToRelativeDestination(e)
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  getTargetEditorPath(e) {
    // This function was taken from the `copy-path` package: https://atom.io/packages/copy-path
    // tab's context menu
    var elTarget;
    if (e.target.classList.contains("title")) {
      elTarget = e.target;
    } else {
      // find .tab
      for (let i = 0; i < 100; i++) {
        const el = e.target.parentElement;
        if (el && el.classList.contains("tab")) {
          elTarget = el.querySelector(".title");
        }
      }
    }
    if (elTarget) {
      return elTarget.dataset.path;
    }
    // command palette etc.
    return atom.workspace.getActivePaneItem().getPath();
  },

  parseTargetEditorPath(e) {
    // This function was taken from the `copy-path` package: https://atom.io/packages/copy-path
    return path.parse(this.getTargetEditorPath(e));
  },

  executeShellCommand(cmd) {
    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    })
  },

  descriptionToName(desc) {
    whitelist = /[a-zA-Z0-9\-_]/
    replacement = '_'
    sanitized = desc.split('').map(
      function(x){return x.match(whitelist) ? x : replacement ;}
    ).join('')
    if (sanitized == "") {
      return (new Date).getTime() + ".png"
    }
    return sanitized + "-" + (new Date).getTime() + ".png"
  },

  screenshotToRelativeDestination(e) {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      description = editor.getSelectedText().trim()
      editorPath = this.parseTargetEditorPath(e)
      fileName = this.descriptionToName(description)
      screenshots = path.join(editorPath.dir, "screenshots/")
      destination = path.join(screenshots, fileName)
      destinationDir = path.parse(destination).dir
      description = description || "description"

      template = "![" + description + "]"+"(screenshots/" + fileName +")"
      editor.insertText(template)

      if ( !fs.existsSync(destinationDir) ) {
        shelljs.mkdir('-p', destinationDir.replace("\\", ""));
      }
      this.executeShellCommand(
        "import " + destination.replace(/ /g, "\\ ")
      )

    }
  }
};
