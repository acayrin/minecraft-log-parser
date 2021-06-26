var editor = ace.edit("editor");
ace.require("ace/ext/language_tools");
ace.require("ace/ext/modelist");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/yml");
editor.setOptions({
    fontFamily: "consolas",
    fontSize: "12px",
});
editor.focus();
$(window).load(function() {
    $("#loader").delay(1000).fadeOut("slow");
    if (window.FileReader) {
        function a(c) {
            c.stopPropagation();
            c.preventDefault();
            if (c.type == "drop") {
                var b = new FileReader();
                b.onloadend = function(d) {
                    editor.session.setValue(this.result)
                };
                b.readAsText(c.dataTransfer.files[0])
            }
        }
        window.addEventListener("dragenter", a, false);
        window.addEventListener("dragover", a, false);
        window.addEventListener("drop", a, false)
    }
});
var i = 0;
var dragging = false;
var dragging2 = false;
$("#dragbar").mousedown(function(f) {
    f.preventDefault();
    dragging = true;
    var d = $("#right");
    var e = $("<div>", {
        id: "ghostbar",
        css: {
            height: d.outerHeight(),
            top: d.offset().top,
            left: d.offset().left
        }
    }).appendTo("body");
    $(document).mousemove(function(a) {
        e.css("left", a.pageX + 1)
    })
});
$(document).mouseup(function(b) {
    if (dragging) {
        $("#left").css("width", b.pageX + 1);
        $("#right").css("left", b.pageX + 1);
        $("#dragbar").css("left", b.pageX + 1);
        $("#ghostbar").remove();
        $(document).unbind("mousemove");
        dragging = false
    }
});
$("#dragbar2").mousedown(function(f) {
    f.preventDefault();
    dragging2 = true;
    var d = $("#res");
    var e = $("<div>", {
        id: "ghostbar2",
        css: {
            top: d.offset().top,
            width: d.outerWidth()
        }
    }).appendTo("body");
    $(document).mousemove(function(a) {
        e.css("top", a.pageY + 1)
    })
});
$(document).mouseup(function(b) {
    if (dragging2) {
        $("#editor").css("height", b.pageY + 1);
        $("#res").css("top", b.pageY + 1).css("height", $(document).outerHeight() - $("#editor").outerHeight() - 11);
        $("#dragbar2").css("top", b.pageY + 1);
        $("#ghostbar2").remove();
        $(document).unbind("mousemove");
        dragging2 = false
    }
});
editor.getSession().on("change", function() {
    var m = editor.getSession().getValue();
    if (m == "") {
        $("#right").html('<h2 style="color:#a5a5a5">Getting started</h2><h3 style="color:#a5a5a5">- Go to <i>/logs</i> folder in your server folder<br/>- Open the latest.log (or any from the archives)<br/>- Simply drag and drop the file to the editor<br/>- Wait for it to fully load and you are done :)<br/><br/><img src="https://img.shields.io/github/license/acayrin/minecraft-log-parser.svg"> <img src="https://img.shields.io/github/last-commit/acayrin/minecraft-log-parser.svg?label=latest"></h3>');
        $("#list").html("<table id='list'><tr><th>Type</th><th>Line</th><th>Error</th></tr></table>")
    } else {
        $("#res").css("height", $(document).outerHeight() - $("#editor").outerHeight() - 11);
        $("#right").html("");
        $("#list").html("<table id='list'><tr><th>Type</th><th>Line</th><th>Error</th></tr></table>");
        var j = m.split("\n");
        var l = "";
        for (var n = 0; n < j.length; n++) {
            var h = j[n];
            h = h.replace(" ", "&nbsp;");
            if (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+INFO]:/g) != null || h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null || h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null || h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g) != null) {
                l = ""
            }
            var o = (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null || l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null) ? "#e20000" : (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g || l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null) != null ? "#a59415" : (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g) || l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)) ? "#ff0000" : "#757575");
            h = h.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "<a id='line" + (n + 1) + "' href='#line" + (n + 1) + "' style='color:transparent;font-size:0'>" + (n + 1) + "</a><span style='font-size:18px;font-weight:bold;color:" + o + "'>│</span> ");
            h = h.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+INFO]:/g, "");
            if (l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null) {
                h = "<span style='font-size:18px;font-weight:bold;color:" + o + "'>│</span><span style='color:#e20000'><strong>&nbsp;&nbsp;&nbsp;" + h
            } else {
                if (l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)) {
                    h = "<span style='font-size:18px;font-weight:bold;color:" + o + "'>│</span><span style='color:#a59415'><strong>&nbsp;&nbsp;&nbsp;" + h
                } else {
                    if (l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)) {
                        h = "<span style='font-size:18px;font-weight:bold;color:" + o + "'>│</span><span style='color:#ff0000'><strong>&nbsp;&nbsp;&nbsp;" + h
                    }
                }
            }
            if (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null) {
                l = j[n];
                h = h.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "");
                h = h.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g, "<span style='color:#a59415'><strong>");
                $("#list").append("<tr><td style='color:#a59415'>WARN</td><td><a href='#line" + (n + 1) + "'><strong>" + (n + 1) + "</strong></a></td><td>" + (j[n].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g, "").replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "")) + "</td>")
            }
            if (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null) {
                l = j[n];
                h = h.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "");
                h = h.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g, "<span style='color:#e20000'><strong>");
                $("#list").append("<tr><td style='color:#e20000'>ERROR</td><td><a href='#line" + (n + 1) + "'><strong>" + (n + 1) + "</strong></a></td><td>" + (j[n].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g, "").replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "")) + "</td>")
            }
            if (h.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g) != null) {
                l = j[n];
                h = h.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "");
                h = h.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g, "<span style='color:#ff0000'><strong>");
                $("#list").append("<tr><td style='color:#ff0000'>FATAL</td><td><a href='#line" + (n + 1) + "'><strong>" + (n + 1) + "</strong></a></td><td>" + (j[n].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g, "").replace(/[[0-9]+:[0-9]+:[0-9]+]/g, "")) + "</td>")
            }
            for (var k = 0; k < 20; k++) {
                h = h.replace("[21m", "</strong><strong>");
                h = h.replace("[4m", "</i><span style='text-decoration:underline'>");
                h = h.replace("[3m", "</i><i>");
                h = h.replace("[5m", "");
                h = h.replace("[9m", "</strong></span></i><span style='text-decoration:line-through'>");
                h = h.replace("[0;30;1m", "</strong></span><span style='color:#000'>");
                h = h.replace("[0;31;1m", "</strong></span><span style='color:#e20000'>");
                h = h.replace("[0;32;1m", "</strong></span><span style='color:#0fbf00'>");
                h = h.replace("[0;33;1m", "</strong></span><span style='color:#a59415'>");
                h = h.replace("[0;34;1m", "</strong></span><span style='color:#004ce5'>");
                h = h.replace("[0;35;1m", "</strong></span><span style='color:#bc00bc'>");
                h = h.replace("[0;36;1m", "</strong></span><span style='color:#01819b'>");
                h = h.replace("[0;37;1m", "</strong></span><span style='color:#ededed'>");
                h = h.replace("[0;30;22m", "</strong></span><span style='color:#000'>");
                h = h.replace("[0;31;22m", "</strong></span><span style='color:#e20000'>");
                h = h.replace("[0;32;22m", "</strong></span><span style='color:#0fbf00'>");
                h = h.replace("[0;33;22m", "</strong></span><span style='color:#a59415'>");
                h = h.replace("[0;34;22m", "</strong></span><span style='color:#004ce5'>");
                h = h.replace("[0;35;22m", "</strong></span><span style='color:#bc00bc'>");
                h = h.replace("[0;36;22m", "</strong></span><span style='color:#01819b'>");
                h = h.replace("[0;37;22m", "</strong></span><span style='color:#ededed'>");
                h = h.replace("[m", "</i></strong></span>")
            }
            $("#right").append(h + "\n")
        }
    }
});
