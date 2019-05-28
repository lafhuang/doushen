var singerName = $("#singerName").val();
var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/singer";
var btn2Text = "关闭";
var btn2Class = "btn btn-primary";
var btn2Url = "close";

$().ready(function() {

    var title = "<li>音乐</li><li>歌手</li><li>"+singerName+"</li><li>编辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;"+singerName+"&nbsp;</span><span>>&nbsp;编辑&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

	initFileInput();
	initDatepicker();
	initStar();
	initDict();
	formValidate();
	initSelect();

});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/singer/update",
		data : $('#singerForm').serialize(),
		async : false,
		error : function(request) {
			var title = "<i class='fa fa-warning'></i>编辑歌手失败";
            var msg = "编辑歌手["+singerName+"]失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		},
		success : function(data) {
			var title = "编辑歌手";
            var msg = "编辑歌手["+singerName+"]成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		}
	});
}

//# sourceURL=edit.js
