$(function() {
    var movieName = $("#movieName").text();
    var title = "<li>视频</li><li>电影</li><li>"+movieName+"</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-film'></i>&nbsp;视频&nbsp;<span>>&nbsp;电影&nbsp;</span><span>>&nbsp;"+movieName+"&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/video/movie');

    loadDict();
})

function loadDict() {
    var medium = $("#medium").text();
    if (medium != null && medium != '') {
        display("medium", "video_medium", medium);
    }

    var encode = $("#encode").text();
    if (encode != null && encode != '') {
        display("encode", "video_encode", encode);
    }

    var audioEncode = $("#audioEncode").text();
    if (audioEncode != null && audioEncode != '') {
        display("audioEncode", "video_audioEncode", audioEncode);
    }

    video_definition

}

function display(id, dictType, dictValue) {
    $.ajax({
        type: 'get',
        url : "/system/dict/display",
        dataType: 'json',
        data: {
            "dictType" : dictType,
            "dictValue" : dictValue
        },
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(r) {
            $("#"+id).text(r.dictName);
        }
    });
}

//# sourceURL=info.js
