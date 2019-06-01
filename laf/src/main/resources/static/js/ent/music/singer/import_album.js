var singerId = $("#singerId").val();
var singerName = $("#singerName").val();

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
            $("#singer_album_title").html("<i class='fa fa-warning'></i>导入专辑失败");
            $("#singer_album_body p").text("导入歌手["+singerName+"]专辑失败");
            $("#singer_album_btn1").attr("class", "btn btn-primary");
            $("#singer_album_btn1").text("返回");
            $("#singer_album_btn1").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/"+singerId);
            });
            $("#singer_album_btn2").attr("class", "btn btn-default");
            $("#singer_album_btn2").text("关闭");
            $("#singer_album_btn2").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_album_modal").modal();
        } else {
            var albumList = result.albumList;
            if (albumList.length == 0) {
                $("#singer_album_title").html("导入专辑");
                $("#singer_album_body p").text("专辑模板无有效数据!");
                $("#singer_album_btn1").attr("class", "btn btn-primary");
                $("#singer_album_btn1").text("返回");
                $("#singer_album_btn1").click(function() {
                    $("#singer_album_modal").modal('hide');
                    $('.modal-backdrop').remove();
                    getTarget("/ent/music/singer/"+singerId);
                });
                $("#singer_album_btn2").attr("class", "btn btn-default");
                $("#singer_album_btn2").text("关闭");
                $("#singer_album_btn2").click(function() {
                    $("#singer_album_modal").modal('hide');
                    $('.modal-backdrop').remove();
                });
                $("#singer_album_modal").modal();
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
        $("#singer_album_title").html("导入专辑");
        $("#singer_album_body p").text("专辑模板无有效数据!");
        $("#singer_album_btn1").attr("class", "btn btn-primary");
        $("#singer_album_btn1").text("返回");
        $("#singer_album_btn1").click(function() {
            $("#singer_album_modal").modal('hide');
            $('.modal-backdrop').remove();
            getTarget("/ent/music/singer/"+singerId);
        });
        $("#singer_album_btn2").attr("class", "btn btn-default");
        $("#singer_album_btn2").text("关闭");
        $("#singer_album_btn2").click(function() {
            $("#singer_album_modal").modal('hide');
            $('.modal-backdrop').remove();
        });
        $("#singer_album_modal").modal();
        return;
    }

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/saveAlbum",
        data : "albumList="+JSON.stringify(albumList),
        async : false,
        error : function(request) {
            $("#singer_album_title").html("<i class='fa fa-warning'></i>保存专辑失败");
            $("#singer_album_body p").text("保存歌手["+singerName+"]专辑失败");
            $("#singer_album_btn1").attr("class", "btn btn-primary");
            $("#singer_album_btn1").text("返回");
            $("#singer_album_btn1").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/"+singerId);
            });
            $("#singer_album_btn2").attr("class", "btn btn-default");
            $("#singer_album_btn2").text("关闭");
            $("#singer_album_btn2").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_album_modal").modal();
        },
        success : function(data) {
            $("#singer_album_title").html("保存专辑");
            $("#singer_album_body p").text("保存歌手["+singerName+"]专辑成功");
            $("#singer_album_btn1").attr("class", "btn btn-primary");
            $("#singer_album_btn1").text("返回");
            $("#singer_album_btn1").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/singer/"+singerId);
            });
            $("#singer_album_btn2").attr("class", "btn btn-default");
            $("#singer_album_btn2").text("关闭");
            $("#singer_album_btn2").click(function() {
                $("#singer_album_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#singer_album_modal").modal();
        }
    });

}

//# sourceURL=import_album.js
