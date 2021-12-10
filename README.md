
# Storkies
Storkies is a lifestyle brand and cannabis delivery service based out of California. I was hired to build them a website/application which utilizes numerous APIs and technologies which providing the owners with complete control and editing capabilities over various aspects of the site.
I'll break the sections of the websites up into chunks, and explain exactly what is utilized for each one.

[View the frontend for this website](https://github.com/elijahharry/storkies_client)

## Shop Pages ([/shop](https://www.storkiesflyhigh.com/shop), [/cart](https://www.storkiesflyhigh.com/cart), etc)
The merch shop utilizes the Shopify Storefront API as a headless CMS, effectively providing a dashboard where my client can update products, manage orders, etc on their own. More benefits include a safe and secure checkout system handled via Shopify. Shop data is grabbed via the Storefront API in getStaticProps with GraphQL, and the associated pages are statically generated. Product recommendations are generated via an NextJS api route, utilizing a sort function I created. Users' carts are saved in local storage for reference later.

## Hero Sections (all pages)
The pictures within the collages you see across the website are editable via an admin dashboard I built for my client. Photos can be uploaded in bulk (with an upload progress indicator!) and sent to the NodeJS backend for processing (generating 'blur' loading placeholders) and storage.

## Partners Page ([/partners](https://www.storkiesflyhigh.com/partners))
This page also makes use of the custom NodeJS backend. Brands and products can all be added/managed from the admin dashboard. Images and data is sent to the backend and stored in a MongoDB database for display on the frontend.

This page is currently unfinished, waiting for more data from client.
