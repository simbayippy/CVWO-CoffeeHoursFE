#**CoffeeHours forum - CVWO**

**Live demo at: https://coffeehours.site/**

*Find the backend repo here: https://github.com/simbayippy/CVWO-CoffeeHours*


##**Techstack**

FE:
nextjs + react framework. a mix of typescript and js was used.
additional frameworks installed: react toastify for notifications
user's avatar: dicebear.com's api

hosted on netlify

BE:
rails 7

Auth:
Auth0's framework


##**Timeline**

- [x] 26th - 29th dec: start of project, learning + setting up of rails db on mac
- [x] 30th dec - 10th jan: focusing on FE + learning how FE and BE interacts with each other
- [x] 11 - 12th jan: hosting of FE on netlify
- [x] 13th jan onwards: fixing of any bugs, misc.


##**Key takeaways**

Overall, I found this CVWO assignment to have been very fruitful. I've never worked with rails let alone a BE before, so integrating a BE with FE was really interesting.

Some interesting things I've learnt include:
- to dynamically create new pages based off DB, the use of getstaticprops and getstaticpaths in nextjs can be used.
- however, this only works in development on localhost. upon deploying to netlify for production, this dynamic feature would fail since its only builds(?) once. the use of getseversideprops is needed instead. took me awhile to figure out since i couldn't fully understand why it worked perfectly in development but fails completely on production
- the use of Auth0 for authorisation was really cool.

for the future:
- not really sure if my DB implementation has been optimal, esp with creating new users (after interacting with auth0)
- use of https://precedent.vercel.app/ since it has a lot of built in features that would have saved me a lot of time. sadly only found out about this today scrolling twitter (14th jan)