## What is the Umbrella application?
As we will move forward we will talk about something called ***umbrella application***. (This term is not related to the [Umbrella Corporation](https://residentevil.fandom.com/wiki/Umbrella_Corporation) in any way.😈)  
So what is the Umbrella application? In Visual Studio terms you could consider the Umbrella application as ***Solution*** but it's not entirely the same thing. 

### Differences and similarities

|Area|Visual Studio Solution|Umbrella application|
|---|---|---|
|Purpose|Virtual and visual representation of projects that can be grouped in solution folders but otherwise has impact on the running project|Keeps the projects of your application under one roof. Umbrella itself is an running process that is starting applications in the apps folder. It also starts other referenced applications that are needed for the run of your application|
|Folder structure|Solution file is quite flexible and you can store your projects anywhere and link them easily. Usually you will keep them all in a single folder and each project has its one project folder.|All applications running under umbrella application has to be placed into the ``apps`` folder|
|Projects manipulation|You can only add files like ``.csproj`` to solution which will consequently add all files mentioned in the project file to the solution. To remove the project you simple remove the reference to that project in the solution. It will remove the project from solution but not from disk.|To add new application into the umbrella application you have to go to ``apps`` folder, create new application using ``mix`` command line utility and add this application to main ``mix.exs`` file as another application to run|
|Startup|In solution you can setup a single or multiple projects to be started when you press F5 (Build and run). Solution itself produces no output.|You can start both a single application or whole umbrella application with ``mix phx.server`` from your command line.|