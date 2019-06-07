function main(){
  makeNoteForm();
  makeSeeListBtn();
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
    const breakPoint = document.createElement("br");

    title.setAttribute("id", "title");
    title.setAttribute("placeholder", "title");
    newForm.setAttribute("placeholder", "write something");
    newForm.setAttribute("id", "content")
   

    // let button = document.createElement("button");
    // button.addEventListener("click", saveNote);
    // button.textContent = "submit";
 
    document.querySelector(".container").appendChild(title);
    document.querySelector(".container").appendChild(breakPoint);
    document.querySelector(".container").appendChild(newForm);
    //document.querySelector(".container").appendChild(breakPoint);
    //document.querySelector(".container").appendChild(button);
   // document.querySelector(".container").appendChild(breakPoint);
  
}

function makeSeeListBtn(){
    let seeListBtn = document.createElement("button");
    seeListBtn.setAttribute("id", "seeListBtn");
    seeListBtn.textContent = "Show my notes";
    document.querySelector(".container").appendChild(seeListBtn);
}

function showMyNotes(){
    drawTable();
    fillWithNotes();
}

function edit(elem){
    console.log("edit");
    const udpateForm = document.createElement("textarea");
    udpateForm.setAttribute("id", "updateBtn");
    udpateForm.textContent = elem.textContent;
    document.querySelector(".container").appendChild(udpateForm);
    
    const updateform = document.getElementsByTagName("textarea")[1];
    updateform.addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            saveUpdateNote();
        }
    })
}

function saveUpdateNote(){
    let noteContent = document.getElementsByTagName("textarea")[1].value;
    let noteTitle = document.getElementById("title").value;
    localStorage.setItem(noteTitle, noteContent);
    document.getElementById("updateBtn").value = "";
}

function drawTable(){
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
  
    for (let j = 0; j <= localStorage.length; j++) {
      let row = document.createElement("tr");
      row.addEventListener("click", function(){
          edit(this)})
        
    //   for (let i = 0; i < 1; i++) {
    //     var cell = document.createElement("td");
    //     row.appendChild(cell);
        
    //   }
  
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.querySelector(".container").appendChild(tbl);
}



function fillWithNotes(){
    const table = document.getElementsByTagName("table")[0];
    for (let j = 0; j <= localStorage.length; j++){
        let keyName = localStorage.key(j);
        table.rows[j].innerHTML = localStorage.getItem(keyName);
        //table.rows[j].cells.innerHTML = localStorage.key(keyName);
        // for (let i=0; i<rows.cells.length; i++){
        //     table.rows.cells[i].innerHTML = localStorage.getItem(keyName)
        // }
        
    }

}

function saveNote(){
    let noteContent = document.getElementsByTagName("textarea")[0].value;
    let noteTitle = document.getElementById("title").value;
    localStorage.setItem(noteTitle, noteContent);
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

}

main()