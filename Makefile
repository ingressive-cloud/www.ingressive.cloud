build-and-run:
	docker build -t ingressive-docs .
	docker run -p 1413:8080 ingressive-docs