$().ready(function() {

    initEditor();
    initSinger();
    initAlbum();
    initDict();
    formValidate();

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
            $("#doudou_modal_title").text("添加歌曲失败");
            $("#doudou_modal_body p").text("添加歌曲失败");
            activateModal();
		},
		success : function(data) {
            $("#doudou_modal_title").text("添加歌曲");
            $("#doudou_modal_body p").text(data.msg);
            activateModal();
		}
	});
}

function activateModal() {
    var btn = "<button type='button' class='btn btn-default' id='backBtn'>返回</button>" +
        "<button type='button' class='btn btn-primary' id='addBtn'>继续添加</button>";

    $("#doudou_modal_footer").html(btn);

    $("#doudou_modal").modal();

    $("#backBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/song");
    });

    $("#addBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/song/add");
    });
}

//# sourceURL=add.js
