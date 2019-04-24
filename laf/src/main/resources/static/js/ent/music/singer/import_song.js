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

        import_flag = true;

        var result = data.response;
        var code = result.code;
        if (code != 0) {
            // TODO
        } else {
            var songList = result.songList;
            if (songList.length == 0) {
                // TODO
            } else {
                var html = "";

                for (var idx = 0; idx <= songList.length; idx++) {
                    var song = songList[idx];
                    if (!song) {
                        break;
                    }

                    html += "<tr class='table-success'>";
                    html += "<td>" + (idx + 1) + "</td>";
                    html += "<td>" + song.name + "</td>";
                    html += "<td>" + song.albumName + "</td>";
                    html += "<td>" + song.length + "</td>";
                    html += "<td>" + song.audioType + "</td>";
                    html += "</tr>";

//                    html += "    <tr>";
//                    html += "        <td>" + song.name + "</td>";
//                    html += "        <td>" + song.albumName + "</td>";
//                    html += "        <td>" + song.trackNumber + "</td>";
//                    html += "        <td>" + song.language + "</td>";
//                    html += "        <td>" + song.length + "</td>";
//                    html += "        <td>" + song.size + "</td>";
//                    html += "        <td>" + song.audioType + "</td>";
//                    html += "    </tr>";
                }

                $("#songList").html(html);
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
        // TODO
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveSong",
        data : "songList="+JSON.stringify(songList),
        async : false,
        error : function(request) {
            // TODO
        },
        success : function(data) {
            // TODO
        }
    });

}

//# sourceURL=import_song.js
