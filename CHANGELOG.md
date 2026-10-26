# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-10-26

### Added
- Initial folder structure
- .gitignore, README, and CHANGELOG
- Docker Compose setup for MongoDB and MySQL with environment-based configuration
- `.env.example` template listing required environment variables
- Legacy Help Desk server with endpoints to list tickets, view a single ticket, create tickets, and change a ticket's status
- Ticket status validation: only open, pending-approval, approved, rejected, and closed are accepted
- Ticket list page (jQuery) showing all tickets, with a form to create new tickets
- Ticket approval page (AngularJS) to filter tickets by status and request approval, approve, reject, or close tickets
- Sample Lotus Notes (DXL) export with tickets and a knowledge base article, for migration testing
- Legacy architecture document with diagram, API reference, status workflow, and known issues
- README instructions for running the databases and the legacy app
