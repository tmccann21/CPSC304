// not a pretty fn but it works lol
const renderResult = (rows) => {
  if (!(rows instanceof Array))
    rows = [rows];

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
  $('#get-users-btn').click(() => {
    if ($('#player-check').is(":checked")) {
      $.ajax({
        type: 'GET',
        url: 'player',
        success: (response) => {
          queryResult.html(renderResult(response))
        },
      });
    } else if ($('#coach-check').is(":checked")){
      $.ajax({
        type: 'GET',
        url: 'coach',
        success: (response) => {
          queryResult.html(renderResult(response))
        },
      });
    } else if ($('#manager-check').is(":checked")){
      $.ajax({
        type: 'GET',
        url: 'manager',
        success: (response) => {
          queryResult.html(renderResult(response))
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
        queryResult.html(renderResult(response))
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
        queryResult.html(renderResult(response))
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
        queryResult.html(renderResult(response))
      },
      error: (err) => {
        var errMessage = err.status + ': ' + err.statusText;
        alert('Error - ' + errMessage); 
      }
    });
  });
  $('#update-player-btn').click(() => {
    const updatePlayerPayload = {
      "updatefield": $('#player-updatef').val(),
      "updateval": $('#player-updatev').val(),
      "searchval": $('#update-player-searchv').val(),
    };
    
    console.log(updatePlayerPayload); 

    $.ajax({
      type: 'PUT',
      url: 'player',
      data: JSON.stringify(updatePlayerPayload),
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

  $('#update-coach-btn').click(() => {
    const updateCoachPayload = {
      "updatefield": $('#coach-updatef').val(),
      "updateval": $('#coach-updatev').val(),
      "searchval": $('#update-coach-searchv').val(),
    };

    console.log(updateCoachPayload);
    
    $.ajax({
      type: 'PUT',
      url: 'coach',
      data: JSON.stringify(updateCoachPayload),
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

  $('#delete-player-btn').click(() => {
    const deletePlayerPayload = {
      "searchfield": $('#delete-player-searchf').val(),
      "searchval": $('#delete-player-searchv').val(),
    };
    
    console.log(deletePlayerPayload);

    $.ajax({
      type: 'DELETE',
      url: 'player',
      data: JSON.stringify(deletePlayerPayload),
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

  $('#delete-coach-btn').click(() => {
    const deleteCoachPayload = {
      "searchfield": $('#delete-coach-searchf').val(),
      "searchval": $('#delete-coach-searchv').val(),
    };
    
    $.ajax({
      type: 'DELETE',
      url: 'coach',
      data: JSON.stringify(deleteCoachPayload),
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

  $('#delete-manager-btn').click(() => {    
    const deleteManagerPayload = {
      "managerId": $('#delete-manager').val(),
    };

    $.ajax({
      type: 'DELETE',
      url: 'manager',
      data: JSON.stringify(deleteManagerPayload),
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