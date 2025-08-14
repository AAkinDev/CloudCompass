#!/usr/bin/env bash
set -euo pipefail

echo "Script started with args: $*"
echo "First arg: '${1:-NONE}'"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Help requested - exiting"
  exit 0
fi

echo "Continuing with script execution..."


