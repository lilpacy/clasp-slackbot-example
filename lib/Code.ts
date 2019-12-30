var webHookUrl = process.env.WEB_HOOK_URL;
var username = process.env.USER_NAME; // 通知時に表示されるユーザー名
var icon_url = process.env.ICON_URL; // 通知時に表示されるアイコン
var devChannel = process.env.DEV_CHANNEL;
var prodChannel = process.env.PROD_CHANNEL;

export function messagePush() {
  var html = UrlFetchApp.fetch("https://qiita.com/").getContentText();
  var top = Parser.data(html)
    .from(
      'Milestones</option></select></div></div><div class="p-home_main mb-3 mr-0@s">'
    )
    .to(
      '&quot;scope&quot;:&quot;daily&quot;}"></div></div><div class="p-home_aside">'
    )
    .build();
  var articles = Parser.data(top)
    .from(";:[],&quot;isLikedByViewer")
    .to("&quot;}}},{&quot;followingLikers&quot")
    .iterate();
  articles.pop(); // 最後に余計な配列が1つ入るので切り落とす
  var messages = "Today's popular articles!\n";
  var i = 0;
  var items = [];
  articles.forEach(function(ele) {
    var tmp = Parser.data(ele)
      .from("esCount&quot;:")
      .to(",&quot;title&quot;:&quot;")
      .build();
    var item = {};
    item.likes = parseInt(tmp, 10);
    if (true) {
      item.uuid = Parser.data(ele)
        .from("&quot;,&quot;uuid&quot;:&quot;")
        .to(
          "&quot;,&quot;author&quot;:{&quot;profileImageUrl&quot;:&quot;https"
        )
        .build();
      item.title = Parser.data(ele)
        .from(",&quot;title&quot;:&quot;")
        .to("&quot;,&quot;uuid&quot;:&quot;")
        .build()
        .replace(/&quot;/g, '"');
      item.author = Parser.data(ele)
        .from("&quot;,&quot;urlName&quot;:&quot;")
        .to("")
        .build();
      items.push(item);
      // messages += (i + 1).toString(10) + ':<https://qiita.com/' + author + '/items/' + uuid + '|' + title + '> ' + JSON.stringify(likes) + ' likes' + '\n';
      i++;
    } else {
    }
  });

  items.sort(function(a, b) {
    return b.likes - a.likes;
  }); // descending order
  items.map(function(item, i) {
    var line =
      i == 0 || i == 10 || i == 20
        ? "\n　▼ Rank " +
          JSON.stringify(i + 1) +
          "~" +
          JSON.stringify(i + 10) +
          " articles" +
          "\n\n"
        : "";
    messages +=
      line +
      "　　" +
      (i + 1).toString(10) +
      ":<https://qiita.com/" +
      "kokodo-demoiinyo" +
      "/items/" +
      item.uuid +
      "|" +
      item.title +
      "> " +
      JSON.stringify(item.likes) +
      " likes" +
      "\n";
  });

  var jsonData = {
    username: username,
    icon_url: icon_url,
    text: messages,
    channel: devChannel
  };
  var payload = JSON.stringify(jsonData);
  var options = {
    method: "post",
    contentType: "application/json",
    payload: payload
  };

  try {
    Logger.log(UrlFetchApp.fetch(webHookUrl, options));
  } catch (e) {
    Logger.log(e);
  }
}

export function doGet() {
  messagePush();
}

export function doPost() {
  messagePush();
}

// --- Debug

var prodUrl =
  "https://hooks.slack.com/services/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";
var devUrl =
  "https://hooks.slack.com/services/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";
var username = "NewsPicks"; // 通知時に表示されるユーザー名
var icon_url =
  "https://toshioakaneya.com/wp-content/uploads/2018/08/246x0w.jpg"; // 通知時に表示されるアイコン
var prodChannel = "#times_lilpacy";
var devChannel = "#times_lilpacy_dev";

function pushToSlack(string) {
  var jsonData = {
    username: username,
    icon_url: icon_url,
    text: string,
    channel: devChannel
  };
  var payload = JSON.stringify(jsonData);

  var options = {
    method: "post",
    contentType: "application/json",
    payload: payload
  };
  UrlFetchApp.fetch(devUrl, options);
}
