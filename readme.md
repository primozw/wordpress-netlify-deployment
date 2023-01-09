## GETTING STARTED

Upload the plugin files to the `/wp-content/plugins/netlify-deploy` directory, or install the plugin through the WordPress plugins screen directly.

#### Development Process

<details>
 <summary> Don't have <code>Node.js</code> + <code>npm</code> installed? You have to install them first. (CLICK TO EXPAND)</summary>

Go to the Node's site [download + install](https://nodejs.org/en/download/) Node on your system. This will install both `Node.js` and `npm`, i.e., node package manager — the command line interface of Node.js.

You can verify the install by opening your terminal app and typing...

```sh
node -v
# Results into 7.19.1 — or installed version.

npm -v
# Results into v14.15.1 — or installed version.
```

</details>

Follow the following steps to add your functionalities to the plugin:

1. Navigate to plugin files `/wp-content/plugins/your-renamed-plugin-folder`, open terminal app.
2. Run the `npm install` command to install npm dependencies, wait sometimes to complete it.
3. Run the `npm run packages-update` command to update the package.
4. Run `npm run start` command to initialize development of React JS, Development can be done any time. Use it in the development environment.
5. Run the `npm run build` command to finalize the development and be ready for production. The command creates production files. After building the production file move it to the production level.

Go to WordPress Dashboard => React Settings and View the Default Settings of the Plugin.

## Folder Information

<strong>WP React Plugin Boilerplate</strong> Folder Information

```sh
INSIDE: /wp-installatioon-folder/wp-content/plugins/your-renamed-plugin-folder

├── .gitignore
├── index.php
├── LICENSE.txt
├── package.json
├── readme.md
├── README.txt
├── uninstall.php
├── your-renamed-plugin.php
|
├── admin
|  |  ├── class-your-renamed-plugin-admin.php
|  |  └── index.php
|  |
|  └── partials
|     └── your-renamed-plugin-admin-display.php
|
├── build(auto created via NPM)
|  └── admin
|     ├── settings.asset.php
|     ├── settings.js
|     └── style-settings.css
|
├── includes
|  ├── class-your-renamed-plugin.php
|  ├── class-your-renamed-plugin-activator.php
|  ├── class-your-renamed-plugin-deactivator.php
|  ├── class-your-renamed-plugin-i18n.php
|  ├── class-your-renamed-plugin-include.php
|  ├── class-your-renamed-plugin-loader.php
|  ├── functions.php
|  └── index.php
|
├── languages
|  └── your-renamed-plugin.pot
|
├── public
|  |  ├── class-your-renamed-plugin-public.php
|  |  └── index.php
|  |
|  ├── css
|  |  └── your-renamed-plugin-public.css
|  |
|  ├── js
|  |  └── your-renamed-plugin-public.js
|  |
|  └── partials
|     └── your-renamed-plugin-public-display.php
|
└── src
   ├── admin
   |  └── settings
   |     ├── atoms
   |     |   ├── nav.js
   |     |   └── save-btn.js
   |     ├── molecules
   |     |   ├── navlist.js
   |     |   └── notice.js
   |     ├── organisms
   |     |   ├── footer.js
   |     |   └── header.js
   |     ├── pages
   |     |   ├── advanced.js
   |     |   └── general.js
   |     ├── utils
   |     |    └── get-nav.js
   |     ├── routes.js
   |     └── style.scss
   |
   |
   ├── api
   |  └── settings.js
   ├── context
   |  └── SettingsContext.js
   ├── reducer
   |  └── settings-reducer.js
   |
   └── settings.js
```
