var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/song";
var btn2Text = "继续添加";
var btn2Class = "btn btn-primary";
var btn2Url = "/ent/music/song/add";

$().ready(function() {

    var title = "<li>音乐</li><li>歌曲</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌曲&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/song');

    initEditor();
    initSinger();
    initAlbum();
    initDict();
    formValidate();

    initSelect();

});

function save() {
    $("#lyrics").val($(".note-editable").html());

	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/song/save",
		data : $('#songForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
            var title = "<i class='fa fa-warning'></i>添加歌曲失败";
            var msg = "添加歌曲失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
		},
		success : function(data) {
            var title = "添加歌曲";
            var msg = "添加歌曲成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
		}
	});
}

//# sourceURL=add.js
