let headRow = document.getElementById('mainRow'); // select table row
let tbody = document.getElementById('tbody'); // select table body

// XMLHttpRequest to mysafeinfo.com to get list of Best Novels in JSON format
let xml = new XMLHttpRequest();
xml.open('GET', 'https://mysafeinfo.com/api/data?list=bestnovels1&format=json&abbreviate=false&case=default' );
xml.addEventListener('readystatechange',function () {
  if (xml.readyState === 4 && xml.status === 200) {
    displayTable();
  }
})
xml.send();

// dynamically crate table row
function displayTable() {
  let data = JSON.parse(xml.responseText); //Parse JSON data to becomes a JavaScript object
  let row = ''; //row data holder
  let first = data[0]; // it takes the first object that we get (first book)
  for(prop in first){ // for in loop trought that object properties
    row += '<th>'+prop+'</th>'; // create table head for each object property
  }
  row += '<th>More</th>'; // crate row for Wikipedia link
  mainRow.innerHTML = row; // create results in HTML

// dynamically crate table body
  let text = '';  //table data holder
  for (let i = 0; i < data.length; i++) { //for loop trough all objects
    text += '<tr>';
    for(prop in data[i]) {  //for in loop trough data
      text += '<td>'+data[i][prop]+'</td>' // crate table data for all object values
    }
    text += '<td><a href="https://en.wikipedia.org/wiki/'+data[i].Title+'" class="btn btn-sm btn-warning" target="_blank">Read more</a></td>';
    text += '</tr>'; // dynamically add Wikipedia link
  }

  tbody.innerHTML = text; // create results in HTML
}
