# 🛠️ Building [openforms.in](https://openforms.in)

### What

[openforms.in](https://openforms.in) is an open-source data collection SaaS platform

### Why

- for fun ✨
- to understand how to build a SaaS platform from the ground-up 💪

### How

---

![typescript-badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![postgres-badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![redis-badge](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white) ![nestjs-badge](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![prisma-badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![docker-badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

#### Tech stack (backend)

- typescript
- postgres
- redis
- nest js
- prisma

> NOTE : the tools will keep evolving as we move forward.

## Setup local development workflow

- make sure you have `docker` up and running
- clone the repo
- copy `docker-compose.override.yml.example` content to `docker-compose.override.yml`
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
