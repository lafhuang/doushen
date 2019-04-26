$().ready(function() {

    changeTitle("<li>音乐</li><li>歌手</li><li>添加歌手</li>", "<h1 class=\"page-title txt-color-blueDark\"><i class='fa fa-lg fa-fw fa-music'></i> 音乐 <span>> 歌手 </span><span>> 添加歌手</span></h1>");

    initFileInput();
    initDatepicker();
    initStar();
    initDict();
    formValidate();

});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/save",
        data : $('#singerForm').serialize(),
        async : false,
        error : function(request) {
            $("#doudou_modal_title").text("添加歌手失败");
            $("#doudou_modal_body p").text("添加歌手失败");
            activateModal();
        },
        success : function(data) {
            $("#doudou_modal_title").text("添加歌手");
            $("#doudou_modal_body p").text(data.msg);
            activateModal();
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

function activateModal() {
    var btn = "<button type='button' class='btn btn-default' id='backBtn'>返回</button>" +
        "<button type='button' class='btn btn-primary' id='addBtn'>继续添加</button>";

    $("#doudou_modal_footer").html(btn);

    $("#doudou_modal").modal();

    $("#backBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/singer");
    });

    $("#addBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/singer/add");
    });
}

//# sourceURL=add.js
