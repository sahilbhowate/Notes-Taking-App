console.log("Welcome to notes app. This is app.js ");
showNotes(); //for showing all the previous records of notes when the application starts

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {   //function(e) is an event listener function
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");  //notes parameter of getItem() function is the name of key of our data in localStorage

    //check for historical record of notes (in localStorage ) -- here below ; notes is the name of variable which has the  localStorage data
    if (notes == null) {                               //if there is no data in localStorage
        notesObj = [];    //notesObj as an empty array has been declared -- its a medium between localStorage and console
    }
    else      //If you find any previously stored notes in the localStorage ; then go inside else block
    {
        notesObj = JSON.parse(notes); //retreive the string value in notes variable and then store it in notesObj array variable ---that is ; put previously stored historical notes into notesObj array
    }

    //myObj is an object defined using object literal
    //store the title and its corresponding note's text into the myObj object
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);   //put the myObj object into the notesObj[] array.
    //So now notesObj is an array of objects. These objects store the title of note and the corresponding note. 

    //put the value of notesObj array variable into the localStorage
    //Use stringify() function ; because while storing in the localStorage; we have to store the data in string form.
    //We have named the key of our data in localStorage as notes
    localStorage.setItem("notes", JSON.stringify(notesObj));

    //Once the text is stored in localStorage
    //after clicking on the Add Note button ;
    //We need to clear the textarea and the title area
    addTxt.value = "";
    addTitle.value = "";

    // console.log(notesObj); //Display everything ; --previously added historical notes AND the notes that were currently added. Show this on the console tab

    showNotes();//Display everything ; --previously added historical notes AND the notes that were currently added. Show this on the web browser's page.

});

//function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";     //declared an empty string called html
    notesObj.forEach(function (element, index) {
        //below code means html=html+`matter inside backticks`

        //this.id is the id of that element on which user has clicked
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                   <div class="card-body">
                     <h5 class="card-title">${element.title}</h5>
                     <p class="card-text">
                      ${element.text}
                      </p>
                   <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" href="#">Delete Note</button>
                    </div>
                </div>`;
    } //end of body of function to be applied on each element of notesObj array
    );            //end of called function forEach() 

    //see the output of the below line of code to see the contents of the string variable html
    // console.log(html); 

    //below lines of code displays all the contents of the string variable html
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes`
    }

}                //end of showNotes() function

//function to delete note
//index means index of the array ; whose contents we want to delete. 
function deleteNote(index) {
    // console.log('I am deletig the note having id ' + index);
    //get the data from local storage having key name as "notes"
    //And store that data in the variable called notes ---variable name is kept same for the sake of ease
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        //convert the string form of data into array form using JSON.parse() function
        //And store that array form of data into the array object called notesObj
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1); //at position called index remove 1 element from notesObj array
    //splice() function also updates all the indices of the notesObj array after removing the data at any particular position

    //update the localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();  //update the screen after deletion of note
}

let search = document.getElementById('searchTxt');

//input event means ; whenever the input is put by the user ; at that time the function() will get executed
search.addEventListener("input", function () {

    //whatever you are putting in the search bar ; store that value in the variable called inputVal
    let inputVal = search.value.toLowerCase(); //lower the case for priortizing lowercase words

    // console.log("Input event fired! ", inputVal);

    //fetch all elements whose design class is noteCards
    let noteCardElements = document.getElementsByClassName('noteCard');

    // The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
    //apply the function(element) on each element of the  Array instance which was formed using Array.from() method 
    Array.from(noteCardElements).forEach(function (element) {
        //fetch only those elements in noteCardElements variable; that contain the paragraph tag. And store its innerText in the variable cardTxt
        //An HTMLCollection object is an array-like list of HTML elements.
        //Methods like the getElementsByTagName() returns an HTMLCollection.
        //search why [0] was written
        //he told that , it was written to grab the first element of paragraph tag HTMLCollection
        //If you remove [0] and see the output , you see that it prints HTMLCollection with indices.
        //And our required output[paragraph tags innertext] is at index --- [0] of that HTMLCollection. Hence , it seems that is why [0] was written
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //put innerText of paragraph tags of all the noteCards in cardTxt

        //display only those noteCard elements whose innerText MATCHES inputVal
        //innerText of all the noteCard elements is in the variable cardTxt
        if (cardTxt.includes(inputVal)) {
            //see the output of below 2 console.log() statements to understand the if{} block
            console.log(element);
            console.log(cardTxt);
            element.style.display = "block";  //its a block type element and not inline element hence "block"
        }
        else {
            //do not display any noteCard element
            element.style.display = "none";
        }
        // console.log(cardTxt);    //display innerText of paragraph tags of all the noteCards on the console

    });//end of the body of forEach() function

}); //end of body of the event listener function for search box

/*Further features
1.Add Title , search by title , search by note's content
2.Mark note as important
3.Separate notes by user
4.Sync and host to web server
*/