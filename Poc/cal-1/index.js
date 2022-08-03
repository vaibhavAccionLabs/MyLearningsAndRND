const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  '268896826365-jt5clhkeu1hfk08l9ma688desajs5fts.apps.googleusercontent.com',
  'aakwEtqQQhGV36PDYFFEeGcK'
);

oAuth2Client.setCredentials({
  refresh_token:
    '1//04wzsJnMhdIxcCgYIARAAGAQSNwF-L9Ir_ED7kQnlTGf9_n3R0ey4ecEB7JGBCm0D7q6BX-RCKhHBqu2Kobdrh_Jzpya97fA3TOw',
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date();

//set Day for tomorrow
eventStartTime.setDate(eventStartTime.getDay() + 2);

console.log('START TIME::', eventStartTime);

const eventEndTime = new Date();

eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

console.log('END TIME::', eventEndTime);

const event = {
  summary: 'Meet with Vaibhav',
  location:
    'Ground floor, 583 K, Saharanpur Rd, Opposite ITI, Niranjanpur, Dehradun, Uttarakhand 248003',

  description:
    'Meeting with vaibhav to talk about the new client project and how to add the google calendar API',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/Denver',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/Denver',
  },
  colorId: 1,
};

// check for busy schedule
calendar.freebusy.query(
  {
    resource: {
      timeMin: eventStartTime,
      timeMax: eventEndTime,
      timeZone: 'America/Denver',
      items: [{ id: 'primary' }],
    },
  },
  (err, res) => {
    if (err) return console.error('Free Busy Query Error:', err);
    const eventsArr = res.data.calendars.primary.busy;

    if (eventsArr.length === 0)
      return calendar.events.insert(
        {
          calendarId: 'primary',
          resource: event,
        },
        (err) => {
          if (err) return console.log('Calendar Event Creation Error:', err);

          return console.log('Calendar event created.');
        }
      );

    return console.log('Sorry I am busy.');
  }
);
