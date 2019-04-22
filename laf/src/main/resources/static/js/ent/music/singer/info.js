var request_prefix = "/ent/music/singer"

$().ready(function() {
    initRegionType();

    $("article a").on("click", function() {
        var target = $(this).attr("target");
        getTarget(target);
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
    var id = $("#id").val();
	getTarget(request_prefix + '/edit/' + id)
}

function goBack() {
    getTarget(request_prefix);
}

function loadAllAlbum() {
    $("#song_part").remove();
    $("#all_album_button").remove();

    $.ajax({
        url : "/ent/music/album/list",
        type : "get",
        data : {
            'singerId' : $("#id").val(),
            'offset' : 0,
            'limit' : 1000
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
    $("#album_part").remove();
    $("#all_song_button").remove();

    $.ajax({
        url : "/ent/music/song/list",
        type : "get",
        data : {
            'singerId' : $("#id").val(),
            'offset' : 0,
            'limit' : 1000
        },
        success : function(result) {
            var songList = result.rows;
            var html = "";
            for (var idx = 0; idx < songList.length; idx++) {
                var song = songList[idx];
                html += "<li>";
                html += "    <div class=\"songlist__item\" onmouseover=\"this.className=(this.className+' songlist__item--hover')\" onmouseout=\"this.className=this.className.replace(/ songlist__item--hover/, '')\">";
                html += "        <div class=\"songlist__edit songlist__edit--check sprite\">";
                html += "            <input type=\"checkbox\" class=\"songlist__checkbox\">";
                html += "        </div>";
                html += "        <div class=\"songlist__number\">" + (idx+1) + "</div>";
                html += "        <div class=\"songlist__songname\">";
                html += "            <span class=\"songlist__songname_txt\"><a target='/ent/music/song/info/" + song.id + "' class=\"js_song\" title='" + song.name + "'>" + song.name + "</a></span>";
                html += "        </div>";
                html += "        <div class=\"songlist__album\">";
                html += "            <a target='/ent/music/album/info/" + song.albumId + "' title='" + song.albumName + "' class=\"album_name\" >" + song.albumName + "</a>";
                html += "        </div>";
                html += "        <div class=\"songlist__time\">" + song.length + "</div>";
                html += "        <div class=\"songlist__type\">" + song.audioType + "</div>";
                html += "        <div class=\"songlist__other\"></div>";
                html += "     </div>"
                html += "</li>";
            }
            $("#songlist").html(html);
        }
    });
}

function importAlbum() {
    var id = $("#id").val();
	layer.open({
		type : 2,
		title : '导入专辑',
		maxmin : true,
		shadeClose : false,
		area : [ '65%', '65%' ],
		content : request_prefix + '/importAlbum/' + id // iframe的url
	});
}

function importSong() {
    var id = $("#id").val();
	layer.open({
		type : 2,
		title : '导入歌曲',
		maxmin : true,
		shadeClose : false,
		area : [ '65%', '65%' ],
		content : request_prefix + '/importSong/' + id // iframe的url
	});
}

//# sourceURL=info.js
