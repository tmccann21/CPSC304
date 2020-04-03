const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
}

$(document).ready(function(){
  const queryResult = $('#query-result');
  $('#get-players-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'player',
      success: (response) => {
        queryResult.text((rowsToTextBox(response)));
      },
    });
  });

  $('#add-player-btn').click(() => {
    const newPlayerPayload = {
      "playerId": $('#player-id').val(),
      "age": $('#player-age').val(),
      "height": $('#player-height').val(),
      "jerseyNumber": $('#player-numb').val(),
    };
    
    $.ajax({
      type: 'POST',
      url: 'player',
      data: JSON.stringify(newPlayerPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.text(rowsToTextBox(response));
      },
      error: (err) => {
        var errMessage = err.status + ': ' + err.statusText;
        alert('Error - ' + errMessage); 
      }
    });
  });
});