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

const positionToTextBox = (rows) => {
    return rows.reduce((acc, cur) => {
        console.log(cur); 
        return `${acc}${cur.positionname}\n\r`;
    },'');
}

$(document).ready(function () {
    const queryResult = $('#query-result');
    $('#get-positions-btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'position',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#searchposition-pid-btn').click(() => {
        const pid = $('#position-pid').val(); 

        $.ajax({
            type: 'GET',
            url: 'position/player/' + pid,
            success: (response) => {
                queryResult.html(renderResult(response))
            }
        })
    });

    $('#searchposition-name-btn').click(() => {
        const name = $('#position-name').val(); 

        $.ajax({
            type: 'GET',
            url: 'position/' + name,
            success: (response) => {
                queryResult.html(renderResult(response))
            }
        })
    });

    $('#add-position-btn').click(() => {
        const newPositionPayload = {
            "playerId": $('#position-pid').val(),
            "positionName": $('#position-name').val(),
        };

        $.ajax({
            type: 'POST',
            url: 'position',
            data: JSON.stringify(newPositionPayload),
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });
});