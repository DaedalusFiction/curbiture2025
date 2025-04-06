THINGS TO CHANGE WHEN SPINNING UP A NEW SITE:

1. Firebase
   a. Firestore
   b. Authentication -- set authorized domains
   c. Storage
   d. Analytics
   e. Change to paid plan
   f. Install Algolia extension
   g. Rules
2. Change gtag: plugins/vue-gtag.client.ts
3. Generate Database
4. Set up Netlify
   a. Link to Repository
   b. Set up Claude secret in Environmental Variables
   c. Set up custom domain
5. Change data.js
   a. Tag options
   b. Primary Perspective options
6. Branding
   a. Colors
   i. assets/css/tailwind.css
   ii. tailwind.config.js
   b. Site Name -- data.js
   i. Header/Footer
   ii. Default Layout
   iii. About
   iv. Privacy Policy
   v. Terms of Service
   c. Fonts (optional)
   d. Logo
   e. Favicons
7. Meta info
   a. nuxt.config.js
8. Algolia
   a. Create new project
   b. Set up indexing
   c. Set Facets!
9. JSON-LD Schema
10. Generate firestore query indices
