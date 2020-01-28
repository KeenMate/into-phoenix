const autometa_options = {
  author: {
    name: 'Ondrej Valenta - Keenmate s.r.o.'
  },
  site: {
    name   : 'intophoenix.io',
    description: 'Into Phoenix will try to help you with your transformation from ASP.NET programmer to Elixir/Phoenix programmer'
  },
  canonical_base: 'https://intophoenix.io',
};

module.exports = {
  title: 'Into Phoenix',
	description: 'Into Phoenix will try to help you with your transformation from ASP.NET programmer to Elixir/Phoenix programmer',
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
        collapsable: true, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
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
		[
      '@vuepress/google-analytics',
      {
        'ga': 'UA-114157796-2'
      }
    ],
    [ 'autometa', autometa_options ]
	]
}
