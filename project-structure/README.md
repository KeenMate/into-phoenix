## Project structure
Elixir respectivelly Phoenix projects and ASP.NET Forms/MVC/Core but they share the same logic and even the request processing.

### The main differences
Phoenix and ASP.NET MVC/Core in basic aspects are not really that different. The main differences are named below but the main difference is that in Phoenix you get the bare minimum to make the web runnable but in ASP.NET MVC/Core you get a lot of stuff for free.

- **Processes are not processes**  
This is probably the biggest difference between Erlang/Elixir (processes based) and thread based worlds represented by Java and .NET. In ASP.NET world the application is usually running in one process that starts multiple threads. Some of them take care of requests and some of them take care of background tasks.  
In Erlang/Elixir world processes are superlightweight, they serve purpose of an actor, small part of the system that communicates with other actors to finish the job at hand.
So in fact, you don't spam new threads but rather small processes, each with its own garbage collection, separated memory and so on. Processes communicate can communicate with each other with messages. This communication can be one-way or calling process can wait for the called process to finish its task.  
Processes can and usually are supervised and this supervision provides you with higher stability of the system. Processes that are supervised and crash can be automatically restarted by their supervisors. More on this [here](https://elixir-lang.org/getting-started/processes.html)    
DON'T THINK OF PROCESSES AS SOMETHING HEAVY AND SLOW TO START
- **Processes vs. Threads**  
ASP.NET is working with threads. Elixir/Phoenix is not. All processes runs in a constant loop but only if they have something meaningful to do. They are dormant otherwise consuming almost nothing of system resources.

- **There's no async/await**  
Elixir has no need for async/await because whenever you send a message to another process and wait for the response the calling process is suspended.

- **File based project structure**  
In both Elixir and Phoenix the application structure is file based. There are no .csproj or .sln files. Project directory structure is explained [here](NOT WORKING)