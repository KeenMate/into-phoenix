# What is the Umbrella application?
As we will move forward we will talk about something called ***umbrella application***. (This term is not related to the [Umbrella Corporation](https://residentevil.fandom.com/wiki/Umbrella_Corporation) in any way.😈)  
The Umbrella application in Visual Studio terms you could consider the Umbrella application as ***Solution*** but it's not entirely the same thing. 

## Differences and similarities

|Area|Visual Studio Solution|Umbrella application|
|---|---|---|
|Purpose|Virtual and visual representation of projects that can be grouped in solution folders but otherwise has impact on the running project|Keeps the projects of your application under one roof. Umbrella itself is an running process that is starting applications in the apps folder. It also starts other referenced applications that are needed for the run of your application|
|Folder structure|Solution file is quite flexible and you can store your projects anywhere and link them easily. Usually you will keep them all in a single folder and each project has its one project folder.|All applications running under umbrella application has to be placed into the ``apps`` folder|
|Projects manipulation|You can only add files like ``.csproj`` to solution which will consequently add all files mentioned in the project file to the solution. To remove the project you simple remove the reference to that project in the solution. It will remove the project from solution but not from disk.|To add new application into the umbrella application you have to go to ``apps`` folder, create new application using ``mix`` command line utility and add this application to main ``mix.exs`` file as another application to run|
|Startup|In solution you can setup a single or multiple projects to be started when you press F5 (Build and run). Solution itself produces no output.|You can start both a single application or whole umbrella application with ``mix phx.server`` from your command line.|

## How to create an Umbrella application?

In order to create an Umbrella application we are going to use the ``mix phx.new`` command with the ``--umbrella`` switch. To create new project for project named ``rent_today`` we'd run this:  
```
mix phx.new --umbrella rent_today
```

This creates new Phoenix project for us (in the ``rent_today_umbrella`` directory), however the project structure is different compared to non-umbrella application (as described above).

By default this command creates our standard business logic application and our web application, however these are located in the `apps` subdirectory - a location where all the other apps in our ubrella application are supposed to go as well.

To create another web application in our umbrella, we have to use slightly different command so that the new application respects our project structure.

Go into the `apps` directory inside your umbrella and run
```
mix phx.new.web rent_tomorrow
```

Using the `phx.new.web` instead of plain `phx.new` is very important in the context of an umbrella application. As all the configuration is done on the umbrella level instead of the application level, had we used `phx.new`, we would end up with a disfunctional project, since the project's configuration (where values like server port and IP address are stored) would be on the project level and it wouldn't be used by the umbrella.

::: warning
By default these two applications will use the same IP address and port. As they are completely separate webservers running alongside each other, you have to run each on different IP/port. You can change these values in `config/dev.exs` or `config/prod.exs` under that project's endpoint configuration.
:::

Using `phx.new.web` ensures that the existing configuration files on the umbrella level are updated with project's default values so that the configuration is applied when we run the umbrella application.

Other important difference is that this way the web application is created without adding any additional stuff like separate business logic application or Ecto repository as these are supposed to be handled in other applications inside our umbrella already.
