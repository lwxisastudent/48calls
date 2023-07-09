// A local search script with the help of
// [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
//
// Modified by:
// Pieter Robberechts <http://github.com/probberechts>

/*exported searchFunc*/
var searchFunc = function(path, searchId, contentId) {

  function stripHtml(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
    html = html.replace(/<figure([\s\S]*?)<\/figure>/gi, "");
    html = html.replace(/<\/div>/ig, "\n");
    html = html.replace(/<\/li>/ig, "\n");
    html = html.replace(/<li>/ig, "  *  ");
    html = html.replace(/<\/ul>/ig, "\n");
    html = html.replace(/<\/p>/ig, "\n");
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    
    html = html.replace('</blockquote>','别称')
    html = html.replace(/<[^>]+>/ig, "");
    
    html = html.replace("△", "");
    html = html.replace("⚪" ,"");
    return html;
  }

  function getAllCombinations(keywords) {
    var i, j, result = [];

    for (i = 0; i < keywords.length; i++) {
        for (j = i + 1; j < keywords.length + 1; j++) {
            result.push(keywords.slice(i, j).join(" "));
        }
    }
    return result;
  }

  $.ajax({
    url: path,
    dataType: "xml",
    success: function(xmlResponse) {
      // get the contents from search data
      var datas = $("entry", xmlResponse).map(function() {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("link", this).attr("href")
        };
      }).get();

      var $input = document.getElementById(searchId);
      if (!$input) { return; }
      var $resultContent = document.getElementById(contentId);

      $input.addEventListener("input", function(){
        var resultList = [];
        var keywords = getAllCombinations(this.value.trim().toLowerCase().split("|"))  //|符号号分割
          .sort(function(a,b) { return b.split(" ").length - a.split(" ").length; });
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        // perform local searching
        datas.forEach(function(data) {
          var matches = 0; //权重
          var match_title = false; //标题完全匹配优先
          
          if (!data.title || data.title.trim() === "") {
            data.title = "冇名";
          }
          var dataTitleOrigin = data.title.trim().toLowerCase();
          var dataTitle = [dataTitleOrigin];
          var dataContent = stripHtml(data.content.trim()).toLowerCase();
          
          let i = dataContent.indexOf('别称：')
          if(i!=-1){
              let j = dataContent.indexOf('别称',i+1)
              if(j!=-1){
                  dataTitle.push(...dataContent.substring(i+3,j).split('、'))
                  dataContent = dataContent.substring(j+2)
              }
          }
          
          var dataUrl = data.url;
          var indexContent = -1;
          var firstOccur = -1;
          var titleoccur;
          
          // only match artiles with not empty contents
          if (dataContent !== "") {
              
              try{
            keywords.forEach(function(keyword) {
                //匹配歌名
                dataTitle.forEach((title) => {
                
                    let indexTitle = -1;
                      indexTitle = title.indexOf(keyword);
                      if(indexTitle >= 0){
                          titleoccur = title;
                        throw new Error("match_title");
                      }
                    
                })
                
                //匹配歌词
              indexContent = dataContent.indexOf(keyword);
              
              if(indexContent >= 0 ){
                matches+=1;
                if (indexContent < 0) {
                  indexContent = 0;
                }
                if (firstOccur < 0) {
                  firstOccur = indexContent;
                }
              }
            });
              }catch(e){
                    match_title = true;
                    matches += 1;
              }
          }
          // show search results
          if (matches > 0) {
            var searchResult = {};
            searchResult.rank = matches;
            searchResult.match_title = match_title;
            
              // highlight all keywords
              var regS = new RegExp(keywords.join("|"), "gi");
              var matchTitle =  match_title ? titleoccur : dataTitle[0];
              matchTitle = matchTitle.replace(regS, function(keyword) {
                return "<em class=\"search-keyword\">"+keyword+"</em>";
              });
            
            searchResult.str = "<li><a href='"+ dataUrl +"' class='search-result-title'>"+ matchTitle +"</a>";
            if (firstOccur >= 0) {
              // cut out 100 characters
              var start = firstOccur - 20;
              var end = firstOccur + 80;

              if(start < 0){
                start = 0;
              }

              if(start == 0){
                end = 100;
              }

              if(end > dataContent.length){
                end = dataContent.length;
              }

              var matchContent = dataContent.substring(start, end);

              matchContent = matchContent.replace(regS, function(keyword) {
                return "<em class=\"search-keyword\">"+keyword+"</em>";
              });

              searchResult.str += "<p class=\"search-result\">" + matchContent +"...</p>";
            }
            searchResult.str += "</li>";
            resultList.push(searchResult);
          }
        });
        if (resultList.length) {
          resultList.sort(function(a, b) {
              return a.match_title ? -1 : (b.match_title ? 1 : b.rank - a.rank);
          });
          var result ="<ul class=\"search-result-list\">";
          for (var i = 0; i < resultList.length; i++) {
            result += resultList[i].str;
          }
          result += "</ul>";
          $resultContent.innerHTML = result;
        }
      });
    }
  });
};
