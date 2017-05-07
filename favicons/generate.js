var favicons = require('favicons');
var fs = require('fs');
var mkdirp = require('mkdirp');

var configuration = {
  appName: 'GongFu Timer',
  appDescription: 'A timer application for use in GongFu tea sessions.',
  developerName: 'Stijn Ruts',
  background: "#4caf50",
  path: "/favicons/",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: true,
    favicons: true,
    firefox: true,
    windows: true,
    yandex: true
  }
};

var source = './favicons/favicon.svg';
var destination = './public/favicons/';
var index = './public/index.html';

var template =
  `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
      %s
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`;

var callback = function (error, response) {

  if (error) {
    throw error;
  }

  if (response.images) {
    mkdirp.sync(destination);
    response.images.forEach(
      image => fs.writeFileSync(destination + image.name, image.contents)
    );
  }

  if (response.files) {
    mkdirp.sync(destination);
    response.files.forEach(
      file => fs.writeFileSync(destination + file.name, file.contents)
    );
  }

  if (response.html) {
    var content = template.replace('%s', response.html.join('\n'));
    fs.writeFileSync(index, content);
  }
};

favicons(source, configuration, callback);
