let myLibrary = [];

const body = document.querySelector("body");

const form = body.querySelector("#addBook");
const addBtn = body.querySelector("#addNewBook");
addBtn.addEventListener("click", e => form.style.display = "block");

const submit = body.querySelector("#submit");
submit.addEventListener("click", addBookToLibrary);

const table = document.createElement("table");
let theadData = ["Title", "Author", "Page count", "Is Read?"];

function createTable() {
    let row = document.createElement("tr");
    for (let i=0; i<theadData.length; i++) {
        let thead = document.createElement("th");
        thead.textContent = theadData[i];
        row.appendChild(thead);
        table.appendChild(row);
    }   
}

createTable();

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    /*this.info = function () {
        return (`${title} by ${author}, ${pages} pages, ${(read) ? "is read." : "not read yet."}`);
    }*/
}

function addBookToLibrary(e) {
    e.preventDefault();
    const title = body.querySelector("#title").value;
    const author = body.querySelector("#author").value;
    const pages = body.querySelector("#pages").value;
    const isRead = body.querySelector("#isRead").checked;
    let tempLibrary = [];
    tempLibrary.push(title, author, pages, isRead);
    myLibrary.push(tempLibrary);
    let row = document.createElement("tr");
    for (let i=0; i<tempLibrary.length; i++) {
        let tdata = document.createElement("td");
        tdata.textContent = tempLibrary[i];
        row.appendChild(tdata);
        table.appendChild(row);
    }
}

/*Book.prototype.info = function () {
    return (`${title} by ${author}, ${pages} pages, ${(isRread) ? "is read." : "not read yet."}`);
}*/


function displayLibrary(lib) {
    body.appendChild(table);
    lib.forEach(book => {
        let row = document.createElement("tr");
        for (let i=0; i<book.length; i++) {
            let tdata = document.createElement("td");
            tdata.textContent = book[i];
            row.appendChild(tdata);
            table.appendChild(row);   
        }
    });
}

displayLibrary(myLibrary);