const editor = ace.edit('editor');
ace.require('ace/ext/language_tools');
ace.require('ace/ext/modelist');
editor.setTheme('ace/theme/tomorrow_night_eighties');
editor.session.setMode('ace/mode/yml');
editor.session.setValue('');
editor.setOptions({
  fontFamily: 'consolas',
  fontSize: '12px',
});
editor.focus();
editor.getSession().on('change', () => {
  const data = editor.getSession().getValue();
  $("#fix").html("");
  $("#res").html('<h4 style="color:white">- Click on the number to go to line<br/>- Click on Bukkit/Spigot to search for help</h4>');
  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let string = lines[i];
    const split = string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null ? '#f43838' : (string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null ? '#f2da29' : '#757575');
    string = string.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, `<a id='line${i}' href='#line${i}' style='color:${split};font-family:Consolas'>${i}</a> <span style='color:#757575'><span style='font-size:18px;font-weight:bold;color:${split}'>│</span></span> ${string.match(/[[0-9]+:[0-9]+:[0-9]+]/g)}`);
    string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+INFO]:/g, "<span style='color:#757575'> →</span>");
    // WARN
    if (lines[i - 1] != null && lines[i - 1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) == null && string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null) {
      string = string.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, '');
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g, "<span style='color:#f2da29'><strong>");
      $("#res").append("<span style='color:#f2da29'>WARN at [<a href='#line" + i + "' style='color:#f2da29'><strong>" + i + "</strong></a>] [<strong><a style='color:#f2da29' href='//google.com/search?q=url:spigotmc.org " + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "' target='_blank'>Spigot</a></strong>] [<strong><a style='color:#f2da29' href='//google.com/search?q=url:bukkit.org " + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "' target='_blank'>Bukkit</a></strong>] </span><span style='color:#cecece'>" + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "</span><br/>");
    } else if (lines[i - 1] != null && lines[i - 1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null && string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g) != null) {
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g, "&nbsp;&nbsp;<span style='color:#f2da29'><strong>");
      string = string.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, '');
    } else {
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g, "&nbsp;&nbsp;<span style='color:#f2da29'><strong>");
    }
    // ERROR
    if (lines[i - 1] != null && lines[i - 1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) == null && string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null) {
      string = string.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, '');
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g, "<span style='color:#f43838'><strong>");
      $("#res").append("<span style='color:#f43838'>ERROR at [<a href='#line" + i + "' style='color:#f43838'><strong>" + i + "</strong></a>] [<strong><a style='color:#f2da29' href='//google.com/search?q=url:spigotmc.org " + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "' target='_blank'>Spigot</a></strong>] [<strong><a style='color:#f2da29' href='//google.com/search?q=url:bukkit.org " + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+WARN]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "' target='_blank'>Bukkit</a></strong>] </span><span style='color:#cecece'>" + lines[i].replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g,"").replace(/[[0-9]+:[0-9]+:[0-9]+]/g,"") + "</span><br/>");
    } else if (lines[i - 1] != null && lines[i - 1].match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null && string.match(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g) != null) {
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g, "<span style='color:#f43838'><strong>");
      string = string.replace(/[[0-9]+:[0-9]+:[0-9]+]/g, '');
    } else {
      string = string.replace(/[[a-zA-Z0-9/\-!@#$%^&*() ]+ERROR]:/g, "<span style='color:#f43838'><strong>");
    }
    for (let z = 0; z < 20; z++) {
      string = string.replace('[21m', '</strong><strong>');
      string = string.replace('[4m', "</i><span style='text-decoration:underline'>");
      string = string.replace('[3m', '</i><i>');
      string = string.replace('[5m', '');
      string = string.replace('[9m', "</strong></span></i><span style='text-decoration:line-through'>");
      string = string.replace('[0;30;1m', "</strong></span><span style='color:black'>");
      string = string.replace('[0;31;1m', "</strong></span><span style='color:#f43838'>");
      string = string.replace('[0;32;1m', "</strong></span><span style='color:#13e800'>");
      string = string.replace('[0;33;1m', "</strong></span><span style='color:#f2da29'>");
      string = string.replace('[0;34;1m', "</strong></span><span style='color:#0055ff'>");
      string = string.replace('[0;35;1m', "</strong></span><span style='color:magenta'>");
      string = string.replace('[0;36;1m', "</strong></span><span style='color:cyan'>");
      string = string.replace('[0;37;1m', "</strong></span><span style='color:#fff'>");
      string = string.replace('[0;30;22m', "</strong></span><span style='color:black'>");
      string = string.replace('[0;31;22m', "</strong></span><span style='color:#f43838'>");
      string = string.replace('[0;32;22m', "</strong></span><span style='color:#13e800'>");
      string = string.replace('[0;33;22m', "</strong></span><span style='color:#f2da29'>");
      string = string.replace('[0;34;22m', "</strong></span><span style='color:#0055ff'>");
      string = string.replace('[0;35;22m', "</strong></span><span style='color:magenta'>");
      string = string.replace('[0;36;22m', "</strong></span><span style='color:cyan'>");
      string = string.replace('[0;37;22m', "</strong></span><span style='color:#fff'>");
      string = string.replace('[m', '</i></strong></span>');
    }
    $('#fix').append(`${string}<br/>`);
  }
});
