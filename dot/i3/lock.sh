#!/bin/bash

# Dependencies:
# imagemagick
# i3lock
# scrot (optional but default)

IMAGE=/tmp/i3lock.png
SCREENSHOT="scrot $IMAGE" # 0.46s

# All options are here: http://www.imagemagick.org/Usage/blur/#blur_args

BLURTYPE="0x8" # non molto velocie
#BLURTYPE="2x8" # 2.90s

$SCREENSHOT
convert $IMAGE -blur $BLURTYPE $IMAGE
i3lock -i $IMAGE
rm $IMAGE
