#c# devs guide to installing react with typescript

If cloning this repository:

- Install npm: 
    - Download latest node: https://nodejs.org/en/
    - Open cmd.exe as administrator
    - cd C:\Program Files (x86)\nodejs
    - npm install npm@latest
    - run npm (no params) check version > 3 to avoid long paths on windows

- Install typescript
    - Download latest typescript for VS: http://www.typescriptlang.org/#Download 

- Install jspm
    - Run cmd.exe
    - npm install jspm -g

- Reinstall packages
    - navigate to root of web project
    - open cmd
    - npm install
    - jspm install

- Run solution in VS2015

If starting from scratch:

- Create a Visual Studio Web Project (Web api was what I used)

- Install npm: 
    - Download latest node: https://nodejs.org/en/
    - Open cmd.exe as administrator
    - cd C:\Program Files (x86)\nodejs
    - npm install npm@latest
    - run npm (no params) check version > 3 to avoid long paths on windows

- Install typescript
    - Download latest typescript for VS: http://www.typescriptlang.org/#Download 
    - In web project: 
        - Nuget install microsoft.typescript.msbuild 
        - Nuget install microsoft.typescript.compiler
        - Open web project properties, typescript build tab
            - Set JSX compilation in TSX files: React
            - Set Module System: System

- Install jspm
    - Open web project folder in windows explorer
    - Run cmd.exe
    - npm install jspm -g
    - npm install jspm --save-dev
    - jspm init
        - select defaults for every question except use a transpiler (choose no)
    - Include \config.js in web project (it was created by last step)

- Install packages        
    - npm install gulp --save-dev
    - jspm install npm:systemjs    

- Install jspm workflow packages        
    - npm install gulp-jspm --save-dev   

- Install react npm packages        
    - jspm install react
    - jspm install react-dom
    - jspm install react-router
    
- Install typings npm packages        
    - npm install typings --global
    - typings install react --ambient --save
    - typings install react-dom --ambient --save
    - typings install react-router --ambient --save
    - typings install react-router/history --ambient --save
    - typings install systemjs --ambient --save
    

- Include typings in web project
    - Include typings\main.d.ts
    - Include typings\main folder
    
- Define gulp workflow
    - Add gulpfile.js in project root
    
```    
    var gulp = require('gulp');
    var gulp_jspm = require('gulp-jspm'); // npm install gulp-jspm 
    
    gulp.task('bundle:javascript', function(){
        return gulp.src('App/HelloComponent.js')
            .pipe(gulp_jspm())
            .pipe(gulp.dest('scripts/'));
    });
```

- Trigger gulp workflow
    - View > Other Windows > Task Runner Explorer
    - Refresh the view
    - Select the bundle javascript task
    - Right click and bind to after build
    
- Add some example content
    - Add a folder called App in the root
    - Add a Typescript JSX file called App/HelloComponent.tsx
    
```    
    import * as React from 'react';
    import * as ReactDom from 'react-dom';

    interface IHelloComponentProps {
        message: string;
    }

    class HelloComponent extends React.Component<IHelloComponentProps, any>{
        render() {
            return <h1>Hello {this.props.message}!</h1>;
        }
    }

    export function RunApp() {
        ReactDom.render(<HelloComponent message="World" />, document.body);
    }
```

- Add a html file called App/index.html

```            
    <!DOCTYPE HTML>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Hello World</title>
        <script src="/jspm_packages/system-polyfills.js"></script>
        <script src="/jspm_packages/system.js"></script>
        <script src="/config.js"></script>
        <script src="/scripts/HelloComponent.bundle.js"></script>
    </head>
    <body>
        <script>
        System
        .import('App/HelloComponent.js').then(function (m) {
                m.RunApp();
            })
        .then(null, console.error.bind(console));
        </script>
    </body>
    </html>
```

- Update package.json so npm install / jspm install will work

```
    {
      "dependencies": {
        "jspm": "0.16.31"
      },
      "jspm": {
        "dependencies": {
          "react": "npm:react@^0.14.7",
          "react-dom": "npm:react-dom@^0.14.7",
          "react-router": "npm:react-router@^2.0.1",
          "systemjs": "npm:systemjs@^0.19.24"
        }
      }
    }
```
    
