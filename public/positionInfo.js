const rowsToTextBox = (rows) => {
    return rows.reduce((acc, cur) => {
        console.log(cur); 
        return `${acc}${cur.row}\n\r`;
    },'');
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
                queryResult.text(rowsToTextBox(response));
            },
        });
    });

    $('#searchposition-pid-btn').click(() => {
        const pid = $('#position-pid').val(); 

        $.ajax({
            type: 'GET',
            url: 'position/player/' + pid,
            success: (response) => {
                queryResult.text(positionToTextBox(response));
            }
        })
    });

    $('#searchposition-name-btn').click(() => {
        const name = $('#position-name').val(); 

        $.ajax({
            type: 'GET',
            url: 'position/' + name,
            success: (response) => {
                queryResult.text(rowsToTextBox(response));
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
                queryResult.text(rowsToTextBox(response));
            },
        });
    });
});