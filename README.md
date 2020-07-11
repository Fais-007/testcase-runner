# testcase-runner README

This extension is used to insert test case by fetching it from text file so that in multiple checking case user doesn't have to input test case again.

## Features

From command pallete, context menu or shortcut one can directly fetch the test case.

## Requirements

vscode version >= 1.44.0

## How to use

1 - Make text file with name (test.txt). <br />
2 - Save your test case in that text file. <br />
3 - Write your code in main file and execute, to get test case use Run Testcase from context menu or use shortcut (ctrl+f1) or command Run Testcase.

for eg: <br />
Main file - sum.cpp <br />
Test case file - test.txt

Call command when in main file.
This extension takes text(test case) from .txt file and insert in the vscode terminal.

Snapshot

<img src="https://github.com/Fais-007/testcase-runner/blob/master/images/testcase.gif"/>
