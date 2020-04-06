const renderResult = (rows) => {
    if (!(rows instanceof Array))
        rows = [rows];

    if (rows.length === 0)
        return `<p> no results! </p>`
    const headers = Object.keys(rows[0]).reduce((acc, h) => `${acc}<th><div id='cell'>${h}</div></th>`, '');
    const tableRows = rows.reduce((i, row) => {
        const strRow = Object.keys(row).reduce((j, c) => `${j}<td><div id='cell'>${row[c]}</div></td>`, '');
        return `${i}<tr>${strRow}</tr>`;
    }, '')
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

$(document).ready(function () {
    const queryResult = $('#query-result');
    $('#get-stats-btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'stats/player',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#get-avgstats-btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'stats/avg',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#get-totalstats-btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'stats/total',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-pid-btn').click(() => {
        const pid = $('#pid').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/player/' + pid,
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-pavg-btn').click(() => {
        const pid = $('#pid').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/player/' + pid + '/avg',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-ptotal-btn').click(() => {
        const pid = $('#pid').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/player/' + pid + '/total',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#add-stats-btn').click(() => {
        const newStatsPayload = {
            "playerId": $('#pid').val(),
            "year": $('#year').val(),
            "goals": $('#goals').val(),
            "assists": $('#assists').val(),
            "saves": $('#saves').val(),
            "plusminus": $('#plusminus').val(),
        };

        $.ajax({
            type: 'POST',
            url: 'stats/player/',
            data: JSON.stringify(newStatsPayload),
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-goals-btn').click(() => {
        const count = $('#stats-count').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/goals/' + count,
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-assists-btn').click(() => {
        const count = $('#stats-count').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/assists/' + count,
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-saves-btn').click(() => {
        const count = $('#stats-count').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/saves/' + count,
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });

    $('#stats-plusminus-btn').click(() => {
        const count = $('#stats-count').val(); 

        $.ajax({
            type: 'GET',
            url: 'stats/pm/' + count,
            success: (response) => {
                queryResult.html(renderResult(response))
            },
        });
    });






});