var bookmarkList = [];
if (localStorage.getItem("bookmarkList") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayData(bookmarkList);
}
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var subtn = document.getElementById("subtn");
var upbtn = document.getElementById("upbtn");
function addWebsite() {
  if (validation("siteName") && validation("siteUrl")) {
    var site = {
      websiteName: siteName.value,
      websiteSite: siteUrl.value,
    };
    bookmarkList.push(site);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    clearInputs();
    displayData(bookmarkList);
  } else {
    Swal.fire({
      title: "Site Name or Url is not valid, Please follow the rules below :",
      icon: "error",
      html: `
          1-Site name must contain at least 3 characters<br/>
          2-Site URL must be a valid one
        `,
      showCloseButton: true,
    });
  }
}
function displayData(Array) {
  var cartona = ``;
  for (var i = 0; i < Array.length; i++) {
    cartona += `<tr class="border-top">
                    <td>${i + 1}</td>
                    <td>${Array[i].websiteName}</td>
                    <td><a href="${
                      Array[i].websiteSite
                    }" target="_blank" class="btn btn-olivedrab my-1"><i
                                class="fa-solid fa-eye me-1"></i>Visit</a></td>
                    <td><button class="btn btn-primary" onclick="setValuesForUpdate(${i})"><i class="fa-solid fa-pen me-1"></i>Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can me-1"></i>Delete</button>
                    </td>
                </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function clearInputs() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
function deleteWebsite(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayData(bookmarkList);
}
function searchName() {
  var searchName = search.value;
  var array = [];
  for (var i = 0; i < bookmarkList.length; i++) {
    if (
      bookmarkList[i].websiteName
        .toLowerCase()
        .includes(searchName.toLowerCase())
    )
      array.push(bookmarkList[i]);
  }
  displayData(array);
}
var updateIndex;
function setValuesForUpdate(index) {
  updateIndex = index;
  siteName.value = bookmarkList[index].websiteName;
  siteUrl.value = bookmarkList[index].websiteSite;
  subtn.classList.add("d-none");
  upbtn.classList.remove("d-none");
}

function updateWebsite() {
  if (validation("siteName") && validation("siteUrl")) {
    bookmarkList[updateIndex].websiteName = siteName.value;
    bookmarkList[updateIndex].websiteSite = siteUrl.value;
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    displayData(bookmarkList);
    subtn.classList.remove("d-none");
    upbtn.classList.add("d-none");
    clearInputs();
  } else {
    Swal.fire({
      title: "Site Name or Url is not valid, Please follow the rules below :",
      icon: "error",
      html: `
          1-Site name must contain at least 3 characters<br/>
          2-Site URL must be a valid one
        `,
      showCloseButton: true,
    });
  }
}

function validation(elementId) {
  var element = document.getElementById(elementId);
  var regex = {
    siteName: /^\w{3,}$/,
    siteUrl: /^https:[\w/]{3,}\.com$/,
  };
  if (regex[elementId].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
