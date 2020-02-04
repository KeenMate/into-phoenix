---

title: Database communication in Ecto

autometa:
  author:
    name: Ondrej Valenta

tags:
  - Phoenix
  - database
  - communication
  - Ecto

---

# {{ $page.title }}
[[toc]]
  
If you created your project using `mix phx.new` without using the `--no-ecto` flag, your business logic application shoud contain a repo in `lib/project/repo.ex`. This repo is your entrypoint for communication between your app and database and it's running alongside your business logic application as a separate process. The machinery behind then takes care of things like database connection pooling.

## Configuration
The database connection configuration is stored in the `config/dev.exs` file for development and in the `config/prod.secret.exs` for production under the `Project.Repo` section. You can either configure username, password and host separately or configure all at once by setting the `url` key to connection string.  
The `pool_size` option configures number of open connections held in the connection pool managed by the repo.
## Model generation
## CRUD operations on single table
## Associated data
## Ad-hoc SQL calls
## Stored procedures
## Bulk data load
## Transactions