const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
}

$(document).ready(function() {
  const queryResult = $('#query-result');

  $('#get-gamesPlayed-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'gp',
      success: (response) => {
        queryResult.text(rowsToTextBox(response));
      },
      error: (err) => {
        var errMessage = err.status + ' : ' + err.statusText;
        alert('Error - ' + errMessage);
      }
    });
  });

  $('#add-gamesPlayed-btn').click(() => {
    const gamesPlayedRequestPayload = {
      "time" : $('#game-time').val(),
      "location" : $('#game-loc').val(),
      "team1Name" : $('#team1-name').val(),
      "team2Name" : $('#team2-name').val(),
    };

    $.ajax({
      type: 'POST',
      url: 'gp',
      data: JSON.stringify(gamesPlayedRequestPayload),
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