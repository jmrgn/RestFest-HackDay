//speed = 200;
function log(text) {
    $("#log").append(".\n" + text);
}

var speed = 200;
var next = undefined;
var queue = [];

function tick() {
    if (next === undefined) {
        log("Done.");
        return;
    }
    log("Following " + next);
    $.getJSON(next, function (data) {
        var currentPage = next;
        console.log("got data", data);
        queue = queue.concat(data.collection.items);
        tock();
    });
}

function localtest(msg) {
    console.log('here');
    $.post('speech', {
        words : msg
    });
}

function tock() {
    console.log("tock");
    if (queue.length == 0) {
        tick();
        return;
    }
    var task = queue.shift();
    console.log("task");
    console.log(task);
    console.log(task.href);
    console.log("Following " + 'http://10.0.12.137:1234' + task.href);
    $.getJSON('http://10.0.12.137:1234' + task.href, function (data) {
        console.log("Got Data: " + data.type);
        if (data.type != "http://mogsie.com/2013/workflow/ReadToMe") {
            tock();
            return;
        }
        // take job if it says so
        console.log("Data.start: " + data.start);
        if (data.start) {
            console.log(data);
            var player = new window.GoogleTTS()
            console.log(data.input.text);
            $.post('http://10.0.12.137:1234' + data.start);
            try {
                var player = window.GoogleTTS();
                player.play(data.input.text, "en", function (err) {
                    console.log(err);
                    console.log('Finished playing');
                });
            } catch (e) {
                console.log("here");
                try {
                    console.log("words");
                    localtest(data.input.text);
                } catch (ee) {
                    $.post('http://10.0.12.137:1234' + data.fail);
                }
            }
            $.post('http://10.0.12.137:1234' + data.complete);
        }
    });
}