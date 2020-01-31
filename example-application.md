---
title: RentToday in bigger detail

autometa:
  author:
    name: Ondrej Valenta

tags:
  - Phoenix
  - ASP.NET
  - guide
  - comparison
  - learn
  - example
---

# {{ $page.title }}

[[toc]]

## Summary
RentToday is based on [Pagila](https://github.com/devrimgunduz/pagila) database that is a port of [Sakila](https://dev.mysql.com/doc/sakila/en/) for Postgres.  
  
We won't use all tables in this database as we will not cover all aspects of video renting services but we will use some of tables, views and stored procedures.

## Technical parameters:

- Single server application
  - For ASP.NET application we will use ASP.NET Core 3.x
  - For Phoenix application we will use Phoenix 1.4.x
- Forms authentication with cookie storing *same-site* cookie
- Server rendering of pages
- Serving static content, for example Javascript files and images
- API endpoints
- Communicating with PostgreSQL database
- Running background jobs for cleanup
- Websocket communication with connected clients

As an HTML framework we will use [bulma](https://bulma.io/).  
For Javascript content generation we will use [Svelte](https://svelte.dev) and [Elm](https://elm-lang.org).  
Data will be loaded with standard Javascript [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

For database communication from ASP.NET our team uses [LLBLGen](https://llblgen.com), which in our opinion works better and faster than Entity Framework + it can generate stored procedures calls, but for this example application we will use Entity Framework to make it more accessible for others.

For database communication from Elixir/Phoenix there is no really any other option than to use Ecto and so we'll use it. It brings some interesting features like Out of the Box validation and "computed" changesets of your old/new data. Calling a stored procedure from Ecto seems to be a big pain in the code but we'll see.

For most of the work we will use Visual Studio 2017/9 and IntelliJ Idea.

## Business description

- Frontend
  - Home screen with recommended movies
  - List of movies with filtering and paging
  - Detail screen for each movie with rent history
  - Login screen
  - **[Authorized]** Basket
  - **[Authorized]** User profile
    - My rent history
    - My settings
- **[Authorized, Admin]** Administration (SPA)
  - Home screen with dashboard and charts for top rented movies, top categories and so on
  - List of movies with filtering and paging
  - Detail screen for each movie with rent history, stock availability, active rents
  - List of users with filtering and paging
  - Detail screen for each user with rent history, enable/disable buttons and options to reset user's password
  - List of rents with options to cancel a rented video record

### Frontend
Frontend layout is based on simple structure: navigation bar, content block and footer. Content block is divided into two columns. 80/20%.

Top navigation bar with current user name displayed in right top corner, if user is not logged in *Log in* text is displayed instead, when user is logged in there is an exit icon to log user out next to the user's name.  
Navigation menu is position in top left corner. Basket is displayed only for logged in user and its position on left side of the user's name.

Right content block contains list of top 7 movies, based amount of rents, to be rented. This block is displayed on every page. 

### Home screen
Displays information about how many other users is currently online, what movies user has still rented and a list of cards of most popular movie in each movie category.

### List of movies with filtering and paging
Displays a list of cards of movies. They can be filtered by movie category and actor. Filter options are put in querystring so users can send links to other users.
Movies list is also paged and page options like page size and page number are also put in querystring.

### Detail screen for each movie with rent history