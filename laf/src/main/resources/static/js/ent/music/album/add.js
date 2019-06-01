$().ready(function() {
    var title = "<li>音乐</li><li>专辑</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;专辑&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/album');

	initDatepicker();
    initFileUpload();
    initSinger();
    initDict();
	formValidate();

    initSelect();
});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/album/save",
        data : $('#albumForm').serialize(),
        async : false,
        error : function(request) {
            $("#album_add_title").html("<i class='fa fa-warning'></i>添加专辑失败");
            $("#album_add_body p").text("添加专辑失败");
            $("#album_add_btn1").attr("class", "btn btn-primary");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
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
            $("#album_add_title").html("添加专辑成功");
            $("#album_add_body p").text("添加专辑成功");
            $("#album_add_btn1").attr("class", "btn btn-default");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
            });
            $("#album_add_btn2").attr("class", "btn btn-primary");
            $("#album_add_btn2").text("继续添加");
            $("#album_add_btn2").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album/add");
            });
            $("#album_add_modal").modal();
        }
    });
}

//# sourceURL=add.js
