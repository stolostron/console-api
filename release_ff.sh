#!/bin/bash

set -e

RELEASE_FF_BRANCH=$1

if [[ -z "$RELEASE_FF_BRANCH" ]]
then
  echo "RELEASE_FF_BRANCH not set. Skipping fast-forward of release branch."
  exit 0
fi

rm -rf repo-copy
git clone --no-single-branch $(git remote get-url origin) repo-copy
cd repo-copy
git checkout -b ${RELEASE_FF_BRANCH} origin/${RELEASE_FF_BRANCH}
git merge --ff-only master
git push