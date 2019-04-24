var import_flag = true;
var singerId = $("#singerId").val();

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
            $("#doudou_modal_title").text("导入专辑");
            $("#doudou_modal_body p").text("导入专辑模板失败");

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
        } else {
            var albumList = result.albumList;
            if (albumList.length == 0) {
                $("#doudou_modal_title").text("导入专辑");
                $("#doudou_modal_body p").text("专辑模板无有效数据");

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
            } else {
                var html = "";
                for (var idx = 0; idx <= albumList.length; idx++) {
                    var album = albumList[idx];
                    if (!album) {
                        break;
                    }
                    html += "<li class='playlist__item' onmouseover='this.className=(this.className+\" playlist__item--hover\")'>";
                    html += "    <div class='playlist__item_box'>";
                    html += "        <div class='playlist__cover mod_cover'>";
                    html += "            <img src='" + album.cover + "' alt='" + album.name + "' class='playlist__pic'>";
                    html += "        </div>";
                    html += "        <h4 class='playlist__title'>"
                    html += "            <span class='playlist__title_txt'>" + album.name + "</span>";
                    html += "        </h4>";
                    html += "        <div class='playlist__other'>" + (album.issueDate)?(album.issueDate).substr(0,10):'-' + "</div>"
                    html += "    </div>";
                    html += "</li>";
                }
                $("#albumlist").html(html);
            }
        }
    });
}

function saveAlbum() {
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
        // TODO
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveAlbum",
        data : "albumList="+JSON.stringify(albumList),
        async : false,
        error : function(request) {
            // TODO
        },
        success : function(data) {
            // TODO
        }
    });

}

//# sourceURL=import_album.js
