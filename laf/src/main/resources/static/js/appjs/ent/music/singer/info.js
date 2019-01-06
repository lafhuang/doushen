var request_prefix = "/ent/music/singer"

function edit(id) {
    var id = $("#id").val();
	layer.open({
		type : 2,
		title : '修改歌手信息',
		maxmin : true,
		shadeClose : false,
		area : [ '60%', '60%' ],
		content : request_prefix + '/edit/' + id // iframe的url
	});
}

function reLoad() {
	window.location.reload();
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
                html += "            <a href='/ent/music/album/info/" + album.id + "' class='js_album'>";
                html += "                <img src='" + album.cover + "' alt='" + album.name + "' class='playlist__pic' onerror='imgError();'>";
                html += "                <i class=' js_play'></i>";
                html += "            </a>";
                html += "        </div>";
                html += "        <h4 class='playlist__title'>"
                html += "            <span class='playlist__title_txt'>";
                html += "                <a href='/ent/music/album/info/" + album.id + "' title='" + album.name + "' class='js_album'>" + album.name + "</a>"
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
                html += "            <span class=\"songlist__songname_txt\"><a href='/ent/music/song/info/" + song.id + "' class=\"js_song\" title='" + song.name + "'>" + song.name + "</a></span>";
                html += "        </div>";
                html += "        <div class=\"songlist__album\">";
                html += "            <a href='/ent/music/album/info/" + song.albumId + "' title='" + song.albumName + "' class=\"album_name\" >" + song.albumName + "</a>";
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