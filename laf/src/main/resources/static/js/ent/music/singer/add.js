$().ready(function() {

    var title = "<li>音乐</li><li>歌手</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

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
        error : function() {
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
