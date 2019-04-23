$().ready(function() {

	initDatepicker();
    initFileUpload();
    loadSinger();
    loadDict();
	formValidate();

});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/album/save",
        data : $('#albumForm').serialize(),
        async : false,
        error : function(request) {
            $("#doudou_modal_title").text("添加专辑失败");
            $("#doudou_modal_body p").text("添加专辑失败");
            activateModal();
        },
        success : function(data) {
            $("#doudou_modal_title").text("添加专辑");
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
        getTarget("/ent/music/album");
    });

    $("#addBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/album/add");
    });
}

//# sourceURL=add.js
