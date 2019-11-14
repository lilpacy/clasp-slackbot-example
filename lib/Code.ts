var webHookUrl = process.env.WEB_HOOK_URL;
var username = process.env.USER_NAME;  // 通知時に表示されるユーザー名
var icon_url = process.env.ICON_URL;  // 通知時に表示されるアイコン
var devChannel = process.env.DEV_CHANNEL;
var prodChannel = process.env.PROD_CHANNEL;

export function messagePush(){
  var html = UrlFetchApp.fetch('https://newspicks.com/').getContentText();
  var top = Parser.data(html).from('<div class="section top-news centering-page-content">').to('</span> </div> </div> </div>  </div> </div>').build();
  var articles = Parser.data(top).from('<div class="news-card vertical" data-id="').to('</span> </div> </div> </div>').iterate();
  var messages = 'Current popular news! \n';
  articles.forEach(function(ele,i){
    var link = Parser.data(ele).from('" href="/news/').to('?ref=index').build();
    var title = Parser.data(ele).from('<div class="title _ellipsis">').to('</div>').build().replace(/&quot;/g,'"');
    var pickNum = Parser.data(ele).from('<span class="value">').to('</span>').build();
    messages += (i+1).toString(10) + ':<https://newspicks.com/news/' + link + '|' + title + '> ' + pickNum + ' picks' + '\n'
  });
  var jsonData =
      {
        "username" : username,
        "icon_url": icon_url,
        "text" : messages,
        "channel" : devChannel
      };
  var payload = JSON.stringify(jsonData);

  var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
      };
  try {
      UrlFetchApp.fetch(webHookUrl, options);
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
