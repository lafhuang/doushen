var singerId = $("#singerId").val();
var singerName = $("#singerName").val();
var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/singer/info/"+singerId;
var btn2Text = "关闭";
var btn2Class = "btn btn-primary";
var btn2Url = "close";

$().ready(function() {

    var title = "<li>音乐</li><li>歌手</li><li>"+singerName+"</li><li>导入歌曲</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;"+singerName+"&nbsp;</span><span>>&nbsp;导入歌曲&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

    initFileUpload();

    $("#reset-btn").click(function() {
        getTarget( '/ent/music/singer/importSong/' + singerId);
    });

    $("article a").on("click", function() {
        var target = $(this).attr("target");
        if (target) {
            getTarget(target);
        }
    });

});

function initFileUpload() {
    $("#template").fileinput({
        language : 'zh',
        uploadUrl : "/ent/music/parsing/song",
        showPreview: false,
        dropZoneEnabled: false,
        allowedFileExtensions: ["xlsx"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...

        var result = data.response;
        var code = result.code;
        if (code != 0) {
            var title = "<i class='fa fa-warning'></i>导入歌曲失败";
            var msg = "导入歌手["+singerName+"]歌曲失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        } else {
            var songList = result.songList;
            if (songList.length == 0) {
                var title = "导入歌曲";
                var msg = "歌曲模板无有效数据!";
                showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
            } else {
                var html = "";

                for (var idx = 0; idx <= songList.length; idx++) {
                    var song = songList[idx];
                    if (!song) {
                        break;
                    }
                    html += "<tr>";
                    html += "<td>" + song.name + "</td>";
                    html += "<td>" + song.albumName + "</td>";
                    html += "<td>" + song.trackNumber + "</td>";
                    html += "<td>" + song.language + "</td>";
                    html += "<td>" + song.length + "</td>";
                    html += "<td>" + song.size + "</td>";
                    html += "<td>" + song.audioType + "</td>";
                    html += "</tr>";
                }
                $("#songList").html(html);
            }
        }
    });
}

function saveSong() {
    var songList = [];

    $("#songList").find("tr").each(function() {
        var name = $(this).find("td:eq(0)").text();
        var albumName = $(this).find("td:eq(1)").text();
        var trackNumber = $(this).find("td:eq(2)").text();
        var language = $(this).find("td:eq(3)").text();
        var length = $(this).find("td:eq(4)").text();
        var size = $(this).find("td:eq(5)").text();
        var audioType = $(this).find("td:eq(6)").text();

        var song = {
            "name" : name,
            "singerId" : singerId,
            "albumName" : albumName,
            "trackNumber" : trackNumber,
            "language" : language,
            "length" : length,
            "size" : size,
            "audioType" : audioType
        }

        songList.push(song);
    });

    if (songList.length == 0) {
        var title = "导入歌曲";
        var msg = "歌曲模板无有效数据!";
        showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveSong",
        data : "songList="+JSON.stringify(songList),
        async : false,
        error : function(request) {
            var title = "<i class='fa fa-warning'></i>保存歌曲失败";
            var msg = "保存歌手["+singerName+"]歌曲失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        },
        success : function(data) {
            var title = "保存歌曲";
            var msg = "保存歌手["+singerName+"]歌曲成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        }
    });
}

//# sourceURL=import_song.js
