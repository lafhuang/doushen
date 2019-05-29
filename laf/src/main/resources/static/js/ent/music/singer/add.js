var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/singer";
var btn2Text = "继续添加";
var btn2Class = "btn btn-primary";
var btn2Url = "/ent/music/singer/add";

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
            var title = "<i class='fa fa-warning'></i>添加歌手失败";
            var msg = "添加歌手失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
        },
        success : function(data) {
            var singerName = $("#singerName").val();
            var title = "添加歌手成功";
            var msg = "添加歌手成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

//# sourceURL=add.js
