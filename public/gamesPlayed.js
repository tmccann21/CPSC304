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

const updateGamesTable = (gameBox) => {
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
}

const updateTeamsTable = (teamBox) => {
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
}

$(document).ready(function() {
  const queryResult = $('#query-result');
  const teamBox = $('#team-box');
  const gameBox = $('#game-box');

  // query data for team and game on startup
  updateGamesTable(gameBox);
  updateTeamsTable(teamBox);

  // button functions

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

  $('#find-gamesPlayed-btn').click(() => {
    // var gTime = $('#game-time').val();
    // var gLoc = $('#game-loc').val();
    var gT1N =  $('#find-team1-name').val();
    var gT2N = $('#find-team2-name').val();

    // gTime = (gTime == "") ? '%' : gTime;
    // gLoc = (gLoc == "") ? '%' : gLoc;
    // gT1N = (gT1N == "") ? '%' : gT1N;
    gT2N = (gT2N == "") ? '%' : gT2N;
    
    $.ajax({
      type: 'GET',
      // url: 'gp/' + gTime + '/' + gLoc + '/' + gT1N + '/' + gT2N,
      url: 'gp/' + gT1N + '/' + gT2N,
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

    // creates an entry in games first so there is no fkey violation
    $.ajax({
      type: 'POST',
      url: 'g',
      data: JSON.stringify(gamesPlayedRequestPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        updateGamesTable(gameBox);
      },
      error: (err) => {
        var errMessage = err.status + ': ' + err.statusText;
        alert('Error - ' + errMessage); 
      }
    })


    $.ajax({
      type: 'POST',
      url: 'gp',
      data: JSON.stringify(gamesPlayedRequestPayload),
      contentType: 'application/json; charset=utf-8',
      success: (response) => {
        queryResult.text("Successfully added a game played: \n" + response.row);
      },
      error: (err) => {
        queryResult.text("Could not add game");
        var errMessage = err.status + ': ' + err.statusText;
        alert('Error - ' + errMessage); 
      }
    });
  });
});