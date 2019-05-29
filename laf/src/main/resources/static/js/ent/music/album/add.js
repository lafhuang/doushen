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
            var title = "<i class='fa fa-warning'></i>添加专辑失败";
            var msg = "添加专辑失败";
            var btn1Text = "返回";
            var btn1Class = "btn btn-default";
            var btn1Url = "/ent/music/album";
            var btn2Text = "关闭";
            var btn2Class = "btn btn-primary";
            var btn2Url = "close";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
        },
        success : function(data) {
            var title = "添加专辑成功";
            var msg = "添加专辑成功";
            var btn1Text = "返回";
            var btn1Class = "btn btn-default";
            var btn1Url = "/ent/music/album";
            var btn2Text = "继续添加";
            var btn2Class = "btn btn-primary";
            var btn2Url = "/ent/music/album/add";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
        }
    });
}

//# sourceURL=add.js
