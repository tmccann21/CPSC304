const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
}

$(document).ready(function(){
  const queryResult = $('#query-result');
  $('#get-users-btn').click(() => {
    if ($('#player-check').is(":checked")) {
      $.ajax({
        type: 'GET',
        url: 'player',
        success: (response) => {
          queryResult.text((rowsToTextBox(response)));
        },
      });
    } else if ($('#coach-check').is(":checked")){
      $.ajax({
        type: 'GET',
        url: 'coach',
        success: (response) => {
          queryResult.text((rowsToTextBox(response)));
        },
      });
    } else if ($('#manager-check').is(":checked")){
      $.ajax({
        type: 'GET',
        url: 'manager',
        success: (response) => {
          queryResult.text((rowsToTextBox(response)));
        },
      });
    }
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

  $('#add-coach-btn').click(() => {
    const newCoachPayload = {
      "coachId": $('#coach-id').val(),
      "age": $('#coach-age').val(),
      "gender": $('#coach-gender').val(),
    };
    
    $.ajax({
      type: 'POST',
      url: 'coach',
      data: JSON.stringify(newCoachPayload),
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

  $('#add-manager-btn').click(() => {
    const newManagerPayload = {
      "managerId": $('#manager-id').val(),
    };
    
    $.ajax({
      type: 'POST',
      url: 'manager',
      data: JSON.stringify(newManagerPayload),
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