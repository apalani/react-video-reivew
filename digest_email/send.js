import mandrill from 'mandrill-api/mandrill';
import render from './render';

const mandrillClient = new mandrill.Mandrill('zmJHvNquVEq77vL0htm5lA');

render((html, images)=>{
  const message = {
    "html": html,
    "subject": "Storekeeper Digest",
    "from_email": "eric.j.masiello@gmail.com",
    "from_name": "Eric M From",
    "to": [{
      "email": "eric.j.masiello@gmail.com",
      "name": "Eric M To",
      "type": "to"
    }],
    "images": images
  };

  console.log(html);

  mandrillClient.messages.send({message: message}, (result) => {
    console.log("Email sent");
  });
});




