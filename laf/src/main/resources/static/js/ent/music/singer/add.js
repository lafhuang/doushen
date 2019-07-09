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
            $("#singer_add_title").html("<i class='fa fa-warning'></i>添加歌手失败");
            $("#singer_add_body p").text("添加歌手失败");
            $("#singer_add_btn1").attr("class", "btn btn-primary");
            $("#singer_add_btn1").text("返回");
            $("#singer_add_btn1").click(function() {
                $("#singer_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer");
            });
            $("#singer_add_btn2").attr("class", "btn btn-default");
            $("#singer_add_btn2").text("关闭");
            $("#singer_add_btn2").click(function() {
                $("#singer_add_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_add_modal").modal();
        },
        success : function(data) {
            $("#singer_add_title").html("添加歌手成功");
            $("#singer_add_body p").text("添加歌手成功");
            $("#singer_add_btn1").attr("class", "btn btn-default");
            $("#singer_add_btn1").text("返回");
            $("#singer_add_btn1").click(function() {
                $("#singer_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer");
            });
            $("#singer_add_btn2").attr("class", "btn btn-primary");
            $("#singer_add_btn2").text("继续添加");
            $("#singer_add_btn2").click(function() {
                $("#singer_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/add");
            });
            $("#singer_add_modal").modal();
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

//# sourceURL=add.js
