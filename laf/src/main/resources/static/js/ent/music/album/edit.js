var albumName = $("#albumName").val();

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
            $("#album_edit_title").html("<i class='fa fa-warning'></i>编辑专辑失败");
            $("#album_edit_body p").text("编辑专辑["+albumName+"]失败");
            $("#album_edit_btn1").attr("class", "btn btn-primary");
            $("#album_edit_btn1").text("返回");
            $("#album_edit_btn1").click(function() {
                $("#album_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
            });
            $("#album_edit_btn2").attr("class", "btn btn-default");
            $("#album_edit_btn2").text("关闭");
            $("#album_edit_btn2").click(function() {
                $("#album_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#album_edit_modal").modal();
		},
		success : function(data) {
            $("#album_edit_title").html("编辑专辑");
            $("#album_edit_body p").text("编辑专辑["+albumName+"]成功");
            $("#album_edit_btn1").attr("class", "btn btn-primary");
            $("#album_edit_btn1").text("返回");
            $("#album_edit_btn1").click(function() {
                $("#album_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
            });
            $("#album_edit_btn2").attr("class", "btn btn-default");
            $("#album_edit_btn2").text("关闭");
            $("#album_edit_btn2").click(function() {
                $("#album_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#album_edit_modal").modal();
		}
	});
}

//# sourceURL=edit.js
