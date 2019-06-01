$().ready(function() {
    var title = "<li>音乐</li><li>歌手</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

    initFileInput();
    initDatepicker();
    initStar();
    initDict();
    formValidate();
    initSelect();
});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/save",
        data : $('#singerForm').serialize(),
        async : false,
        error : function() {
            $("#album_add_title").html("<i class='fa fa-warning'></i>添加歌手失败");
            $("#album_add_body p").text("添加歌手失败");
            $("#album_add_btn1").attr("class", "btn btn-primary");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer");
            });
            $("#album_add_btn2").attr("class", "btn btn-default");
            $("#album_add_btn2").text("关闭");
            $("#album_add_btn2").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#album_add_modal").modal();
        },
        success : function(data) {
            $("#album_add_title").html("添加歌手成功");
            $("#album_add_body p").text("添加歌手成功");
            $("#album_add_btn1").attr("class", "btn btn-default");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer");
            });
            $("#album_add_btn2").attr("class", "btn btn-primary");
            $("#album_add_btn2").text("继续添加");
            $("#album_add_btn2").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/add");
            });
            $("#album_add_modal").modal();
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

//# sourceURL=add.js
