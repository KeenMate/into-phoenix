module.exports = {
  title: 'Into Phoenix',
	description: 'A brief transition from ASP.NET Core to Phoenix',
	themeConfig: {
		displayAllHeaders: true,
		editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Phoenix Official Guide', link: 'https://hexdocs.pm/phoenix/overview.html' },
			{ text: 'Elixir Official Guide', link: 'https://elixir-lang.org/getting-started/introduction.html' },
      { text: 'Elixir Forum', link: 'https://elixirforum.com' },
    ],
		sidebar: [
      {
        title: 'Path to Victory',   // required
        path: '/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 0,    // optional, defaults to 1
        children: [
					'/',
          ['/project-structure/', 'Main framework differences'],
          ['/project-structure/umbrella', 'Umbrella application'],
          '/project-structure/new-project',
          '/project-structure/structure-comparison',
					'/coding/',
					'/common-tasks/',
        ]
      },
      {
				title: 'Tools for Victory',
				path: '/tools',
				collapsable: false, // optional, defaults to true
        sidebarDepth: 0,    // optional, defaults to 1
        children: [ 
					['/tools/intellij', 'IntelliJ Idea'],

				 ]
      }
    ]
	},
	plugins: [
		['@vuepress/back-to-top', true],
	]
}