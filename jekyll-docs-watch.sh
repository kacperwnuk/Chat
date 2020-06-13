#!/usr/bin/env bash
cd docs
alias jekyll=$(ruby -e 'puts Gem.user_dir')/bin/jekyll
jekyll server . --watch
