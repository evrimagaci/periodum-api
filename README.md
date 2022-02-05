# Periodum API

![main workflow](https://github.com/evrimagaci/periodum-api/actions/workflows/main.yml/badge.svg)

[Periodum](https://github.com/evrimagaci/periodum) project's backend.

# Tech Stack

- NodeJS: **v16.13.2** (includes npm **v8.1.2**) with TypeScript
- MongoDB: **v5.0**
- Latest Docker Engine with Docker-Compose

# Development

### Run localy

After you have required tech stack above, feel free to run it like this.

```bash
npm install && \
npm run dev
```
### Run inside Docker
```bash
# Run the db in background
docker-compose --env-file ./dev.env up -d db

# Run the app in foreground
docker-compose --env-file ./dev.env up app --build

# Run the app in background
docker-compose --env-file ./dev.env up -d app --build
```

### Some tips

- `--build` _arg_ is required when you need to install new package unless you install inside the container.

- You can connect to the [running container via VSCode](https://code.visualstudio.com/docs/remote/containers) without installing NodeJS or any other dependencies on your machine. Just attach to the Periodum API container after running the container.

## Contribution Guidelines
Please follow the same [guidelines](https://github.com/evrimagaci/periodum/blob/main/CONTRIBUTING.md)  with [the main project](https://github.com/evrimagaci/periodum/).
