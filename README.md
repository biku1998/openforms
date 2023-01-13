# 🛠️ Building [openforms.in](https://openforms.in)

### What

[openforms.in](https://openforms.in) is an open-source data collection SaaS platform

### Why

- for fun ✨
- to understand how to build a SaaS platform from the ground-up 💪

### How

We are going to build it using `typescript` as our primary language.

#### Tech stack (backend)

- typescript
- postgres
- redis
- nest js
- prisma
- sendgrid

> NOTE : the tools will keep changing as we move forward.

## Setup local development workflow

- make sure you have `docker` up and running
- clone the repo
- run `docker-compose up -d`

That's it ✨

You can access

- backend server at http://localhost:3000
- postgres running at http://localhost:5432
- redis running at http://localhost:6379
- redis commander(gui to explore redis data) running at http://localhost:8081

You can also check logs by running

```sh
docker-compose logs
```
