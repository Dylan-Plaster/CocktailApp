


# Cocktail Search App #

This app allows users to search through a database of cocktails, filter by ingredients they have available, create posts with recipes they enjoy, comment and vote on others' posts. 

This app is created using a Node/Express backend to handle the database and API with a React frontend and will be an evenly-focused full-stack website designed to be viewed on desktop but responsive to other screen sizes as well. 

The data for this app will come from "TheCocktailDB" API, which provides data about drinks, ingredients, alcohols, and categories of drinks. On the backend of this app will be an API created with Express to handle interactions with the database which will store user data and post/comment data

The user flow for this website will look something like this: 


- Log in to be able to comment, vote, and post
- Search for cocktails by name or select ingredients you have on hand
- Browse results from search and select a drink
- See the recipe including preparation notes 
- Share recipes you like with friends - make a post with a title, body text, and attached recipe, which other users can see 
- Explore other users' posts! There will be a page where all users' posts will show up and can be up/downvoted. You can also view a user's detail page and see all the posts they have made
- Comment on other users posts!

Dependencies: Node, React, React-router-dom, bcrypt, express, cors, morgan, bootstrap, react-dom, jsonschema, jsonwebtoken, pg
