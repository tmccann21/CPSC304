const rowsToTextBox = (rows) => {
  return rows.reduce((acc, cur) => {
    return `${acc}${cur.row}\n\r`;
  },'');
}

const teamToText = (teams) => {
  return teams.reduce((acc, cur) => {
    return `${acc}${cur.teamname}\n\r`;
  },'');
}

$(document).ready(function() {
  const queryResult = $('#query-result');
  const teamBox = $('#team-box');
  const gameBox = $('#game-box');

  // query data for team and game
  $.ajax({
    type: 'GET',
    url: 'g',
    success: (response) => {
      gameBox.text("Registered Games: \n" + rowsToTextBox(response));
    },
    error: (err) => {
      var errMessage = err.status + ' : ' + err.statusText;
      alert('Error - ' + errMessage);
    }
  });

  $.ajax({
    type: 'GET',
    url: 't',
    success: (response) => {
      teamBox.text("Registered Teams: \n" + teamToText(response));
    },
    error: (err) => {
      var errMessage = err.status + ' : ' + err.statusText;
      alert('Error - ' + errMessage);
    }
  });

  $('#list-games-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'g',
      success: (response) => {
        queryResult.text("Games Played: \n" + rowsToTextBox(response));
      },
      error: (err) => {
        var errMessage = err.status + ' : ' + err.statusText;
        alert('Error - ' + errMessage);
      }
    });
  });

  $('#list-gamesPlayed-btn').click(() => {
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

  $('#get-gamesPlayed-btn').click(() => {
    const getGamesPlayedRequestPayload = {
      "time" : $('#game-time').val(),
      "location" : $('#game-loc').val(),
      "team1Name" : $('#team1-name').val(),
      "team2Name" : $('#team2-name').val(),
    };

    $.ajax({
      type: 'GET',
      url: 'gp/:id',
      data: JSON.stringify(getGamesPlayedRequestPayload),
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

  $('#add-gamesPlayed-btn').click(() => {
    const gamesPlayedRequestPayload = {
      "time" : $('#game-time').val(),
      "location" : $('#game-loc').val(),
      "team1Name" : $('#team1-name').val(),
      "team2Name" : $('#team2-name').val(),
      "team1Score" : $('#team1-score').val(),
      "team2Score" : $('#team2-score').val(),
    };
    $.ajax({
      type: 'POST',
      url: 'games',
      data: JSON.stringify(gamesPlayedRequestPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        console.log("added game");
      },
      error: (err) => {
        var errMessage = err.status + ': ' + err.statusText;
        alert('Error - ' + errMessage); 
      }
    })

    // $.ajax({
    //   type: 'GET',
    //   url: 'games',
    //   success: (response) => {
    //     queryResult.text(rowsToTextBox(response));
    //   },
    //   error: (err) => {
    //     var errMessage = err.status + ' : ' + err.statusText;
    //     alert('Error - ' + errMessage);
    //   }
    // })

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