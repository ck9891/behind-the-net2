#!/bin/bash
put seed.local.sql /tmp/seed.local.sql
lcd /app
get /data/sqlite.db /tmp/backup.db
sqlite3 /data/sqlite.db < /tmp/seed.local.sql
rm /tmp/seed.local.sql