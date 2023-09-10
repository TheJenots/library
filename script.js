let myLibrary = [];
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

const form = document.querySelector("#addBook");
const addBtn = document.querySelector("#addNewBook");
const cancelBtn = document.querySelector(".cancel");
const clearBtn = document.querySelector(".clear");
addBtn.addEventListener("click", () => form.classList.remove("hide"));

form.addEventListener("submit", addBookToLibrary);

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function renderLibrary() {
    tbody.innerHTML = ""; // Clear the table before rendering
    myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");

        // Create cells for book details
        const details = [book.title, book.author, book.pages];
        details.forEach(detail => {
            const cell = document.createElement("td");
            cell.textContent = detail;
            row.appendChild(cell);
        });

        // Create a cell for the "Is read" checkbox
        const isReadCell = document.createElement("td");
        const isReadCheckbox = document.createElement("input");
        isReadCheckbox.type = "checkbox";
        isReadCheckbox.checked = book.isRead;
        isReadCheckbox.addEventListener("change", () => toggleReadStatus(index));
        isReadCell.appendChild(isReadCheckbox);
        row.appendChild(isReadCell);

        // Create a cell for the "Remove" button
        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove book";
        removeButton.addEventListener("click", () => removeBook(index));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        row.setAttribute("data-index", index);
        tbody.appendChild(row);
    });
}

function addBookToLibrary(e) {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    form.reset();
    renderLibrary(); // Render the updated library
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    renderLibrary(); // Render the updated library
}

function toggleReadStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    renderLibrary(); // Render the updated library
}

document.addEventListener("click", (e) => { 
  if (!form.contains(e.target) && e.target !== addBtn) {
    form.classList.add("hide"); //Close modal when user clicks outside the modal
    form.reset();
  }
});

cancelBtn.addEventListener("click", e => {
    form.classList.add("hide");
    form.reset();
  });

clearBtn.addEventListener("click", e => {
    form.reset();
});

// Initialize the library by rendering it
renderLibrary();
