var import_flag = true;

$().ready(function() {

    initFileUpload();

    $("#import-btn").click(function() {
        if (!import_flag) {
            return;
        }
        import_flag = false;

        saveAlbum();
    })

    $("#reset-btn").click(function() {
        import_flag = true;
        $("#exampleTable").html("");
    })

});

function initFileUpload() {
    $("#template").fileinput({
        language : 'zh',
        uploadUrl : "/ent/music/parsing/album",
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
            var albumList = result.albumList;
            if (albumList.length == 0) {
                parent.layer.alert("专辑模板没有数据!");
            } else {
                var html = "";
                html += "<thead>";
                html += "    <tr>";
                html += "        <th><div class=\"th-inner\">专辑名</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">发行日期</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">语言</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">类型</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">风格</div><div class=\"fht-cell\"></div></th>";
                html += "        <th><div class=\"th-inner\">封面</div><div class=\"fht-cell\"></div></th>";
                html += "    </tr>";
                html += "</thead>";
                html += "<tbody>";
                for (var idx = 0; idx <= albumList.length; idx++) {
                    var album = albumList[idx];
                    if (!album) {
                        break;
                    }

                    html += "    <tr>";
                    html += "        <td>" + album.name + "</td>";
                    var issueDate = album.issueDate ? album.issueDate.substr(0, 10) : '-';
                    html += "        <td>" + issueDate + "</td>";
                    html += "        <td>" + album.language + "</td>";
                    html += "        <td>" + album.type + "</td>";
                    html += "        <td>" + album.style + "</td>";
                    html += "        <td><img src=\"" + album.cover + "\" style=\"height:100px;width:100px;margin:5px;\"></td>";
                    html += "    </tr>";
                }
                html += "</tbody>";
                $("#exampleTable").html(html);
            }
        }
    });
}

function saveAlbum() {
    var singerId = $("#singerId").val();
    var albumList = [];

    $("#exampleTable tbody tr").each(function() {
        var name = $(this).find("td:eq(0)").text();
        var issueDate = $(this).find("td:eq(1)").text();
        var language = $(this).find("td:eq(2)").text();
        var type = $(this).find("td:eq(3)").text();
        var style = $(this).find("td:eq(4)").text();
        var cover = $(this).find("td:eq(5)").find("img").attr("src");

        var album = {
            "name" : name,
            "singerId" : singerId,
            "issueDate" : issueDate,
            "language" : language,
            "type" : type,
            "style" : style,
            "cover" : cover
        }

        albumList.push(album);
    });

    if (albumList.length == 0) {
        parent.layer.alert("未导入专辑数据!");
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveAlbum",
        data : "albumList="+JSON.stringify(albumList),
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
