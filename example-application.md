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

RentToday application is based on [RentToday](https://github.com/KeenMate/renttoday-database) database that is a port of [Sakila](https://dev.mysql.com/doc/sakila/en/) for Postgres.

We won't use all tables in this database as we will not cover all aspects of video renting services but we will use some of tables, views and stored procedures.

## Business description

- Frontend
  - Home screen with recommended films
  - List of films with filtering and paging
  - Detail screen for each film with rent history
  - Login screen
  - **[Authorized]** Basket
  - **[Authorized]** User profile
- **[Authorized, Admin]** Administration (SPA)
  - Home screen with dashboard and charts for top rented films, top categories and so on
  - List of films with filtering and paging
  - Detail screen for each film with rent history, stock availability, active rents
  - List of users with filtering and paging
  - Detail screen for each user with rent history, enable/disable buttons and options to reset user's password
  - List of rents with options to cancel a rented video record

### Frontend

Frontend layout is based on simple structure: navigation bar, content block and footer. Content block is divided into two columns. 80/20%.

Top navigation bar with current user name displayed in right top corner, if user is not logged in _Log in_ text is displayed instead, when user is logged in there is an exit icon to log user out next to the user's name.  
Navigation menu is positioned in top left corner. Basket is displayed only for logged in user and its position on left side of the user's name.

Right content block contains list of top 7 films, based amount of rents, to be rented. This block is displayed on every page.

### Home screen
Displays information about how many other users are currently online, what films user has still rented and a list of cards of most popular film in each film category.

### List of films with filtering and paging

Displays a list of cards of films. They can be filtered by film category and actor. Filter options are put in querystring so users can send links to other users. User can also use fulltext search for film names via search textbox. Search filter is also put in querystring. If no films are found a message "We are sorry. There are no films matching your criteria." is displayed between header and footer of the film list.
Film list is also paged and page options like page size and page number are also put in querystring.

### Detail screen for each film with rent history

Displays a film details like Title, Description, it's category, length in hours (computed on server from minutes), rating, special features and year of release.  
Rental rate and cost of replacemenant are also displayed.

On second tab of this page there is a list with rental history of the displayed movie in a paged manner, ordered by rental day (newest on top). Page size is 10, fixed. Page number is put to querystring. List of rentals contains date of rental in format `YYYY-MM-DD"` and name of user who rented the film in format `"[First character of last name, capitalized]*, [Firstname]"` to anonymize user names.

An order button is displayed on this page only if it's available to rent (calculated on server) AND user is logged in. On pressing this button [PRG](https://en.wikipedia.org/wiki/Post/Redirect/Get) is sent to server where the film is added to user's basket. User is then redirected back to film detail page. When the the film is in user's basket a message is displayed on this page saying "You already have this film in your shopping basket".

### Login screen

Standard login name/password login page. PRG to home screen on login.

### Basket

List of films order by name stored in the user's session. User can remove film from the basket or clear it completely with a single button "Clear basket". List of films contains sums of total rental price (calculated and rendered on server).

On pressing "Rent" button PRG request is made against server. Request is processed this way:

- All films to be rented are checked against database to confirm availability of them
  - If all films are available they are rented to the user
  - If any of the films are not available anymore server redirects user back to the basket where those films that are not avaiable are displayed red and a message is displayed to the user saying "We are sorry! Films in red are not available to rent anymore. Please, try it later"
- When films are rented basket content in user session is cleared
- To rent a film to user means to put a record to `rental` table

### User profile

User profile has three tabs.

- On first tab called User details user can update his/her details (first and last name), email is displayed but cannot be changed and serves as a login name.  
  Address can be changed as well.
- Address line (there are two), district and postal code are simple texts
- Cities are displayed in combo box(rendered on server)

  - When user selects a city a postback is send to server which displays city country and keeps all edited or saved data, which ever is the case for given field

User can save his/her profile by pressing "Save my details" button.

On second tab called rental history user can see his/her rental history. List of rentals also show total amount of rentals and total price for all rentals displayed in footer. User can filter rentals of films by fulltext search of their title. List of rentals is also paged by 20. All requests are done as pure postbacks.

On third tab called Profile maintenance user can request complete removal of his/her profile and data from database. When user is presses "Remove my profile" button user is redirect to a confirmation page with message "Are you sure to remove this profile?". By pressing yes, user data, those that are not important for invoincing and accounting, are removed from the database and user is logged out.

### Administration

Administration runs on admin subdomain and in a separate application. It is a SPA application that calls endpoints in background server application. SPA assets are downloaded from the background application. Administration is accessible only for logged in users with administrator role - represented as being a member of `staff` table. Authentication is simply done with login name and password and a secure token is stored to cookies with `same-site` and `http-only` property.

### Administration - Login page

Standard login name/password login page. PRG to home screen of the administration on login.

### Home screen with dashboard and charts for top rented films, top categories and so on

Dashboarded home screen displays four charts that are loaded separately via AJAX. Administrator can pick from/to dates that are used to filter and calculate data from date pickers.
Four charts are these:

- [Horizontal bar] Top 10 rented movie based on amount of rentals, displays a movie title, total rents and color based on movie category
- [Horizontal bar] Top 10 renters, displays user's full name in format `"[Last name], [Firstname]"`
- [Line chart] Total amount of rentals based on days (devided to quarters per 8 hours)
- [Pie chart] Total amount of rentals per category, only category with more than 2 rentals are shown

On top of the dashboard there will be boxes with (all data incoming in one request):

- Alltime total number of films in user's store
- Alltime total number of active users in user's store
- Alltime total number of rents in user's store
- Alltime total inventory items to rent in user's store

### List of films with filtering and paging

Filtered list of films in table layout with the same filtering options as users have in frontend films list but it also has buttons to edit and remove a film.

### Detail screen for each film with rent history, stock availability, active rents

On this page administrator can update details about the movie like title, description, release year, film's language, rental rate, length, replacement cost, PG rating and special effects.  
  
Administrator can also manage/assign films actors and categories.
  
The last thing administrator can do is to change how many video cassets of the film is in user's store inventory.

### List of users with filtering and paging

### Detail screen for each user with rent history, enable/disable buttons and options to reset user's password

### List of rents with options to cancel a rented video record

## Technical description

- Single server application
  - For ASP.NET application we will use ASP.NET Core 3.x
  - For Phoenix application we will use Phoenix 1.4.x
- Forms authentication with cookie storing _same-site_ cookie
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
