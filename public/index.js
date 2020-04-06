const userNames = ['Michael','Holly','Trevor','Jack','Ethan','Alyssa','Alice','Jessica','Steve','Anwar','Dua Lipa','Joe','Sally','Dwight','Pam'];

const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
}

// not a pretty fn but it works lol
const renderResult = (rows) => {
  if (!(rows instanceof Array))
    rows = [rows];
  if (rows.length === 0)
    return `<p> no results! </p>`
  const headers = Object.keys(rows[0]).reduce((acc, h) => `${acc}<th><div id='cell'>${h}</div></th>`, '');
  const tableRows = rows.reduce((i, row) => {
    const strRow = Object.keys(row).reduce((j, c) => `${j}<td><div id='cell'>${row[c]}</div></td>`, '');
    return `${i}<tr>${strRow}</tr>`;
  },'')
  const resultToRender = `
    <thead>
      <tr>${headers}</tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  `
  return resultToRender;
}

$(document).ready(function(){
  const queryResult = $('#query-result');
  $('#add-user-btn').click(() => {
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
    const randomNumber = 100 + Math.floor(Math.random() * 899);
    const createUserPayload = {
      "name": randomUser,
      "email": `${randomUser.toLowerCase()}@gmail.com`,
      "phone": `+1 778 ${randomNumber} 0000`,
      "password": `${randomUser}${randomNumber}`,
    };

    $.ajax({
      type: 'POST',
      url: 'user',
      data: JSON.stringify(createUserPayload),
      contentType:'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#get-users-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'user',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#create-user-btn').click(() => {
    const newUserPayload = {
      "name": $('#user-name').val(),
      "email": $('#user-email').val(),
      "phone": $('#user-phone').val(),
      "password": $('#user-pwd').val(),
    };
    
    $.ajax({
      type: 'POST',
      url: 'user',
      data: JSON.stringify(newUserPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#run-join-btn').click(() => {
    const statsPayload = {
      "field": $('#stats-fields').val(),
      "condition": $('#stats-condition').val(),
    };
    
    $.ajax({
      type: 'POST',
      url: 'stats/join',
      data: JSON.stringify(statsPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#run-division-btn').click(() => {
    $.ajax({
      type: 'POST',
      url: 'stats/division',
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#count-users-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'usercount',
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });
});