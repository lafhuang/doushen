var singerId = $("#singerId").val();
var singerName = $("#singerName").val();
var btn1Text = "返回";
var btn1Class = "btn btn-default";
var btn1Url = "/ent/music/singer/info/"+singerId;
var btn2Text = "关闭";
var btn2Class = "btn btn-primary";
var btn2Url = "close";

$().ready(function() {

    var title = "<li>音乐</li><li>歌手</li><li>"+singerName+"</li><li>导入专辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span><span>>&nbsp;"+singerName+"&nbsp;</span><span>>&nbsp;导入专辑&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

    initFileUpload();

    $("#reset-btn").click(function() {
        getTarget( '/ent/music/singer/importAlbum/' + singerId);
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
        uploadUrl : "/ent/music/parsing/album",
        showPreview: false,
        dropZoneEnabled: false,
        allowedFileExtensions: ["xlsx"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...

        var result = data.response;
        var code = result.code;

        if (code != 0) {
            var title = "<i class='fa fa-warning'></i>导入专辑失败";
            var msg = "导入歌手["+singerName+"]专辑失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        } else {
            var albumList = result.albumList;
            if (albumList.length == 0) {
                var title = "导入专辑";
                var msg = "专辑模板无有效数据!";
                showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
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
        var title = "导入专辑";
        var msg = "专辑模板无有效数据!";
        showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveAlbum",
        data : "albumList="+JSON.stringify(albumList),
        async : false,
        error : function(request) {
            var title = "<i class='fa fa-warning'></i>保存专辑失败";
            var msg = "保存歌手["+singerName+"]专辑失败";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        },
        success : function(data) {
            var title = "保存专辑";
            var msg = "保存歌手["+singerName+"]专辑成功";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
        }
    });

}

//# sourceURL=import_album.js
