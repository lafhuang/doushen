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
            showDialog("添加歌手失败", "添加歌手失败", "返回", "btn btn-default", "/ent/music/singer", "继续添加", "btn btn-primary", "/ent/music/singer/add");
        },
        success : function(data) {
            var singerName = $("#singerName").val();
            showDialog("添加歌手", "添加歌手["+singerName+"]成功", "返回", "btn btn-default", "/ent/music/singer", "继续添加", "btn btn-primary", "/ent/music/singer/add");
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

//# sourceURL=add.js
