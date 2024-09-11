#!/bin/bash
put dump.sql /tmp/dump.sql
lcd /app
get /data/sqlite.db /tmp/backup.db
rm /data/sqlite.db
sqlite3 /data/sqlite.db < /tmp/dump.sql
rm /tmp/dump.sql