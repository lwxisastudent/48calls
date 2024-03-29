'use strict';

const { Color, url_for } = require('hexo-util');
const { default: moize } = require('moize');
const team = require('./helper48/team').team;
const trans = require(`./helper48/trans`);

function tagcloudHelper(tags, options) {
    
  if (!options && (!tags || !Object.prototype.hasOwnProperty.call(tags, 'length'))) {
    options = tags;
    tags = this.site.tags;
  }

  if (!tags || !tags.length) return '';
  options = options || {};

  const min = options.min_font || 10;
  const max = options.max_font || 20;
  const orderby = options.orderby || 'name';
  const order = options.order || 1;
  const unit = options.unit || 'px';
  const color = options.color;
  const className = options.class;
  const showCount = options.show_count;
  const countClassName = options.count_class || 'count';
  const level = options.level || 10;
  const { transform } = options;
  const separator = options.separator || ' ';
  const result = [];
  
  try{
      tags.sort('name', 1);
      
  // Limit the number of tags
  if (options.amount) {
    tags = tags.limit(options.amount);
  }

  const sizes = [];

  tags.sort('length').forEach(tag => {
    const { length } = tag;
    if (sizes.includes(length)) return;

    sizes.push(length);
  });

  const length = sizes.length - 1;
  
  //十八闪伪显示
  let s183 = false;
    const ratio_normal = length ? sizes.indexOf(17) / length : 0;
    const size_normal = min + ((max - min) * ratio_normal);
    const style_normal = `font-size: ${parseFloat(size_normal.toFixed(2))}${unit};`;
    
    //随机颜色
    let cs = ["sii","nii","hii","x","b","g","niii","z"];
    let l = cs.length,
    randomIndex, temp;
    
  while (l) {
    randomIndex = Math.floor(Math.random() * (l--));
    temp = cs[randomIndex];
    cs[randomIndex] = cs[l];
    cs[l] = temp;
  }

  tags.forEach(tag => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0;
    const size = min + ((max - min) * ratio);
    let style = `font-size: ${parseFloat(size.toFixed(2))}${unit};`;
    var attr = "";
    
    //在第一次出现十八闪的地方额外加一个十八闪的按钮
    if(tag.name.indexOf("十八个闪耀瞬间") != -1 && !s183){
        s183 = true
        result.push(
      `<a href="/%E5%8D%81%E5%85%AB%E4%B8%AA%E9%97%AA%E8%80%80%E7%9E%AC%E9%97%B4/" style="${style_normal}"${className ? ` class="${className}-${Math.round(ratio_normal * level)}"` : ''}><span class="${cs[0]}">十</span><span class="${cs[1]}">八</span><span class="${cs[2]}">个</span><span class="${cs[3]}">闪</span><span class="${cs[4]}">耀</span><span class="${cs[5]}">瞬</span><span class="${cs[6]}">间</span>${showCount ? `<span class="${countClassName}">17</span>` : ''}</a>`
      );
    }
    
    attr = className ? ` class="${className}-${Math.round(ratio * level)} ${(tag.name.indexOf("十八个闪耀瞬间") == -1)  ? "" : "s183 "}${(tag.name.indexOf("EP") == 0) ? "ep " : ""}${team(tag.name)[0]}"` : '';
    
    result.push(
      `<a href="${url_for.call(this, tag.path)}" style="${style}"${attr}>${trans(transform ? transform(tag.name) : tag.name)}${showCount ? `<span class="${countClassName}">${tag.length}</span>` : ''}</a>`
    );
  });
  
  return result.join(separator);
  }
  catch(e){
      return e.message;
  }
}

function tagcloudHelperFactory(tags, options) {
  const transformArgs = () => {
    if (!options && (!tags || !Object.prototype.hasOwnProperty.call(tags, 'length'))) {
      options = tags;
      tags = this.site.tags;
    }

    return [tags.toArray(), options];
  };

  return moize(tagcloudHelper.bind(this), {
    maxSize: 5,
    isDeepEqual: true,
    transformArgs
  }).call(this, tags, options);
}

module.exports = tagcloudHelperFactory;
