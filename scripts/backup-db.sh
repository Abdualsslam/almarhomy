#!/bin/bash
# MongoDB Backup Script

# Require MONGODB_URI
if [ -z "$MONGODB_URI" ]; then
  echo "Error: MONGODB_URI environment variable is required."
  exit 1
fi

BACKUP_DIR="/backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "Starting MongoDB backup to $BACKUP_DIR..."

mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR"

if [ $? -eq 0 ]; then
  echo "Backup completed successfully."
  # Optional: Compress the backup
  tar -czf "${BACKUP_DIR}.tar.gz" -C "$BACKUP_DIR" .
  rm -rf "$BACKUP_DIR"
  echo "Compressed backup to ${BACKUP_DIR}.tar.gz"
else
  echo "Backup failed!"
  exit 1
fi
