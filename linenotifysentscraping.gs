function scraping(){
  
  //スクレイピングするurlを取得
   const url = '//url';
  // htmlをテキスト情報にして抽出
  const content = UrlFetchApp.fetch(url).getContentText();
  const $ = Cheerio.load(content)
  
  
 let title = []
 let link = []
 let u = 0;
  // @ts-ignore
  $('.topicsListItem > a').each((i,element) =>{
  //タイトルを取得
      title.push($(element).text())
  //リンクを取得
      link.push($(element).attr("href"))
      u = u+1
      
})
  
  
  
  //最終行を取得
  const spreadsheet = SpreadsheetApp.openById('//シートid');
 　const sheet = spreadsheet.getSheetByName('//シートネーム')
　 var myrow= sheet.getDataRange().getLastRow()+1
　 let l = u+myrow-1

   const title_last = sheet.getRange(myrow-1,1).getValue()
   //最終行と比較して不一致だった場合最終行にtitleとリンクを記述しlineで送信
   if(title[0] !==title_last){
   
   sheet.getRange(myrow,1).setValue(title[0])
   sheet.getRange(myrow,2).setValue(link[0])
   notify(title[0],link[0])
   }
 

 
 
 
 


}


function notify(title,link) {
　//トークンコード
  const token = "//notify token";
  //送信メッセージを作成
  //スクレイピングしたタイトルとリンクを記述
  var message = title+link;
  
  var options = {
    "method" : "post",
    "headers": { "Authorization": "Bearer " + token },
    "payload" : { "message": message }
  };
  var response = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}


