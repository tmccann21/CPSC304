const userNames = ['Michael','Holly','Trevor','Jack','Ethan','Alyssa','Alice','Jessica','Steve','Anwar','Dua Lipa','Joe','Sally','Dwight','Pam'];

const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
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
        queryResult.text(response.row);
      },
    });
  });

  $('#get-users-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'user',
      success: (response) => {
        queryResult.text(rowsToTextBox(response));
      },
    });
  });
});