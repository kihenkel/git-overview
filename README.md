# git-overview
A Node.js application to show an overview for multiple git repositories.

The application reads from a `config` folder (on gitignore) which you have to provide. All you have to do is create an `config/index.js`. It can look like this:

## `config/index.js`
```javascript
module.exports = [{
    name: 'app-1',
    path: `C:\source\apps\app-1`,
    group: 'Apps',
  }, {
    name: 'app-2',
    path: `C:\source\apps\app-2`,
    group: 'Apps',
  }, {
    name: 'service-1',
    path: `C:\source\services\service-1`,
    group: 'Services',
  }, {
    name: 'service-2',
    path: `C:\source\services\service-2`,
    group: 'Services',
  },
];
```
## How to start
Add a valid config as seen above. Now you can call the application: `node .\index.js`

### Output
```
╔══════╗
║ Apps ║
╚══════╝

╔═════════╤═══════════════════╤══════════════╤═══════════════╗
║ Project │ Branch            │ Behind/Ahead │ Local changes ║
╟─────────┼───────────────────┼──────────────┼───────────────╢
║ app-1   │ master            │ <|>          │ 2 files       ║
╟─────────┼───────────────────┼──────────────┼───────────────╢
║ app-2   │ feature/myFeature │ <|>          │ -             ║
╚═════════╧═══════════════════╧══════════════╧═══════════════╝

╔══════════╗
║ Services ║
╚══════════╝

╔═══════════╤════════╤══════════════╤═══════════════╗
║ Project   │ Branch │ Behind/Ahead │ Local changes ║
╟───────────┼────────┼──────────────┼───────────────╢
║ service-1 │ master │ <-----|>     │ -             ║
╟───────────┼────────┼──────────────┼───────────────╢
║ service-2 │ master │ <|>          │ 2 files       ║
╚═══════════╧════════╧══════════════╧═══════════════╝
```