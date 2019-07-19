$(function() {
    var movieName = $("#movieName").text();
    var title = "<li>视频</li><li>电影</li><li>"+movieName+"</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-film'></i>&nbsp;视频&nbsp;<span>>&nbsp;电影&nbsp;</span><span>>&nbsp;"+movieName+"&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/video/movie');


})
//# sourceURL=info.js
