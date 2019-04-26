$().ready(function() {

	initFileInput();
	initDatepicker();
	initStar();
	initDict();
	formValidate();

});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/singer/update",
		data : $('#singerForm').serialize(),
		async : false,
		error : function(request) {
			$("#doudou_modal_title").text("编辑歌手失败");
            $("#doudou_modal_body p").text("编辑歌手失败");
            activateModal();
		},
		success : function(data) {
			$("#doudou_modal_title").text("编辑歌手");
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
        getTarget("/ent/music/singer");
    });

    $("#close_Btn").click(function () {
        $("#closeBtn").click();
    });
}

//# sourceURL=edit.js
