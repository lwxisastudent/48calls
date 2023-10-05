'use strict';

module.exports = function(stage) {
      switch (stage) {
          case "最后的钟声响起":
              return ["K4","最终钟声鸣响","最終ベルが鳴る"];
          case "剧场女神":
              return ["B5","剧场的女神","シアターの女神"];
          case "永恒之光":
              return ["A5","恋爱禁止条例","恋愛禁止条例"];
          case "不眠之夜":
              return ["B3","睡衣兜风","パジャマドライブ"];
          case "勇气重生":
              return ["K6","RESET","RESET"];
          case "让梦想闪耀":
              return ["向日葵组2","不要让梦想死去","夢を死なせるわけにいかない"];
          case "逆流而上":
              return ["K5","引体后翻","逆上がり"];
          case "前所未有":
              return ["A6","目击者","目撃者"];
          case "我的太阳":
              return ["向日葵组1","我的太阳","僕の太陽"];
          case "青春派对":
              return ["K2","青春女孩","青春ガールズ"];
          case "手牵手":
              return ["S2","手牵手","手をつなぎながら"];
          case "偶像的黎明":
              return ["B4","偶像的黎明","アイドルの夜明け"];
          default:
              return null;
      }
};
