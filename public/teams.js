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

  $('#list-teams-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'teams',
      contentType:'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#list-team-seasons-btn').click(() => {
    const getSeasonsPayload = {
      teamName: $('#team-name-field').val(),
    } 
    $.ajax({
      type: 'POST',
      url: 'teamseason',
      data: JSON.stringify(getSeasonsPayload),
      contentType:'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });

  $('#list-seasons-btn').click(() => {
    $.ajax({
      type: 'GET',
      url: 'seasons',
      contentType:'application/json; charset=utf-8',
      success: (response) => {
        queryResult.html(renderResult(response));
      },
    });
  });
});