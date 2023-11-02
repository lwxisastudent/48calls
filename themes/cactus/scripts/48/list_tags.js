'use strict';

const { url_for, escapeHTML } = require('hexo-util');
const { default: moize } = require('moize');
const { team } = require('./helper48/team');
const trans = require(`./helper48/trans`);

function listTagsHelper(tags, options) {
  if (!options && (!tags || !Object.prototype.hasOwnProperty.call(tags, 'length'))) {
    options = tags;
    tags = this.site.tags;
  }

  if (!tags || !tags.length) return '';
  options = options || {};

  const { style = 'list', transform, separator = ', ', suffix = '' } = options;
  const showCount = Object.prototype.hasOwnProperty.call(options, 'show_count') ? options.show_count : true;
  const classStyle = typeof style === 'string' ? `-${style}` : '';
  let className, ulClass, liClass, aClass, labelClass, countClass, labelSpan;
  if (typeof options.class !== 'undefined') {
    if (typeof options.class === 'string') {
      className = options.class;
    } else {
      className = 'tag';
    }

    ulClass = options.class.ul || `${className}${classStyle}`;
    liClass = options.class.li || `${className}${classStyle}-item`;
    aClass = options.class.a || `${className}${classStyle}-link`;
    labelClass = options.class.label || `${className}${classStyle}-label`;
    countClass = options.class.count || `${className}${classStyle}-count`;

    labelSpan = Object.prototype.hasOwnProperty.call(options.class, 'label');
  } else {
    className = 'tag';
    ulClass = `${className}${classStyle}`;
    liClass = `${className}${classStyle}-item`;
    aClass = `${className}${classStyle}-link`;
    labelClass = `${className}${classStyle}-label`;
    countClass = `${className}${classStyle}-count`;

    labelSpan = false;
  }
  const orderby = options.orderby || 'name';
  const order = options.order || 1;
  let result = '';

  //按首演日期排序
  tags = tags.toArray().sort((a,b)=> Date.parse(team(a.name)[1]) - Date.parse(team(b.name)[1]));

  // Ignore tags with zero posts
  tags = tags.filter(tag => tag.length);

  // Limit the number of tags
  if (options.amount) tags = tags.limit(options.amount);

  if (style === 'list') {
    result += `<ul class="${ulClass}" itemprop="keywords">`;

    tags.forEach(tag => {
      result += `<li class="${liClass}">`;

      result += `<a class="${aClass} ${team(tag.name)[0]}" href="${url_for.call(this, tag.path)}${suffix}" rel="tag">`;
      result += abbrName(tag.name);
      result += '</a>';

      if (showCount) {
        result += `<span class="${countClass}">${tag.length}</span>`;
      }

      result += '</li>';
    });

    result += '</ul>';
  } else {
    tags.forEach((tag, i) => {
      if (i) result += separator;

    //是否为专辑歌曲
      result += `<a class="${aClass} ${team(tag.name)[0]}" ${tag.name.indexOf("EP")==-1 ? `href="${url_for.call(this, tag.path)}${suffix}" ` : ''}rel="tag">`;
      if (labelSpan) {
        result += `<span class="${labelClass}">${transform ? transform(tag.name) : tag.name}</span>`;
      } else {
        result += abbrName(tag.name);
      }

      if (showCount) {
        result += `<span class="${countClass}">${tag.length}</span>`;
      }

      result += '</a>';
    });
  }

  return result;
}

function listTagsHelperFactory(tags, options) {
  const transformArgs = () => {
    if (!options && (!tags || !Object.prototype.hasOwnProperty.call(tags, 'length'))) {
      options = tags;
      tags = this.site.tags;
    }

    return [tags.toArray(), options];
  };

  return moize(listTagsHelper.bind(this), {
    maxSize: 5,
    isDeepEqual: true,
    transformArgs
  }).call(this, tags, options);
}

//名称缩写
function abbrName(name){
          switch(name){
          case "We are the BEJ":
              return "WAB";
          case "B A FIGHTER":
              return "BAF";
          case "Fiona.N":
              return "FN";
          case "Victoria.G":
              return "VG";
          case "他们所不知道的Team G":
              return "他们G";
          case "他们所不知道的Team NIII":
              return "他们NIII";
          case "他们所不知道的Team Z":
              return "他们Z";
          case "启程：Team G":
              return "启程G";
          case "启程：Team NIII":
              return "启程NIII";
          case "启程：Team Z":
              return "启程Z";
      }
      
      if(name.indexOf("十八个闪耀瞬间")!=-1){
          return name.replace("十八个闪耀瞬间","十八闪").replace("-Team ","")
      }
      
      if(name.indexOf("EP") == 0){
          let a = name.substring(3);
          switch(a){
              case "SNH48":
              case "GNZ48":
              case "BEJ48":
              case "CKG48":
              case "SHY48":
              case "CGT48":
              case "SNH48 Group":
                  return name;
              default:
                  return a;
          }
      }
      return trans(name);
}


module.exports = listTagsHelperFactory;
