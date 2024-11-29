// 1- Selecting the Button element
var SubmitBtn = document.getElementById("SubmitBtn");

// 2- Creating an array to store bookmarks
var bookmarks = [];

// 3- Listening to the button click
SubmitBtn.addEventListener("click", function (event) {
  // 4- Prevent form from default submitting
  event.preventDefault();

  // 5- Targeting the name and the url element's values
  var webName = document.getElementById("name").value;
  var webUrl = document.getElementById("url").value;

  // 6- Ensure the URL starts with http:// or https://
  if (!webUrl.startsWith("http://") && !webUrl.startsWith("https://")) {
    webUrl = "https://" + webUrl; // Default to https:// if not provided
  }

  // 7- Creating the object that contains the name and URL as attributes
  var bookMarkObject = {
    name: webName,
    url: webUrl,
  };

  // 8- Push the new object to the array
  bookmarks.push(bookMarkObject);

  // 9- Save the array to localStorage
  localStorage.setItem("bookMarks", JSON.stringify(bookmarks));

  // 10- Call displayBookmarks to update the table
  displayBookmarks();
});

// 11- Creating the function that will display the output
function displayBookmarks() {
  var tableBody = document.getElementById("tbody"); // Targeting tbody on HTML
  tableBody.innerHTML = ""; // Clearing the table body before adding new data

  // 12- Fetching the saved bookmarks from localStorage
  var savedBookmarks = localStorage.getItem("bookMarks");

  // 13- If there are saved bookmarks, parse them into the array
  if (savedBookmarks !== null) {
    bookmarks = JSON.parse(savedBookmarks);
  }

  // 14- Loop through each bookmark and display it in the table
  bookmarks.forEach((bookmark) => {
    var row = document.createElement("tr"); // Create table row
    var nameCell = document.createElement("td"); // Create table cell for name
    var urlCell = document.createElement("td"); // Create table cell for URL

    nameCell.textContent = bookmark.name; // Add name to the cell

    // Create a link element for the URL
    var link = document.createElement("a");
    link.href = bookmark.url; // Set the URL
    link.textContent = bookmark.url; // Set the display text to the URL
    link.target = "_blank"; // Open the link in a new tab

    // Append the link to the urlCell
    urlCell.appendChild(link);

    // Append the cells to the row
    row.appendChild(nameCell);
    row.appendChild(urlCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// 15- Call displayBookmarks on page load to display any saved bookmarks
window.onload = displayBookmarks;
