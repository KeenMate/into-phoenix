# Into Phoenix from ASP.NET Core 

## Brief introduction and motivation
The main motivation for this small documentation is to help other ASP.NET Core developers to move to Phoenix and make this transition easier than it was to us.

If you have arrived here you probably already know why you want to use Phoenix Framework but you should prepare yourself for some bumpy ride. ASP.NET Core does a lot of work for you but that of course costs you something, performance.

In Phoenix your work is more streamlined but you have to do a lot of common tasks by yourself, for example to populate ``conn.current_user`` (in fact there is no current_user property of conn object, you have to create it in a plug). 