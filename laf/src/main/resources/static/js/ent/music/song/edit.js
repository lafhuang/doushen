var songName = $("#songName").val();

var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/song";
var btn2Text = "关闭";
var btn2Class = "btn btn-primary";
var btn2Url = "close";

$().ready(function() {

    var title = "<li>音乐</li><li>歌曲</li><li>"+songName+"</li><li>编辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌曲&nbsp;</span><span>>&nbsp;"+songName+"&nbsp;</span><span>>&nbsp;编辑&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/song');

	initEditor();
	initSinger();
	initAlbum();
	initDict();
	formValidate();

	initSelect();

});

function update() {

    $("#lyrics").val($(".note-editable").html());

	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/song/update",
		data : $('#songForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			var title = "<i class='fa fa-warning'></i>编辑歌曲失败";
            var msg = "编辑歌曲["+songName+"]失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		},
		success : function(data) {
			var title = "编辑歌曲";
            var msg = "编辑歌曲["+songName+"]成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		}
	});

}

//# sourceURL=edit.js
