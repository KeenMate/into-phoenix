# IntelliJ Idea and similar Jetbrains IDE

## Plugins
There is only one real plugin usable with IntelliJ based IDEs:
[Elixir](https://plugins.jetbrains.com/plugin/7522-elixir)

It brings multiple features to the table but to our experience it's not a full Visual Studio experience.

The most important parts this plugin provides are build configurations and code highlighting, intellisense is semi-working since Elixir itself is somewhat lose language and it's harder to make proper intellisense.


## Templates
*Elixir plugin* provides multiple file templates but they are mostly oriented on *Elixir* and its genserver.

We created multiple templates for Phoenix server itself. Namely:
- Phoenix Controller
- Phoenix View
- Phoenix Plug

## Creating your application
*Elixir plugin* does not create a template for ``Phoenix project`` but you can easily create it in command line.

## Setup your project
After you open your project in IntelliJ Idea and open one of the .ex(s) files you might see a yellow message at the top of the file code saying **Elixir Facet SDK is not defined** with a link on the right side 

## Running your application
To run your application you have to create a build configuration. *Elixir plugin* provides you with multiple build configurations but we will use *Elixir* configuration template.

Put ```-S mix phx.server``` in ``elixir arguments`` field. 



## Debugging your application
Although one of the *Elixir plugin* features is ability to debug your code as you are used to in Visual Studio we were not able to make it run. But you can always with IEX console.  