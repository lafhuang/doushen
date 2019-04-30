var songId = $("#id").val();

$().ready(function() {
    initDict();
});

function initDict() {

    var songName = $(".data__name_txt").text();
    var title = "<li>音乐</li><li>歌曲</li><li>"+songName+"</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌曲&nbsp;</span><span>>&nbsp;"+songName+"&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/song');

    load_dict("album_language");

    $("#album_language_li").text("语言：" + $("#album_language_").val());

    $("article a").on("click", function() {
        var target = $(this).attr("target");
        if (target) {
            getTarget(target);
        }
    });
}

function load_dict(dict_type) {
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            // TODO
        },success : function(result) {
            //加载数据
            var dictValue = $("#"+dict_type).val();
            for (var i = 0; i < result.length; i++) {
                if (dictValue == result[i].dictValue) {
                    $("#"+dict_type+"_").val(result[i].dictName);
                    break;
                }
            }
        }
    });
}

function edit() {
    getTarget('ent/music/song/edit/'+songId);
}

function goBack() {
    getTarget('ent/music/song');
}

//# sourceURL=info.js
