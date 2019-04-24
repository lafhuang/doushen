$().ready(function() {

	initEditor();
	initSinger();
	initAlbum();
	initDict();
	formValidate();

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
			$("#doudou_modal_title").text("编辑歌曲失败");
			$("#doudou_modal_body p").text("编辑歌曲失败");
			activateModal();
		},
		success : function(data) {
			$("#doudou_modal_title").text("编辑歌曲");
			$("#doudou_modal_body p").text(data.msg);
			activateModal();
		}
	});

}

function activateModal() {
	var btn = "<button type='button' class='btn btn-default' id='backBtn'>返回</button>" +
		"<button type='button' class='btn btn-primary' id='close_Btn'>关闭</button>";

	$("#doudou_modal_footer").html(btn);

	$("#doudou_modal").modal();

	$("#backBtn").click(function () {
		$("#closeBtn").click();
		getTarget("/ent/music/song");
	});

	$("#close_Btn").click(function () {
		$("#closeBtn").click();
	});
}

//# sourceURL=edit.js
