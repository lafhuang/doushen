var request_prefix = "/ent/music/singer"
var singerId = $("#id").val();

$().ready(function() {

    var icon = $(".open i:eq(0)").attr("class");
    var singerName = $("#singerName").attr("title");
    changeTitle("<li>音乐</li><li>歌手</li><li>" + singerName + "</li>", "<h1 class='page-title txt-color-blueDark'><i class=''" + icon + "'></i> 音乐 <span>> 歌手</span><span>> " + singerName + "</span></h1>");

    initRegionType();

    $("article a").on("click", function() {
        var target = $(this).attr("target");
        if (target) {
            getTarget(target);
        }
    });
});

function initRegionType() {
    load_dict("singer_region");
    load_dict("singer_type");

    var region = $("#singer_region_").val();
    var type = $("#singer_type_").val();

    var short_desc = $("#short_desc").text();
    $("#short_desc").text(short_desc + region + type);
}

function load_dict(dict_type) {
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
            //加载数据
            var dictValue = $("#"+dict_type).val();
            for (var i = 0; i < result.length; i++) {
                if (dictValue == result[i].dictValue) {
                    $("#"+dict_type+"_").val(result[i].dictName);
                    break;
                }
            }
        }
    });
}

function edit() {
	getTarget(request_prefix + '/edit/' + singerId)
}

function goBack() {
    getTarget(request_prefix);
}

function loadAllAlbum() {
    $("#singer_song").hide();

    $.ajax({
        url : "/ent/music/album/list",
        type : "get",
        data : {
            'singerId' : singerId,
            'offset' : 0,
            'limit' : 10000
        },
        success : function(result) {
            var albumList = result.rows;
            var html = "";
            for (var idx = 0; idx < albumList.length; idx++) {
                var album = albumList[idx];
                html += "<li class='playlist__item' onmouseover='this.className=(this.className+\" playlist__item--hover\")'>";
                html += "    <div class='playlist__item_box'>";
                html += "        <div class='playlist__cover mod_cover'>";
                html += "            <a target='/ent/music/album/info/" + album.id + "' class='js_album'>";
                html += "                <img src='" + album.cover + "' alt='" + album.name + "' class='playlist__pic'>";
                html += "                <i class=' js_play'></i>";
                html += "            </a>";
                html += "        </div>";
                html += "        <h4 class='playlist__title'>"
                html += "            <span class='playlist__title_txt'>";
                html += "                <a target='/ent/music/album/info/" + album.id + "' title='" + album.name + "' class='js_album'>" + album.name + "</a>"
                html += "            </span>";
                html += "        </h4>";
                html += "        <div class='playlist__other'>" + (album.issueDate)?(album.issueDate).substr(0,10):'-' + "</div>"
                html += "    </div>";
                html += "</li>";
            }
            $("#albumlist").html(html);
        }
    });
}

function loadAllSong() {
    $("#singer_album").hide();

    $.ajax({
        url : "/ent/music/song/list",
        type : "get",
        data : {
            'singerId' : singerId,
            'offset' : 0,
            'limit' : 10000
        },
        success : function(result) {
            var songList = result.rows;
            var html = "";
            for (var idx = 0; idx < songList.length; idx++) {
                var song = songList[idx];
                html += "<tr class='table-success'>";
                html += "<td>" + (idx + 1) + "</td>";
                html += "<td><a target='/ent/music/song/info/'" + song.id + "title='" + song.name + "'>" + song.name + "</a></td>";
                html += "<td><a target='/ent/music/album/info/'" + song.albumId + "title='" + song.albumName + "'>" + song.albumName + "</a></td>";
                html += "<td>" + song.length + "</td>";
                html += "<td>" + song.audioType + "</td>";
                html += "</tr>";
            }
            $("#songList").html(html);
        }
    });
}

function importAlbum() {
	getTarget(request_prefix + '/importAlbum/' + singerId);
}

function importSong() {
	getTarget(request_prefix + '/importSong/' + singerId);
}

function reload() {
    getTarget(request_prefix + '/info/' + singerId)
}

//# sourceURL=info.js
