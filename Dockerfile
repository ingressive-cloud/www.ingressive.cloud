# Stage 1: Build the site with Hugo
FROM hugomods/hugo:latest AS builder

WORKDIR /site
COPY . .
RUN hugo --minify

# Stage 2: Serve with Nginx (unprivileged — listens on 8080, runs as uid 101)
FROM nginxinc/nginx-unprivileged:alpine

COPY --from=builder /site/public /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
