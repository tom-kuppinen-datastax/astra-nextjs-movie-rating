#!/bin/bash

function setupEnvironmentVariables() {
  if [[ -z "$ASTRA_DB_APPLICATION_TOKEN" ]]; then
    echo "What is your Astra DB Application Token? 🚀"
    read -r ASTRA_DB_APPLICATION_TOKEN
    export ASTRA_DB_APPLICATION_TOKEN="${ASTRA_DB_APPLICATION_TOKEN// /}"
    gp env ASTRA_DB_APPLICATION_TOKEN="${ASTRA_DB_APPLICATION_TOKEN// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_KEYSPACE" ]]; then
    echo "What is your Astra keyspace name? 🔑"
    read -r ASTRA_DB_KEYSPACE
    export ASTRA_DB_KEYSPACE="${ASTRA_DB_KEYSPACE// /}"
    gp env ASTRA_DB_KEYSPACE="${ASTRA_DB_KEYSPACE// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_ID" ]]; then
    echo "What is your Astra database id? Example: 4e62bc79-0e12-4667-bd7d-2191ece2a32c ☁️"
    read -r ASTRA_DB_ID
    export ASTRA_DB_ID="${ASTRA_DB_ID// /}"
    gp env ASTRA_DB_ID="${ASTRA_DB_ID// /}" &>/dev/null
  fi

  if [[ -z "$ASTRA_DB_REGION" ]]; then
    echo "What is your Astra database region? Example: us-east1 🌍"
    read -r ASTRA_DB_REGION
    export ASTRA_DB_REGION="${ASTRA_DB_REGION// /}"
    gp env ASTRA_DB_REGION="${ASTRA_DB_REGION// /}" &>/dev/null
  fi


}

setupEnvironmentVariables


