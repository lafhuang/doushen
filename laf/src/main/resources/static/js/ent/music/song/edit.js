var songName = $("#songName").val();

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
            var msg = "编辑歌曲["+songName+"]失败";
            $("#song_edit_title").html("<i class='fa fa-warning'></i>编辑歌曲失败");
            $("#song_edit_body p").text("编辑歌曲["+songName+"]失败");
            $("#song_edit_btn1").attr("class", "btn btn-primary");
            $("#song_edit_btn1").text("返回");
            $("#song_edit_btn1").click(function() {
                $("#song_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/song");
            });
            $("#song_edit_btn2").attr("class", "btn btn-default");
            $("#song_edit_btn2").text("关闭");
            $("#song_edit_btn2").click(function() {
                $("#song_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#song_edit_modal").modal();
		},
		success : function(data) {
            $("#song_edit_title").html("编辑歌曲");
            $("#song_edit_body p").text("编辑歌曲["+songName+"]成功");
            $("#song_edit_btn1").attr("class", "btn btn-primary");
            $("#song_edit_btn1").text("返回");
            $("#song_edit_btn1").click(function() {
                $("#song_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/song");
            });
            $("#song_edit_btn2").attr("class", "btn btn-default");
            $("#song_edit_btn2").text("关闭");
            $("#song_edit_btn2").click(function() {
                $("#song_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#song_edit_modal").modal();
		}
	});

}

//# sourceURL=edit.js
