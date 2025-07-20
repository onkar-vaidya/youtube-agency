#!/bin/bash

# Remove the local .htaccess file to prevent conflicts
rm -f .htaccess

# Pull the latest changes from the repository
git pull origin main

# Create or update the .htaccess file with our configuration
cat > .htaccess << 'EOL'
# Enable the rewrite engine
RewriteEngine On

# If the requested file or directory doesn't exist
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Redirect all non-existent URLs to the main page
RewriteRule ^(.*)$ / [L,R=301]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Set the default index page
DirectoryIndex index.html
EOL

echo "Deployment completed successfully!"
