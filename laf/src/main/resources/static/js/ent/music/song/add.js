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
            $("#song_add_title").html("<i class='fa fa-warning'></i>添加歌曲失败");
            $("#song_add_body p").text("添加歌曲失败");
            $("#song_add_btn1").attr("class", "btn btn-primary");
            $("#song_add_btn1").text("返回");
            $("#song_add_btn1").click(function() {
                $("#song_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/song");
            });
            $("#song_add_btn2").attr("class", "btn btn-default");
            $("#song_add_btn2").text("关闭");
            $("#song_add_btn2").click(function() {
                $("#song_add_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#song_add_modal").modal();
		},
		success : function(data) {
            $("#song_add_title").html("添加歌曲");
            $("#song_add_body p").text("添加歌曲成功");
            $("#song_add_btn1").attr("class", "btn btn-primary");
            $("#song_add_btn1").text("返回");
            $("#song_add_btn1").click(function() {
                $("#song_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/song");
            });
            $("#song_add_btn2").attr("class", "btn btn-default");
            $("#song_add_btn2").text("继续添加");
            $("#song_add_btn2").click(function() {
                $("#song_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/song/add");
            });
            $("#song_add_modal").modal();
		}
	});
}

//# sourceURL=add.js
