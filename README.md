To run this program you need yarn package manager and firebase, install yarn and then run command yarn install in your terminal and after this add yout api key of firebase in firebase/config.js and then type command yarn start. It will  open a browser tab here you can view the website







This is the Home page of website we are using a slider that is fetching data from promotions database and and below of it 3 card is used for presenting blogs for promoting purpose and all thing made by using reactstrap and fetching data from firestore database.

This is the Blog page that contain the list of blogging topics. Here we are card of reactstrap and it is also festching data from firestore, when on click on any of card it will call router i am using “Link” for this purpose and you will see the first topic  of that blog topics.




This is the main blogging page where user can veiw the different blogs in the left side i have created a list of other related topics list and in middle the content of blogs is available when you click on any of the card of previous page the specific blogs will fetched from the database.


This is the page where we can create a blog and post it. For it i am using react-quill package and for presenting the blogs in blog section i have customized some css. This section only visible and accessible when your logged in you account.
