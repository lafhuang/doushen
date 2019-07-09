var singerId = $("#id").val();
var singerName = $("#singerName").val();

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
            $("#singer_edit_title").html("<i class='fa fa-warning'></i>编辑歌手失败");
            $("#singer_edit_body p").text("编辑歌手["+singerName+"]失败");
            $("#singer_edit_btn1").attr("class", "btn btn-primary");
            $("#singer_edit_btn1").text("返回");
            $("#singer_edit_btn1").click(function() {
                $("#singer_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/info/"+singerId);
            });
            $("#singer_edit_btn2").attr("class", "btn btn-default");
            $("#singer_edit_btn2").text("关闭");
            $("#singer_edit_btn2").click(function() {
                $("#singer_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_edit_modal").modal();
		},
		success : function(data) {
            $("#singer_edit_title").html("编辑歌手");
            $("#singer_edit_body p").text("编辑歌手["+singerName+"]成功");
            $("#singer_edit_btn1").attr("class", "btn btn-default");
            $("#singer_edit_btn1").text("返回");
            $("#singer_edit_btn1").click(function() {
                $("#singer_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/info/"+singerId);
            });
            $("#singer_edit_btn2").attr("class", "btn btn-primary");
            $("#singer_edit_btn2").text("关闭");
            $("#singer_edit_btn2").click(function() {
                $("#singer_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_edit_modal").modal();
		}
	});
}

//# sourceURL=edit.js
