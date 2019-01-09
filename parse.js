var editor=ace.edit("editor");ace.require("ace/ext/language_tools"),ace.require("ace/ext/modelist"),editor.setTheme("ace/theme/chrome"),editor.session.setMode("ace/mode/yml"),editor.setOptions({fontFamily:"consolas",fontSize:"12px"}),editor.focus(),$(window).load(function(){$("#loader").delay(1e3).fadeOut("slow"),null!=Cookies.get("last")?editor.session.setValue(Cookies.get("last")):editor.session.setValue("")});var i=0,dragging=!1,dragging2=!1;$("#dragbar").mousedown(function(e){e.preventDefault(),dragging=!0;var t=$("#right"),a=$("<div>",{id:"ghostbar",css:{height:t.outerHeight(),top:t.offset().top,left:t.offset().left}}).appendTo("body");$(document).mousemove(function(e){a.css("left",e.pageX+1)})}),$(document).mouseup(function(e){dragging&&($("#left").css("width",e.pageX+1),$("#right").css("left",e.pageX+1),$("#dragbar").css("left",e.pageX+1),$("#ghostbar").remove(),$(document).unbind("mousemove"),dragging=!1)}),$("#dragbar2").mousedown(function(e){e.preventDefault(),dragging2=!0;var t=$("#res"),a=$("<div>",{id:"ghostbar2",css:{top:t.offset().top,width:t.outerWidth()}}).appendTo("body");$(document).mousemove(function(e){a.css("top",e.pageY+1)})}),$(document).mouseup(function(e){dragging2&&($("#editor").css("height",e.pageY+1),$("#res").css("top",e.pageY+1).css("height",$(document).outerHeight()-$("#editor").outerHeight()-11),$("#dragbar2").css("top",e.pageY+1),$("#ghostbar2").remove(),$(document).unbind("mousemove"),dragging2=!1)}),editor.getSession().on("change",function(){var e=editor.getSession().getValue();if(Cookies.set("last",e),""==e)$("#right").html('<h2 style="color:#bababa">Getting started</h2><h3 style="color:#bababa">- Go to folder /logs in your server folder<br/>- Open the latest.log (or any from the archives)<br/>- Copy and paste the file in to the editor<br/>- Wait for it to fully load and you are done :)<br/></h3>'),$("#list").html("<table id='list'><tr><th>Type</th><th>Line</th><th>Error</th><th>Solution</th></tr></table>");else{$("#res").css("height",$(document).outerHeight()-$("#editor").outerHeight()-11),$("#right").html(""),$("#list").html("<table id='list'><tr><th>Type</th><th>Line</th><th>Error</th><th>Solution</th></tr></table>");for(var t=e.split("\n"),a="",o=0;o<t.length;o++){var l=t[o],r=null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g)?"#e20000":null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)?"#a59415":"#757575";l=(l=l.replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"<a id='line"+o+"' href='#line"+o+"' style='color:"+r+";font-family:Consolas'>"+o+"</a> <span style='color:#757575'><span style='font-size:18px;font-weight:bold;color:"+r+"'>│</span></span> "+l.match(/[[0-9]+:[0-9]+:[0-9]+]/g))).replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+INFO]:/g,"<span style='color:#757575'> →</span>"),null!=t[o-1]&&null==t[o-1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)&&null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)?(a=t[o],l=(l=l.replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")).replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"<span style='color:#a59415'><strong>"),$("#list").append("<tr><td style='color:#a59415'>WARN</td><td><a href='#line"+o+"'><strong>"+o+"</strong></a></td><td>"+t[o].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")+"</td><td>NULL</td>")):l=null!=a&&null!=a.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)||null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g)?(l=l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"&nbsp;&nbsp;<span style='color:#a59415'><strong>")).replace(/[[0-9]+:[0-9]+:[0-9]+]/g,""):l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"&nbsp;&nbsp;<span style='color:#a59415'><strong>"),null!=t[o-1]&&null==t[o-1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g)&&null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g)?(a=t[o],l=(l=l.replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")).replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g,"<span style='color:#e20000'><strong>"),$("#list").append("<tr><td style='color:#e20000'>ERROR</td><td><a href='#line"+o+"'><strong>"+o+"</strong></a></td><td>"+t[o].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")+"</td><td>NULL</td>")):l=null!=a&&null!=a.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g)||null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g)?(l=l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g,"<span style='color:#e20000'><strong>")).replace(/[[0-9]+:[0-9]+:[0-9]+]/g,""):l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g,"<span style='color:#e20000'><strong>"),null!=t[o-1]&&null==t[o-1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)&&null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)?(a=t[o],l=(l=l.replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")).replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g,"<span style='color:#ff0000'><strong>"),$("#list").append("<tr><td style='color:#ff0000'>FATAL</td><td><a href='#line"+o+"'><strong>"+o+"</strong></a></td><td>"+t[o].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"")+"</td><td>NULL</td>")):l=null!=a&&null!=a.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)||null!=l.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g)?(l=l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g,"<span style='color:#ff0000'><strong>")).replace(/[[0-9]+:[0-9]+:[0-9]+]/g,""):l.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+FATAL]:/g,"<span style='color:#ff0000'><strong>");for(var s=0;s<20;s++)l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=l.replace("[21m","</strong><strong>")).replace("[4m","</i><span style='text-decoration:underline'>")).replace("[3m","</i><i>")).replace("[5m","")).replace("[9m","</strong></span></i><span style='text-decoration:line-through'>")).replace("[0;30;1m","</strong></span><span style='color:#000'>")).replace("[0;31;1m","</strong></span><span style='color:#e20000'>")).replace("[0;32;1m","</strong></span><span style='color:#0fbf00'>")).replace("[0;33;1m","</strong></span><span style='color:#a59415'>")).replace("[0;34;1m","</strong></span><span style='color:#004ce5'>")).replace("[0;35;1m","</strong></span><span style='color:#bc00bc'>")).replace("[0;36;1m","</strong></span><span style='color:#01819b'>")).replace("[0;37;1m","</strong></span><span style='color:#ededed'>")).replace("[0;30;22m","</strong></span><span style='color:#000'>")).replace("[0;31;22m","</strong></span><span style='color:#e20000'>")).replace("[0;32;22m","</strong></span><span style='color:#0fbf00'>")).replace("[0;33;22m","</strong></span><span style='color:#a59415'>")).replace("[0;34;22m","</strong></span><span style='color:#004ce5'>")).replace("[0;35;22m","</strong></span><span style='color:#bc00bc'>")).replace("[0;36;22m","</strong></span><span style='color:#01819b'>")).replace("[0;37;22m","</strong></span><span style='color:#ededed'>")).replace("[m","</i></strong></span>");$("#right").append(l+"<br/>")}}});
