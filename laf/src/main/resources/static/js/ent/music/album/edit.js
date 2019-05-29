var albumName = $("#albumName").val();

var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/album";
var btn2Text = "关闭";
var btn2Class = "btn btn-primary";
var btn2Url = "close";

$().ready(function() {

    var albumName = $("#albumName").val();
    var title = "<li>音乐</li><li>专辑</li><li>"+albumName+"</li><li>编辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;专辑&nbsp;</span><span>>&nbsp;"+albumName+"&nbsp;</span><span>>&nbsp;编辑&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/album');

	initDatepicker();
    initFileUpload();
    initSinger();
    initDict();
    formValidate();

    initSelect();

});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/album/update",
		data : $('#albumForm').serialize(),
		async : false,
		error : function(request) {
			var title = "<i class='fa fa-warning'></i>编辑专辑失败";
            var msg = "编辑专辑["+albumName+"]失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		},
		success : function(data) {
			var title = "编辑专辑";
            var msg = "编辑专辑["+albumName+"]成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		}
	});
}

//# sourceURL=edit.js
