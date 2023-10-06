# Family

Family Performance Engineering.

## Getting Started

1. Run the database

```bash
docker run --rm --publish 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=family postgres
```

2. Run the service. Install dependencies with `bun install`.

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
