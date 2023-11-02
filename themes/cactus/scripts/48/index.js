hexo.extend.helper.register('list_tags', require('./list_tags'));

const tagcloud = require('./tagcloud');
hexo.extend.helper.register('tagcloud', tagcloud);
hexo.extend.helper.register('tag_cloud', tagcloud);

const team = require('./helper48/team');
hexo.extend.helper.register('list_posts_stage', require('./list_posts_stage'));
hexo.extend.helper.register('forname', require(`./helper48/forname`));
hexo.extend.helper.register('team', team.team);
hexo.extend.helper.register('stage_team', team.stage_team);
hexo.extend.helper.register('stage_date', team.stage_date);
hexo.extend.helper.register('stage_forname', require('./helper48/stage_forname'));
hexo.extend.helper.register('stage_transname', require('./helper48/trans'));
