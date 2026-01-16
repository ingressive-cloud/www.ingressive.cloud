# Stage 1: Build the documentation
FROM zensical/zensical AS docs-builder

WORKDIR /docs

# Copy the entire project to the container
# This expects the zensical configuration (e.g. zensical.yml or mkdocs.yml) to be in the root
COPY . .

WORKDIR /docs/docs 

# Build the documentation
# Assuming 'site' is the default output directory for Zensical
RUN zensical build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the single page website files
COPY index.html script.js style.css /usr/share/nginx/html/

# Copy the built documentation to the /docs subdirectory
# The builder stage works in /docs, so the output is likely in /docs/site
COPY --from=docs-builder /docs/docs/site /usr/share/nginx/html/docs

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
