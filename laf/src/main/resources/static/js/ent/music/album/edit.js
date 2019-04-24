$().ready(function() {

	initDatepicker();
    initFileUpload();
    initSinger();
    initDict();
    formValidate();

});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/album/update",
		data : $('#albumForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			$("#doudou_modal_title").text("编辑专辑失败");
            $("#doudou_modal_body p").text("编辑专辑失败");
            activateModal();
		},
		success : function(data) {
			$("#doudou_modal_title").text("编辑专辑");
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
        getTarget("/ent/music/album");
    });

    $("#close_Btn").click(function () {
        $("#closeBtn").click();
    });
}

//# sourceURL=edit.js
