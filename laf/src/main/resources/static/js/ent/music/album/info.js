var albumId = $("#id").val();

$().ready(function() {
    initDict();
});

function initDict() {

    var albumName = $(".data__name_txt").text();
    var title = "<li>音乐</li><li>专辑</li><li>"+albumName+"</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;专辑&nbsp;</span><span>>&nbsp;"+albumName+"&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/album');

    load_dict("album_language");
    load_dict("album_type");
    load_dict("album_style");

    $("#album_language_li").text("语言：" + $("#album_language_").val());
    $("#album_type_li").text("类型：" + $("#album_type_").val());
    $("#album_style_li").text("风格：" + $("#album_style_").val());

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
        success : function(result) {
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
    getTarget('ent/music/album/edit/'+albumId);
}

function goBack() {
    getTarget('ent/music/album');
}

//# sourceURL=info.js
