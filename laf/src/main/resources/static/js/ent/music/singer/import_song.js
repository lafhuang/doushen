var import_flag = true;

$().ready(function() {

    initFileUpload();

    $("#import-btn").click(function() {
        if (!import_flag) {
            return;
        }
        import_flag = false;

        saveSong();
    })

    $("#reset-btn").click(function() {
        import_flag = true;
        $("#exampleTable").html("");
    })

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

        import_flag = true;

        var result = data.response;
        var code = result.code;
        if (code != 0) {
            parent.layer.alert(result.msg);
        } else {
            var songList = result.songList;
            if (songList.length == 0) {
                parent.layer.alert("歌曲模板没有数据!");
            } else {
                var html = "";
                html += "<thead>";
                html += "    <tr>";
                html += "        <th><div class=\"th-inner\">歌曲名</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">专辑</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">音轨号</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">语言</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">时长</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">文件大小</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">音频类型</div><div class=\"fht-cell\"></div></th>";
                html += "    </tr>";
                html += "</thead>";
                html += "<tbody>";
                for (var idx = 0; idx <= songList.length; idx++) {
                    var song = songList[idx];
                    if (!song) {
                        break;
                    }

                    html += "    <tr>";
                    html += "        <td>" + song.name + "</td>";
                    html += "        <td>" + song.albumName + "</td>";
                    html += "        <td>" + song.trackNumber + "</td>";
                    html += "        <td>" + song.language + "</td>";
                    html += "        <td>" + song.length + "</td>";
                    html += "        <td>" + song.size + "</td>";
                    html += "        <td>" + song.audioType + "</td>";
                    html += "    </tr>";
                }
                html += "</tbody>";
                $("#exampleTable").html(html);
            }
        }
    });
}

function saveSong() {
    var singerId = $("#singerId").val();
    var songList = [];

    $("#exampleTable tbody tr").each(function() {
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
        parent.layer.alert("未导入歌曲数据!");
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveSong",
        data : "songList="+JSON.stringify(songList),
        async : false,
        error : function(request) {
            parent.layer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.msg("操作成功");
                parent.reLoad();
                var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                parent.layer.close(index);
            } else {
                parent.layer.alert(data.msg)
            }

        }
    });

}
