#!/usr/bin/zsh
set -euo pipefail

purge() {
  rm -rf node_modules/{.vite,.vite-temp} .react-router || :
}

xxx() {
  pnpm run dev
}

build() {
  rm -rfv build build.log || :
  pnpm run build

  cat package.json | jq '. | del(.devDependencies,.scripts)' \
    > build/package.json

  lrztar -z build
}

kg() {
  rm -rfv node_modules pnpm-lock.yaml
  cat > package.json <<EOL
{
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "build": "react-router build > build.log 2>&1",
    "dev": "react-router dev --port 8000"
  }
}
EOL

  pnpm add 'react'
  pnpm add 'react-dom'
  pnpm add 'react-router'
  pnpm add '@react-router/node'
  pnpm add 'isbot'

  pnpm add 'mutative'

  pnpm add 'balanced-match'
  pnpm add 'clsx'
  pnpm add 'date-fns'
  pnpm add '@juggle/resize-observer'
  pnpm add 'mnth'
  pnpm add 'react-keyed-flatten-children'
  pnpm add 'react-transition-group'
  pnpm add 'react-virtual'
  pnpm add 'weekstart'

  pnpm add -D 'vite'
  pnpm add -D '@react-router/dev'
}

www() {
  inotifywait -mr -e close_write -e delete -e moved_to ./scratch.js \
    | while read ; do
        clear -x
        cl -b 27  -f 51 -o '------------------------------------------------'
        echo
        cat -n <(./scratch.js || :)
      done
}

_k=(${(ok)functions:#_*})
_v=(${(oM)_k#[a-z]*})
typeset -A _o
_o=(${_v:^_k})

eval 'zparseopts -D -E -F -a _a '${_v}

[[ ${#_a} -eq 0  ]] && \
  paste -d ' ' <(print -l '\-'${(j:\n-:)_v}) <(print -l ${_k}) && exit

_a=('$_o['${^_a#-}']')
eval ${(F)_a}
exit

        
