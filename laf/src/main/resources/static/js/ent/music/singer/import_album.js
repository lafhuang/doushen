var singerId = $("#singerId").val();

$().ready(function() {

    initFileUpload();

    $("#reset-btn").click(function() {
        $("#albumlist").html("");
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

        var result = data.response;
        var code = result.code;

        if (code != 0) {
            activateModal("导入专辑失败", result.msg);
        } else {
            var albumList = result.albumList;
            if (albumList.length == 0) {
                activateModal("导入专辑", "专辑模板无有效数据!");
            } else {
                var html = "";
                for (var idx = 0; idx <= albumList.length; idx++) {
                    var album = albumList[idx];
                    if (!album) {
                        break;
                    }
                    html += "<tr>";
                    html += "    <td>" + album.name + "</td>";
                    var issueDate = (album.issueDate) ? (album.issueDate).substr(0,10) : '-';
                    html += "    <td>" + issueDate + "</td>";
                    html += "    <td>" + album.language + "</td>";
                    html += "    <td>" + album.type + "</td>";
                    html += "    <td>" + album.style + "</td>";
                    var album_cover = (album.cover) ? (album.cover) : '';
                    html += "    <td>" + album_cover + "</td>";
                    html += "</tr>";
                }
                $("#albumlist").html(html);
            }
        }
    });
}

function saveAlbum() {
    var albumList = [];

    $("#albumlist").find("tr").each(function() {
        var name = $(this).find("td:eq(0)").text();
        var issueDate = $(this).find("td:eq(1)").text();
        var language = $(this).find("td:eq(2)").text();
        var type = $(this).find("td:eq(3)").text();
        var style = $(this).find("td:eq(4)").text();
        var cover = $(this).find("td:eq(5)").text();

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
        activateModal("导入专辑", "专辑模板无有效数据!");
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveAlbum",
        data : "albumList="+JSON.stringify(albumList),
        async : false,
        error : function(request) {
            activateModal("保存专辑失败", request.msg);
        },
        success : function(data) {
            activateModal("保存专辑", data.msg);
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

//# sourceURL=import_album.js
