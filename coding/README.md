---
title: Coding comparison

autometa:
  author:
    name: Ondrej Valenta

tags:
  - Phoenix
  - ASP.NET
  - comparison
---# {{ $page.title }}

[[toc]]

## Principal differences

Programming experience with Elixir/Phoenix is quite different than what you are used to in ASP.NET. The biggest difference is that there are no classes with their instances. We are pretty sure this will be the most confusing part of Elixir/Phoenix.

Elixir is "mild" functional language, it's like a pipe where data flow from one side to another. Every data transformation you make will always create a copy of the original data. There are no value and reference types of function parameters. There are always pure data that you pass from one function to another, no function can change previous version of data, it can only create new version of it. (Technically this is not completely correct but you can think like this. And no need to worry, memory management is top notch in Elixir).  
In Elixir classes are replaced with `modules` that you can understand as no-state containers of functions. In these modules you cannot have instance members like fields or properties, it would make no sense because you cannot instantiate modules anyway.

Phoenix comes with the same idea. All data of incoming request is taken as a single data package that is send through series of layers (endpoint, router, controller, view, template). Each layer can transform the data package, enrich it with addition information from which the last layer then produces some output.

## Request processing

Request processing of latest ASP.NET MVC/Core versions works with encapsulating middlewares that you define as a chain of layers that are called by the previous layer. System calls the first layer - ASP.NET itself - that prepares a data package known as HttpContext that has dozens of properties describing the request, it also contains form values for POST/PATCH/etc. requests, querystring and so on.  
Depending on project setting property `User` is populated as well with current user.

Request processing of requests in Phoenix is more similar to old HttpModules back in ASP.NET Forms days. Everything is based on Plugs. Plug is a simple module (with two predefined functions) or a simple function that is called for each request and it is used to transform/enrich/clean incoming data package similar to HttpContext and give it back to Phoenix framework, which then call another plug in defined pipeline with modified data package. Plugs can also stop processing of the request or redirect it to another page.

Remember plugs **do not** encapsulate each other. You cannot make for example MeasureRequestTime module that would encapsulate a request and all other layers would be measured by this module. You can however create a plug that puts timestamp to request http context at beginning of request processing and then compute time difference with another plug at the end of the processing.

**Plugs form a pipeline.** Pipelines are defined in `router.ex` and they are then used for each scope/route.

@flowstart
endpoint=>operation: Endpoint receives a request
router=>operation: Router decides from request path which pipeline and scope to use
controller=>operation: Controller receives the request data, process it, loads data etc. and send it to view
view=>operation: View converts data incoming from controller to desired output (HTML, Json, Xml, you name it)

endpoint->router->controller->view
@flowend

## Routing

Routing in ASP.NET Core is done in `Startup.cs` class in `Configure` method that is called for each request. The other option is to use attribute style routing with attributes placed on controller classes or their methods. Razor pages are routed automatically based on directories they are in and their name. <- (to be verified)

In Phoenix all routing is od

## Database communication

Database communication in ASP.NET is done usually with Entity Framework and the example is also using it.

Database communication in Elixir/Phoenix is done with [Ecto](https://hexdocs.pm/ecto/Ecto.html). ASP.NET can live without Entity Framework just fine. Phoenix is a little bit more dependent on Ecto due to use of [changesets](https://hexdocs.pm/ecto/Ecto.Changeset.html) that are bread'n'butter of every Phoenix programmer.

[Database communication in bigger detail](/coding/database-communication)

## Page generation

## Forms

## Sessions and cookies

## Data APIs

## File Input/Output

::: tip
When accessing the `/priv` directory from within your application, use `:code.priv_dir(:renttoday_web)` helper function
:::

## Communication with other systems

## Websockets/gRPC

## Caching
