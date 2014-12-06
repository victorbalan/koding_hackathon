/**
 * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT *
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" credentials so that
 * all features could work out of the box.
 *
 * Untrack secrets.js before pushing your code to public GitHub repository:
 *
 * git rm --cached config/secrets.js
 *
 * If you have already commited this file to GitHub with your keys, then
 * refer to https://help.github.com/articles/remove-sensitive-data
*/

module.exports = {

  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  sendgrid: {
    user: process.env.SENDGRID_USER || 'hslogin',
    password: process.env.SENDGRID_PASSWORD || 'hspassword00'
  },
  
  facebook: {
    clientID: process.env.FACEBOOK_ID || '815663831830006',
    clientSecret: process.env.FACEBOOK_SECRET || '4d628be358d60aff05a6e48652be320f',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  github: {
    clientID: process.env.GITHUB_ID || '49dedf67e6852222a234',
    clientSecret: process.env.GITHUB_SECRET || '67baefeb86586dd18108fd7e183b303e88a008ed',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  },

  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'H2UU6SxYTT8VirqJKk5FDfW9Q',
    consumerSecret: process.env.TWITTER_SECRET  || 'oiMDQJuW9D7FuBj4ulCzYtmB7hdj4Aqas6in5ZaWg01r4HzqaV',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  google: {
    clientID: process.env.GOOGLE_ID || '750864683961-0okjt1roarlbcp25ofdk2j41dguan1og.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'C3cSFWDIqA5-URWyqo4E1b83',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
};
