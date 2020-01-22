# Into Phoenix from ASP.NET Core 
[[toc]]

::: warning
We are not in any way, shape or form experts of either ASP.NET Forms/MVC/Core and or Elixir/Phoenix. Altough Elixir/Phoenix seems to be easier to learn than ASP.NET we are still learning how to use it properly.  
These pages are here just for our fellow .NET programers to learn this great framework for truly scalable applications.
:::

## Brief introduction and motivation
The main motivation for this small documentation is to help other ASP.NET Core developers to move to Phoenix and make this transition easier than it was to us.

If you have arrived here you probably already know why you want to use Phoenix Framework but you should prepare yourself for some bumpy ride. ASP.NET Core does a lot of work for you but that of course costs you something, performance.

In Phoenix your work is more streamlined but you have to do a lot of common tasks by yourself, for example to populate ``conn.current_user`` (in fact there is no current_user property of conn object, you have to create it in a plug). 

## Example application
