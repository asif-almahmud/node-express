const whitelist = [
   "https://www.yoursite.com",
   "http://127.0.0.1:5500",
   "http://localhost:3500",
]; // the first one is for the actual domain when we will be in the production mode, others are local

const corsOptions = {
   origin: (origin, callback) => {
      // here origin parameter is for whoever have requested
      console.log({ origin });
      if (whitelist.indexOf(origin) !== -1 || !origin) {
         // this condition makes sure - if the domain is in the whitelist then it will be let pass by calling the callback and passing true as the second parameter of the callback
         // we need to add the "!origin" condition for development time, but before production we will have to remove it

         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   optionsSuccessStatus: 200,
};

module.exports = corsOptions;
