﻿//speed = 200;
function log(text) {
    $("#log").append(".\n" + text);
}

// The next URL to retrieve
var next = undefined;

// Follow the "next" document, add them to the queue, and "tock()"
function tick() {
    if (next === undefined) {
        log("Done.");
        return;
    }
    log("Following " + next);
    $.getJSON(next, function (data) {
        var currentPage = next;
        console.log("got data", data);
        if (data.collection && data.collection.items) {
            if (data.collection.items.length == 0) {
                log("Empty collection, retrying again later");
                setTimeout(tick, 10 * speed);
                return;
            }
            next = undefined;
            log("Found " + data.collection.items.length + " items");
            // assume it's a collection json; since this is a
            // demo it uses introspection instead of media types
            queue = queue.concat(data.collection.items);

            if (typeof data.collection.links == 'array') {
                $.each(data.collection.links, function (key, val) {
                    if (val.rel == "next") next = 'http://10.0.12.137:1234' + val.href;
                    console.log("next", next);
                });
            }
            else {
                console.log("no next link, reloading in a bit.");
                setTimeout(function () {
                    next = currentPage;
                    tick();
                }, 10 * speed);
            }
        }
        tock();
    });
}

// figure out what to do...
function tock() {
    if (queue.length == 0) {
        tick();
        return;
    }
    var task = queue.shift();
    log("Following " + 'http://10.0.12.137:1234' + task.href);
    $.getJSON('http://10.0.12.137:1234' + task.href, function (data) {
        log("Got Data: " + data.type);
        if (data.type != "http://mogsie.com/2013/workflow/ReadToMe") {
            tock();
            return;
        }
        // take job if it says so
        log("Data.start: " + data.start);
        if (data.start) {

            console.log("I should really start work before doing this..");
            var player = new window.GoogleTTS()
            player.play(data.input.text, "en", function (err) {
                console.log('Finished playing');
            });
        }

    });
}