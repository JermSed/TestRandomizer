// delete rows in the upload test page
function delRow() {
  var table = document.getElementById("myTable");
  var tblen = table.rows.length;
  var index = tblen - 1;

  document.getElementById('myTable').deleteRow(index);
}

// add rows
function addRow() {
  var table = document.getElementById("myTable");
  var tblen = table.rows.length;
  var row = table.insertRow(tblen);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = tblen;
  cell2.innerHTML = "<form style='width: 95%;'><input type='file' id='myFile' name='filename'></form>";
  cell3.innerHTML = "<input type='text' style='width: 95%;'>";
  cell1.classList.add("centered-cell");
}

// saves the table contents
function saveTableContents() {
  var table = document.getElementById("myTable");
  var data = [];

  for (var i = 1; i < table.rows.length; i++) {
    var questionNumber = table.rows[i].cells[0].innerHTML;

    try {
      var questionUpload = table.rows[i].cells[1].getElementsByTagName("input")[0].value;

    } catch (error) {
      var questionUpload = table.rows[i].cells[1].innerHTML;
    }
    try {
      var answerUpload = table.rows[i].cells[2].getElementsByTagName("input")[0].value;
      // Code that depends on the 'answerUpload' variable
    } catch (error) {
      var answerUpload = table.rows[i].cells[2].innerHTML;
    }

    
    data.push([questionNumber, questionUpload, answerUpload]);


    // Send the data to the server or perform any desired operations here
    for (var j = 0; j < data.length; j++) {
      console.log(data[j]);
    }
  }
  var userInput = document.getElementById("testLen").value;
  if (userInput) {
    data.push(parseInt(userInput));
  }
  else {
    data.push(data.length);
  }
  localStorage.setItem('Test', JSON.stringify(data));
  location.reload();
}

//renders the pictures to display on the test
function displayImage(src, width, height) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  document.body.appendChild(img);
}

function createTable() {
  var storedData = localStorage.getItem('Test');
  var table = document.getElementById("myTable");
  if (storedData) {
    console.log(storedData, "true");
    var data = [];
    data = JSON.parse(storedData);
    for (var i = 0; i < data.length - 1; i++) {
      var tblen = table.rows.length;
      var row = table.insertRow(tblen);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = data[i][0]; // table is weird?? it was minus 1 before
      cell2.innerHTML = data[i][1];
      // var imageElement = document.getElementById('myImage');
      // imageElement.src = imageData;
      cell3.innerHTML = data[i][2];
      cell1.classList.add("centered-cell");
    }
  }
  else {
    console.log(storedData, "false");
    for (var i = 0; i < 2; i++) {
      var tblen = table.rows.length;
      var row = table.insertRow(tblen);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = tblen;
      cell2.innerHTML = "<form style='width: 95%;'><input type='file' id='myFile' name='filename'></form>";
      cell3.innerHTML = "<input type='text' style='width: 95%;'>";
      cell1.classList.add("centered-cell");

    }
  }
}
// for when you clear or save the databases
function showPopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'block';

  setTimeout(function() {
    popup.style.display = 'none';
    // Call your action function here
  }, 3000);
}

function clearDatabase() {
  var confirmation = confirm("Are you sure you want to delete the database? This action cannot be undone.");
  if (confirmation) {
    localStorage.clear();
    location.reload();
  }

}

function generateTest() {
  // gets the test values from the local storage
  var storedData = localStorage.getItem('Test');
  var data = [];

  // stores the entire test in a 2D array called data
  if (storedData) {
    data = JSON.parse(storedData);
  }

  // displays the entire 2D array under the table (just for testing)
  document.getElementById("Gtest").innerHTML = JSON.stringify(data);// displays test
  // displays all of the information in data into the "testTable"
  var table = document.getElementById("testTable");


  // randomizes the test questions 
  var tblen = table.rows.length;
  var removable_problems = data.slice();
  removable_problems.splice(removable_problems.length - 1, 1);
  for (var j = 0; j < data[data.length - 1]; j++) {
    tblen = table.rows.length;
    var row = table.insertRow(tblen);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var value = Math.floor(Math.random() * removable_problems.length);
    cell1.innerHTML = tblen; // table is weird?? it was minus 1 before
    cell2.innerHTML = removable_problems[value][1]
    // var imageElement = document.getElementById('myImage');
    // imageElement.src = imageData;
    cell3.innerHTML = removable_problems[value][2];
    cell1.classList.add("centered-cell");
    removable_problems.splice(value, 1);
  }
  displayImage('1.png', 100, 100);
  var arrTest = [];

  for (var i = 1; i < table.rows.length; i++) {
    var questionNumber = table.rows[i].cells[0].innerHTML;

    try {
      var questionUpload = table.rows[i].cells[1].getElementsByTagName("input")[0].value;

    } catch (error) {
      var questionUpload = table.rows[i].cells[1].innerHTML;
    }
    try {
      var answerUpload = table.rows[i].cells[2].getElementsByTagName("input")[0].value;
      // Code that depends on the 'answerUpload' variable
    } catch (error) {
      var answerUpload = table.rows[i].cells[2].innerHTML;
    }
    // Conver.  the image data to a Base64 string
    arrTest.push([questionNumber, questionUpload, answerUpload]);


    // Send the data to the server or perform any desired operations here
    for (var j = 0; j < data.length; j++) {
      console.log(arrTest[j]);
    }
  }
  //arrTest.push(arrTest.length);
  localStorage.setItem('studentTest', JSON.stringify(arrTest));



}

// ??? what is the purpose of this
function showStudent() {

  // gets the test values from the local storage
  var storedData = localStorage.getItem('studentTest');
  var data = [];

  // stores the entire test in a 2D array called data
  if (storedData) {
    data = JSON.parse(storedData);
  }

  // displays all of the information in data into the "testTable"
  var table = document.getElementById("takeTable");
  data = JSON.parse(storedData);
  for (var i = 0; i < data.length; i++) {
    var tblen = table.rows.length;
    var row = table.insertRow(tblen);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data[i][0]; // table is weird?? it was minus 1 before
    cell2.innerHTML = data[i][1];
    cell3.innerHTML = "<input type='text' style='width: 85%;'></input>";
    cell1.classList.add("centered-cell");
  }

}


// display the student's test interfacer
function score() {
  var score= 0;
  var table = document.getElementById("takeTable");

  // gets the test values from the local storage
  var storedData = localStorage.getItem('studentTest');
  var data = [];

  // stores the entire test in a 2D array called data
  
  data = JSON.parse(storedData)

  console.log(data);

  for (var i = 1; i < table.rows.length; i++) {
    var answer = table.rows[i].cells[2].getElementsByTagName("input")[0].value;
    console.log(answer + " " + data[i-1][2]);
    if (answer === data[i-1][2]){
      score++;
    }

  }
  var ans = (score / data.length ) * 100;
  var lab = document.getElementById("lab");
  if(ans >= 75){
    
    lab.innerHTML = "Congratulations! "+ ans + "%";
    
  }
  else{
    lab.innerHTML = "Better Luck Next Time: " + ans + "%";
  }
  
  console.log(ans);
}


