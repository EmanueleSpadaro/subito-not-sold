#!/bin/bash

if ! command -v pnpm &> /dev/null
then
    echo "pnpm is required for this script to run properly."
    exit 1
fi

# We delete previously built extensions if there's any
rm -f build-chrome.zip build-firefox.zip # Zipped extensions
rm -rf build/build-firefox build/build-chrome # Plasmo ones
rm -rf build-chrome/ build-firefox/ # Temp ones for zipping the extensions

echo "Building Firefox extension..."
pnpm plasmo build --target=firefox
mkdir -p build-firefox
cp -r build/firefox-prod/* build-firefox

echo "Building Chrome extension..."
pnpm plasmo build --target=chrome
mkdir -p build-chrome
cp -r build/chrome-prod/* build-chrome

echo "Zipping both extensions..."
cd build-firefox
zip -r ../build-firefox.zip *
cd ..
rm -rf build-firefox/

cd build-chrome
zip -r ../build-chrome.zip *
cd ..
rm -rf build-chrome/

echo "build-firefox.zip, build-chrome.zip"
