# Trivia Game

Simple Trivia Game to show my current Frontend and Backend Code Skills

## Requisite

`npm`

`node`

`mongodb` for backend part

## Start

To start just the Frontend (which works with react/webpack dev server)

1. `cd client/`
2. `npm i`
3. `npm start`
4. check your browser at: `http://localhost:3000`

If you want to see how it works with backend API, you will need to add your
database string in `server/server.js` line 8 - where `DB_STRING` variable is.
Once this is done, backend can be run in this way.

1. `cd server/`
2. `npm i`
3. `npm start`

![Screen Shot 2020-08-25 at 17 25 27](https://user-images.githubusercontent.com/1055531/91278750-e6acb900-e784-11ea-8f84-5b5d039c8b7a.png)
![Screen Shot 2020-08-25 at 17 25 33](https://user-images.githubusercontent.com/1055531/91278823-ff1cd380-e784-11ea-9e1d-0988782b08d1.png)
![localhost_3000_](https://user-images.githubusercontent.com/1055531/91278832-02b05a80-e785-11ea-800a-f975660065d4.png)
![Screen Shot 2020-08-25 at 17 25 18](https://user-images.githubusercontent.com/1055531/91278844-0643e180-e785-11ea-8442-ef45b4dc8ec4.png)


### Routes

The application has 3 public routes:
`/` - Welcome page
`/questions` - Trivia Game Questions
`/results` - Result page

The API routes are:
GET `/api/scores` - return a list of all saved usernames and scores
PUT `/api/score` - save or update a score for a certain user in the db.

### Notes

This application use `create-react-app`
