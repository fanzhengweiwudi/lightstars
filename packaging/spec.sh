#!/bin/bash

set -e

mkdir -p build

version=$(cat VERSION)
mkdir -p ~/rpmbuild/SOURCES

# update version
sed -e "s/Version:.*/Version:\ ${version}/" ./packaging/lightstar.spec.in > ./build/lightstar.spec

# link source
# shellcheck disable=SC2086
rm -rf ~/rpmbuild/SOURCES/lightstar-${version}
ln -s $(pwd) ~/rpmbuild/SOURCES/lightstar-"${version}"
