# Deno Fresh + SurrealDB shootout

### Usage

Boot surrealdb:

```
docker run --rm -d -p 8001:8001 surrealdb/surrealdb:latest start -u develop -p develop -b 0.0.0.0:8001
```

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
