class Library {
    constructor() {
      this.myLibrary = [];
    }
  
    addBook(title, author, pages, isRead) {
      const newBook = new Book(title, author, pages, isRead);
      this.myLibrary.push(newBook);
      return newBook;
    }
  
    removeBook(index) {
      this.myLibrary.splice(index, 1);
      this.renderLibrary();
    }
  
    toggleReadStatus(index) {
      this.myLibrary[index].isRead = !this.myLibrary[index].isRead;
    }
  
    renderLibrary() {
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";
  
      this.myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");
  
        // Create cells for book details
        const details = [book.title, book.author, book.pages];
        details.forEach((detail) => {
          const cell = document.createElement("td");
          cell.textContent = detail;
          row.appendChild(cell);
        });
  
        // Create a cell for the "Is read" checkbox
        const isReadCell = document.createElement("td");
        const isReadCheckbox = document.createElement("input");
        isReadCheckbox.type = "checkbox";
        isReadCheckbox.checked = book.isRead;
        isReadCheckbox.addEventListener("change", () => this.toggleReadStatus(index));
        isReadCell.appendChild(isReadCheckbox);
        row.appendChild(isReadCell);
  
        // Create a cell for the "Remove" button
        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove book";
        removeButton.addEventListener("click", () => this.removeBook(index));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);
  
        row.setAttribute("data-index", index);
        tbody.appendChild(row);
      });
    }
  }
  
  class Book {
    constructor(title, author, pages, isRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
    }
  }
  
  const library = new Library();
  
  const form = document.querySelector("#addBook");
  const addBtn = document.querySelector("#addNewBook");
  const cancelBtn = document.querySelector(".cancel");
  const clearBtn = document.querySelector(".clear");
  const submitBtn = document.querySelector("#submit");
  
  addBtn.addEventListener("click", () => form.classList.remove("hide"));
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
  
    library.addBook(title, author, pages, isRead);
  
    form.reset();
    library.renderLibrary();
  });
  
  document.addEventListener("click", (e) => {
    if (!form.contains(e.target) && e.target !== addBtn) {
      form.classList.add("hide");
      form.reset();
    }
  });
  
  cancelBtn.addEventListener("click", (e) => {
    form.classList.add("hide");
    form.reset();
  });
  
  clearBtn.addEventListener("click", (e) => {
    form.reset();
  });
  
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
  
    library.addBook(title, author, pages, isRead);
  
    form.reset();
    library.renderLibrary();
  });
  
  // Initialize the library by rendering it
  library.renderLibrary();
  