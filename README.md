# Notes app from React Scrimba class

This simple app lets us write, update and delete notes, and interact fully with a database for our notes in Google Firestore (Firebase).
The UI is provided by react-mde, read here: https://github.com/andrerpena/react-mde.

Please see the **dependencies** (and versions!) in the file **package.json** in this repo.<br>
Also this has been developed using Vite, and the app will show on localhost.

You will also have to sign up to Firebase, this is very easy to set up, see the documentation here:
https://cloud.google.com/firestore/docs/create-database-web-mobile-client-library

In this project we learned:
- how to interact with a Firestore database: creating, updating and deleting notes from the UI, and having the database reacting to these actions
- synchronizing with the notes in Firestore when opening the app
- setting up a debouncing effect (delay) so that the database is not updating each time a character is written in the title or body of the note for instance
- set up the sidebar where the notes are listed: the last updated note comes on top of the list, also added a delete (trash) button, as well as capturing the title of the note as a note name in the list shown in the sidebar

&nbsp;

Below a screenshot with on the left the 'write' or 'edit' mode, and on the right the 'preview' mode:
![readme_my_new_note_write_preview](https://github.com/AnneEstoppey/Scrimba_react_notes_app/assets/35219455/3d06d29c-5483-4ce5-b0af-b40aa2e7c9ea)

&nbsp;

How it looks like in Google Firestore:
![readme_cloud_firestore](https://github.com/AnneEstoppey/Scrimba_react_notes_app/assets/35219455/36b1cbcc-4909-40b1-9910-08b607c8a8c6)


 
## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
