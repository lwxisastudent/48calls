`use strict`;

const { url_for } = require(`hexo-util`);
const team = require(`./helper48/team`).team;
const forname = require(`./helper48/forname`);

function listPostsHelper(posts, options) {
  const { config } = this;

  options = options || {};
  if (options.stage == undefined){
    return ``
  }
    
    
  const className = options.class || `archive`;
  const phaseClassName = options.phaseClass || `phase`;
  const songClassName = options.songClass || `song`;
  
  let adjust = true, stage = true;
   
  
  //preinit
 var songList = new Array();
 posts.forEach(post => {
     
     var beginning = 0;
     var i = post.stages.indexOf(options.stage, beginning);
     while(i!=-1){
         var tempSong = new Object();
         let o = parseInt(post.stages[i+1].split('-')[0]) || 0;
         if(o>59){adjust = false}
         let index =  o<30 ? o : (o<50 ? o+10 : o-20); //只有2.0 unit（5x）的情况（也有6x时不变），调整5x放到3x、4x之前
         let title = post.stages[i+1].split('-')[1] || post.title;
         tempSong.originalIndex = o;
         tempSong.index = index;
         
      //复刻曲原名ruby
         if(forname(post.title.replace(/\(.*?\)/g,'')) != null){
             tempSong.output = `<a class="${className}-${songClassName}-link" href="${url_for.call(this, post.path)}"><ruby>${title}<rp>(</rp><rt>${forname(post.title.replace(/\(.*?\)/g,''))[0]}</rt><rp>)</rp></ruby></a>`;
          }
          else{
            tempSong.output = `<a class="${className}-${songClassName}-link" href="${url_for.call(this, post.path)}">${title}</a>`;
          }
          
         songList.push(tempSong);
         
         beginning = i+1;
         i = post.stages.indexOf(options.stage, beginning);
     }
      
 });
  
  /*
  【TAG分类判断1】
  若只有5x（2.0 Unit），则排到2、3之间（adjust）
  若有5x 6x 7x，则按原顺序
  */
  songList = songList
    .sort((a,b) => adjust ? a.index - b.index : a.originalIndex - b.originalIndex);
  
  //【TAG分类判断2】
  //判断是否为完整公演
  if(songList[songList.length-1].originalIndex<10){
      stage = false;
  }

  //init

  var curStage = -1,
      curSong = 1,
      newLine = 1, //换行1: 无空缺(辅助)
      result = `<table class="${className} ${team(options.stage)[0]}">`;
  
  songList.forEach(song => {
    
    let index = adjust ? song.index : (song.originalIndex < 30 ? song.originalIndex : song.originalIndex+10);
    let _curStage = parseInt(index / 10)
      let _curSong = index % 10;
      
    if(curStage == _curStage || !stage){ 
        switch(mode){//【阶段内换行】(阶段最后一行满行后也会触发mode=2，但无需换行)
            case 1:
                result +=`<tr class="${className}-${songClassName}-item">`;
                break;
            case 2:
                result +=`</tr><tr class="${className}-${songClassName}-item">`;
                break;
        }
    }
    else{
        //换阶段
        curStage = _curStage;
        if(songList.indexOf(song)){ //有前座曲时
            while(curSong%3!=1){ //补全剩下的表格
              curSong++;
              result+=`<td class="blank"></td>`;
            }
            result += '</tr>';
            curSong = 1;
        }

        switch (curStage) {
            case 0:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">前座女孩</th></tr><tr class="${className}-${songClassName}-item">`;//【阶段外自动换行】
                break;
            case 1:
                  //Overture
                  if(config.description){
                      result += `<tr class="${className}-${phaseClassName}-item"><th colspan="3">`;
                      result += `<a class="${className}-${songClassName}-link" href="${config.description}">Overture</a>`;
                      result += `</th></tr>`
                  }
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">Opening</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 2:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">Unit</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 3:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">2.0 Unit</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 4:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">Ending</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 5:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">Encore</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 6:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">2.0 Unit</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 7:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">2.0 Ending</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
            case 8:
                result +=`<tr class="${className}-${phaseClassName}-item"><th colspan="3">2.0 Encore</th></tr><tr class="${className}-${songClassName}-item">`;
                break;
        }
    }
    mode = 0;
      
      while(curSong < _curSong){ //!=时: 错误性累加(检测并换行换行2): 有空缺歌曲
                                 //>时: 懒惰模式的无序前座曲,直接罗列不累加空缺
        curSong++;
        result+=`<td></td>`;
        if(curSong%3==1){
            result+=`</tr><tr class="${className}-${songClassName}-item">`; 
        }
      }
      
      result += `<td>`;
      result += song.output;
      result += `</td>`;
      
      
      curSong++; //非错误性累加(检测并换行1)
      if(curSong%3==1){
          mode = 2;
      }
      
    });
    
        while(curSong%3!=1){ //补全剩下的表格
            curSong++;
            result+=`<td class="blank"></td>`;
        }
    result += `</tr></table>`

  return result;
}

module.exports = listPostsHelper;
