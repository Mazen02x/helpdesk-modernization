# Help Desk Modernization

Migrating a legacy Lotus Notes-style Help Desk app to a MEAN stack, deployed on Red Hat OpenShift.

## Tech stack
- MongoDB, Express, Angular, Node.js
- MySQL, Java (Spring Boot)
- Docker, OpenShift

## Project structure

| Folder | Contents |
|---|---|
| `legacy/` | Legacy app: Express server, jQuery and AngularJS 1.x pages, JSON file storage |
| `migration/` | Lotus Notes DXL sample data and (later) migration scripts |
| `api/` | Modern Node/Express API (Phase 3) |
| `web/` | Modern Angular front end (Phase 4) |
| `reports-service/` | Java Spring Boot reporting service (Phase 5) |
| `admin-dashboard/` | React admin dashboard (optional) |
| `openshift/` | OpenShift deployment manifests (Phase 6) |
| `docs/` | Architecture diagrams and documentation |

## Prerequisites
- Node.js 22+
- Docker Desktop

## Running the databases
1. Copy the environment template and fill in values: `cp .env.example .env`
2. Start MongoDB and MySQL: `docker compose up -d`
3. Check they're running: `docker compose ps`

MongoDB is on `localhost:27017`. MySQL is on `localhost:3307`.

## Running the legacy app
1. `cd legacy`
2. `npm install`
3. `npm start`
4. Open http://localhost:3000 (tickets) or http://localhost:3000/approvals.html (approvals)

## Documentation
- [Legacy architecture](docs/architecture-legacy.md)
- [Changelog](CHANGELOG.md)
