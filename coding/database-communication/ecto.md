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

## Creating table schema
To be able to execute database actions using your repo, you need to create a schema for each table in your database. You can create the schema using `mix phx.gen.schema` command if you're using the *code-first* database generation approach. This command will create your database schema from information provided and will also create a migration script that will alter your database so that its structure mimics the generated schema.

Since this guide is going to use the *database-first* approach, we will model our database separately so that we can use our database engine's potential to the fullest and then we will write our table schemas by hand.

Down below is an example of our handwritten `RentToday.Film` schema module. Notice a few important details. First of all, we didn't define the primary key inside the schema, but rather outside using the `@primary_key {:field_name, :field_type, options}` attribute. This is necessary if your primary key field name is other than `id` or the type is different than `:id` (which is integer in Elixir). This all is necessary because by default Ecto handles everything around primary key for you and you don't need to include it in the schema.

The second attribute used here, `@schema` is not about our Ecto schema, but rather database schema we are going to use. This is especially important if you are using Postgresql database - here you define the schema where your table is located.


```elixir
defmodule RentToday.Film do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:film_id, :integer, []}
  @schema "public"

  schema "film" do
    field :title, :string
    field :description, :string
    field :release_year, :integer
    field :created, :utc_datetime
    field :created_by, :string
  end

  def changeset(film, attrs) do
    film
    |> cast(attrs, [:title, :description, :release_year, :created, :created_by])
    |> validate_required([:title, :description, :release_year, :created, :created_by])
  end
end
```

## Model generation
## CRUD operations on single table
## Associated data
## Ad-hoc SQL calls
## Stored procedures
## Bulk data load
## Transactions