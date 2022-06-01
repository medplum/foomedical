#!/usr/bin/env bash

LOCAL_PATH="dist/"
S3_URI="s3://foomedical/"

# HTML files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "text/html" \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html"

# CSS files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "text/css" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.css"

# JS files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "application/javascript" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.js"

# JSON files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "application/json" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.json" \
  --include "*.js.map"

# PNG files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "image/png" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.png"

# ICO files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "image/vnd.microsoft" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.ico"

# TXT files
aws s3 cp "$LOCAL_PATH" "$S3_URI" \
  --region us-east-1 \
  --recursive \
  --content-type "text/plain" \
  --cache-control "public, max-age=31536000" \
  --exclude "*" \
  --include "*.txt"