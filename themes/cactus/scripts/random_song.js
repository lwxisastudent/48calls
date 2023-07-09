/**
 * Page Title Helper
 * @description Generate page title.
 * @example
 *     <%- page_title() %>
 */
hexo.extend.helper.register("random_song", function (posts) {
      let date = new Date( Date.now());
      let num = date.getMonth()*1000+date.getDate()*10+date.getDay();
      let rad = ((num * 9301 + 49297) % 233280) / ( 233280.0 );
      return posts[Math.ceil( rad * posts.length ) ];
     
});
