#Multiplayer math flashcards
##Architecture

Client
Client    ->   Server 
Client

Many clients may communicate with our system over sockets.  
When a client connects, they must provide an email address
which the server will use to store their point totals.

Connected clients will see:

1) All other connected client names and point totals
2) The current question
3) The answer they have submitted (1 submission per question is allowed)
4) An input field where they can type and submit their answer

States on the client are:

Disconnected
Connecting
Connected
  Active Question: 
    No Submission
    Submission
  Display Answer

When a player connects, they are sent to the connecting state which 
waits for a confirmation that the id is not already connected and that
a connection has been established.

When the player is connected, events will stream in over a socket with
two types:

room-update   -Always returns a list of connected players and their point totals
question      -Always returns the question
result        -Always returns the name of the winning player, the correct answer, and points awarded

Players send their answers with the following event

answer        -Always sends their answer by scraping the input field



##How does the game work?
###Players
TBD

###Game
The game object is very stupid.  It simply repeats a cycle infinitely.

It has three states: 
1. collecting-answers
2. displaying-answer
3. waiting

Generate question and answer.  Hash the answer.
Send the question and hashed answer to all connected players.
ENTER ACCEPTING ANSWERS STATE
Create a queue of submitted answers.  Record username, questionId, and answer
WAIT FOR 10 SECONDS
Parse the list of answers starting with the first answer submitted.  
  equation for points is simply 1 point per player that you beat.  
  if there are 5 players and you answer first, you get 4 points
  if you answer last, you get 0 points
  if you do not answer at all, you get 0 points

  Points are stored by username in the persistence layer and then
  broadcasted out to all connected players along with the correct solution
ENTER THE DISPLAYING ANSWER STATE
WAIT FOR 3 SECONDS
Repeat!
