# Clip It
[Live site](http://clipit1.herokuapp.com/)

## Wiki Links
 - [Database Schema](https://github.com/DZhou005/ClipIt/wiki/Database-Schema)
 - [Frontend Routes](https://github.com/DZhou005/ClipIt/wiki/Frontend-Routes)
 - [MVP Feature List](https://github.com/DZhou005/ClipIt/wiki/MVP-Feature-List)
 - [API Documentation](https://github.com/DZhou005/ClipIt/wiki/Api-Documentation)

## Project Summary
	Clip It is a website to upload your video game highlights and share it with the world!
  
## Technology Used
 
- Python
- JavaScript
- CSS
- React
- Redux
- Flask
- SQLAlchemy
- Amazon Web Services
- Postgres

## Login View:
![loginpageClipIt](https://user-images.githubusercontent.com/74795454/120250888-8fb4a280-c234-11eb-83be-067199dabd89.PNG)

## Home View:
![ClipItLinkedin](https://user-images.githubusercontent.com/74795454/120250924-aeb33480-c234-11eb-872b-e87dbd7ca302.PNG)

## Features
- Sign in or sign up with your email and password
- Upload video via AWS
- Have the newest video on the homepage
- Like and comment on each video
- Profile has all of the videos uploaded by the user
- Search bar that finds videos by looking for titles that match the user's search input
- Edit and delete comments and videos

## Technical challenges

I had to figure out an effective way to search and render what the user had search for. To do this, I used a filter function to get the result I wanted. I used the state to check for what I wanted also. Whenever the user typed in the search bar, it would set the search term state. The search term would then be used to be compared to video titles and the videos that had that search term included in the title would be displayed.

```
<input className="homeSearch" type='text' placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
      <div className='homeInnerContainer'>
        {clipsArray.length ? clipsArray.slice(0).reverse().filter((val) => {
          if(searchTerm === "") {
            return val
          }
          else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
```
