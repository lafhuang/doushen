$().ready(function() {

    var singerName = $("#singerName").val();
    var title = "<li>音乐</li><li>歌手</li><li>"+singerName+"</li><li>导入歌曲</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;"+singerName+"&nbsp;</span><span>>&nbsp;导入歌曲&nbsp;</span>";
    changeTitle(title, menu_head);

    initFileUpload();

    $("#reset-btn").click(function() {
        $("#songList").html("");
    })

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
            activateModal("导入歌曲失败", result.msg);
        } else {
            var songList = result.songList;
            if (songList.length == 0) {
                activateModal("导入歌曲", "歌曲模板无有效数据!");
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
    var singerId = $("#singerId").val();
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
        activateModal("导入歌曲", "歌曲模板无有效数据!");
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveSong",
        data : "songList="+JSON.stringify(songList),
        async : false,
        error : function(request) {
            activateModal("保存歌曲失败", request.msg);
        },
        success : function(data) {
            activateModal("保存歌曲", data.msg);
        }
    });
}

function activateModal(title, msg) {
    $("#doudou_modal_title").text(title);
    $("#doudou_modal_body p").text(msg);

    var btn = "<button type='button' class='btn btn-default' id='backBtn'>返回</button>" +
        "<button type='button' class='btn btn-primary' id='close_Btn'>关闭</button>";

    $("#doudou_modal_footer").html(btn);
    $("#doudou_modal").modal();

    $("#backBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/singer/info/"+singerId);
    });

    $("#close_Btn").click(function () {
        $("#closeBtn").click();
    });
}

//# sourceURL=import_song.js
