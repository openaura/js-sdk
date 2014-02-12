#!/bin/bash

cd www/app
for i in *.js; do 
    perl -lne 'print if s#\s*//\s*##' $i > ../docs/$i.md
done
cd -
