$().ready(function() {
    initDict();
});

function initDict() {
    load_dict("album_language");

    $("#album_language_li").text("语言：" + $("#album_language_").val());
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
            parent.layer.alert("Connection error");
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