import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DigestEmail from './digest_email';
import fs from 'fs';
import juice from 'juice';
import Immutable from 'immutable';
import { jsdom } from 'jsdom';
import { exec } from 'child_process';

function render(callback){
  const salesStats = Immutable.fromJS(
    JSON.parse(
      fs.readFileSync(__dirname + '/../data/sales.json', {encoding: 'utf8'})
    ).map(parseFloat)
  );
  const css = fs.readFileSync(__dirname + '/styles.css', { encoding: 'utf8'});
  const html = juice.inlineContent(
    ReactDOMServer.renderToStaticMarkup(<DigestEmail salesStats={salesStats} />),
    css
  );

  //console.log(html);
  const document = jsdom(html);
  const svg = document.querySelector('svg');
  //console.log(svg.outerHTML);

  let pngData;
  exec(`echo '${svg.outerHTML}' | rsvg-convert | base64`, (err, stdout, stderr) => {
    console.log('ERR', err);
    console.log('STDOUT', stdout);
    console.log('STDERR', stderr);

    var cidName = 'salessparkline';

    pngData = stdout;

    //create a placeholder reference for an image, cid is used to tell the
    //email client to take the email attachment image and swap it into the
    //body of the email at this location
    let img = document.createElement('img');
    img.src = 'cid:' + cidName;
    svg.parentNode.replaceChild(img, svg);

    callback(document.querySelector('html').outerHTML, [
      {
        type: 'image/png',
        name: cidName,
        content: pngData
      }
    ]);
  });
}

export default render;
