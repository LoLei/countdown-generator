#!/bin/sh

TAG=0.1.0

# Build
podman build -f Containerfile -t ghcr.io/lolei/countdown-generator:$TAG .

# Push
podman push ghcr.io/lolei/countdown-generator:$TAG

# Deploy
cd k8s || exit
tk show environments/default --tla-str tag=$TAG

read -p "Are you sure? " -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # do dangerous stuff
  tk apply environments/default --tla-str tag=$TAG
fi
