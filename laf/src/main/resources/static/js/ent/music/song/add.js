$().ready(function() {

    var title = "<li>音乐</li><li>歌曲</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌曲&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/song');

    initEditor();
    initSinger();
    initAlbum();
    initDict();
    formValidate();

    $.fn.select2&&$("select.select2").each(function(){
        var e=$(this),
        t = e.attr("data-select-width")||"100%";
        e.select2({
            allowClear:!0,
            width:t
        }),
        e=null
    })

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
