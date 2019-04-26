$().ready(function() {

    var singerName = $("#singerName").val();
    var title = "<li>音乐</li><li>歌手</li><li>"+singerName+"</li><li>编辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;"+singerName+"&nbsp;</span><span>>&nbsp;编辑&nbsp;</span>";

    changeTitle(title, menu_head);

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
