#!/usr/bin/env bash

if [ ! -d "~/ramdisk/cache" ]; then
    mkdir ~/ramdisk/cache
fi

ln -s ~/ramdisk/cache cache
