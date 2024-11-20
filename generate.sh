#!/bin/zsh

# get file from args
file=$1

ffmpeg -t 3 -i $file \
  -vf "fps=4,scale=1024:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 output.gif
