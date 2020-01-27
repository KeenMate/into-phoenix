# Coding comparison
[[toc]]
## Principal differences
Programming experience with Elixir/Phoenix is quite different than what you are used to in ASP.NET. The biggest difference is that there are no classes with their instances. We are pretty sure this will be the most confusing part of Elixir/Phoenix.

Elixir is "mild" functional language, it's like a pipe where data flow from one side to another. Every data transformation you make will always create a copy of the original data. There are no value and reference types of function parameters. There are always pure data that you pass from one function to another, no function can change previous version of data, it can only create new version of it. (Technically this is not completely correct but you can think like this. And no need to worry, memory management is top notch in Elixir).

## Database communication
Database communication in ASP.NET is done usually with Entity Framework and the example is also using it.

Database communication in Elixir/Phoenix is done with [Ecto](https://hexdocs.pm/ecto/Ecto.html). ASP.NET can live without Entity Framework just fine. Phoenix is a little bit more dependent on Ecto due to use of [changesets](https://hexdocs.pm/ecto/Ecto.Changeset.html) that are bread'n'butter of every Phoenix programmer.

[Database communication in bigger detail](/coding/database-communication)
## Page generation

## Forms

## Data APIs

## File Input/Output

## Communication with other systems
