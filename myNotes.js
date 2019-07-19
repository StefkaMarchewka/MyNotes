function main(){
  makeNoteForm();
  makeSeeListBtn();
  makeSpaceForTable();
  const seeListBtn = document.getElementById("seeListBtn");
  seeListBtn.addEventListener("click", showMyNotes);
  
  const form = document.getElementsByTagName("textarea")[0];
  form.addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            saveNote();
        }
    })
}

function makeNoteForm(){
    const newForm = document.createElement("textarea");
    const title = document.createElement("input");
   
    title.setAttribute("id", "title");
    title.setAttribute("placeholder", "title");
    newForm.setAttribute("placeholder", "write something");
    newForm.setAttribute("id", "content")

    document.querySelector(".container").appendChild(title);
    document.querySelector(".container").appendChild(newForm);
}


function makeSeeListBtn(){
    let seeListBtn = document.createElement("button");
    seeListBtn.setAttribute("id", "seeListBtn");
    seeListBtn.textContent = "myNotes";
    document.querySelector(".container").appendChild(seeListBtn);
}

function makeSpaceForTable(){
    const spaceForTable = document.createElement("table");
    spaceForTable.setAttribute("id", "tableSpace");
    document.querySelector(".container").appendChild(spaceForTable);
}

const drawNewTable = function(title, content){
    return `
        <tr>
            <td>${title}</td>
            <td>${content}</td>
        </tr>
    `;
};



function addListener(){
    const rows = document.getElementsByTagName("tr");
    for(let i=0; i<rows.length; i++){
        rows[i].addEventListener("click", function(){
            edit(this);
        })
    }
}

function showMyNotes(){    
    for (let i=0; i<localStorage.length; i++){
        let keyName = localStorage.key(i);
        
        let content = localStorage.getItem(keyName);
        let title = localStorage.key(i);
        let tableElement = drawNewTable(title, content);
        
        document.querySelector("table").innerHTML += tableElement;
    }
    addListener();
}

function edit(elem){
    const cells = elem.getElementsByTagName("td");
    let title = cells[0];
    let content = cells[1];

    console.log(title); 
    console.log(content);
    
    const noteUpdForm = document.createElement("div");
    noteUpdForm.classList.add("noteUpdForm");
    const udpateContent = document.createElement("textarea");
    udpateContent.setAttribute("id", "updateContent");
    udpateContent.textContent = content.textContent;
    
    const udpateTitle = document.createElement("textarea");
    udpateTitle.setAttribute("id", "updateTitle");
    udpateTitle.classList.add("title");
    udpateTitle.textContent = title.textContent;

    const delButton = document.createElement("BUTTON");
    delButton.setAttribute("id", "delButton");
    delButton.innerHTML = "Delete"

    document.querySelector(".container").appendChild(noteUpdForm);
    document.querySelector(".noteUpdForm").appendChild(udpateTitle);
    document.querySelector(".noteUpdForm").appendChild(udpateContent);
    document.querySelector(".noteUpdForm").appendChild(delButton);
    
    const updateContentForm = document.getElementsByTagName("textarea")[2];
    const updateTitleForm = document.getElementsByTagName("textarea")[1];
    const deleteButton = document.getElementById("delButton");

    updateContentForm.addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            saveUpdateNote();
        }
    })

    updateTitleForm.addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            saveUpdateNote();
        }
    })

    deleteButton.addEventListener("click", function(event) {
        deleteNote();

    })
}

function deleteNote(){
    let noteTitle = document.getElementsByTagName("textarea")[1].value;

    localStorage.removeItem(noteTitle);
    document.location.reload(true);
}


function saveUpdateNote(){
    let noteContent = document.getElementsByTagName("textarea")[2].value;
    let noteTitle = document.getElementsByTagName("textarea")[1].value;
    
    localStorage.setItem(noteTitle, noteContent);
    document.location.reload(true);
}


function saveNote(){
    let noteContent = document.getElementsByTagName("textarea")[0].value;
    let noteTitle = document.getElementById("title").value;
    localStorage.setItem(noteTitle, noteContent);
    
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

main()