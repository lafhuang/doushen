var request_prefix = "/ent/music/song";

var song_language;
var audio_type;

$(function() {
    var title = "<li>音乐</li><li>歌曲</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌曲&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/song');

    loadDict();
	load();
	loadSinger();
	loadAlbum();

	$("article").on("click", "a", function() {
		var target = $(this).attr("target");
		if (target) {
			getTarget(target);
		}
	});

	initSelect();
});

function loadDict() {
	$.ajax({
        type: 'get',
		url : "/system/dict/list/audio_type",
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            audio_type = {};
            for (var i = 0; i < result.length; i++) {
                audio_type[result[i].dictValue] = result[i].dictName;
            }
        }
    });

    $.ajax({
        type: 'get',
        url : "/system/dict/list/album_language",
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            song_language = {};
            for (var i = 0; i < result.length; i++) {
                song_language[result[i].dictValue] = result[i].dictName;
            }
        }
    });
}

function load() {
	$('#exampleTable')
		.bootstrapTable(
			{
				method : 'get',
				url : request_prefix + "/list",
				iconSize : 'outline',
				striped : true,
				dataType : "json",
				pagination : true,
				singleSelect : false,
				pageSize : 10,
				pageNumber : 1,
				showColumns : false,
				sidePagination : "server",
				queryParams : function(params) {
					return {
						limit : params.limit,
						offset : params.offset,
						name : $('#songName').val(),
						albumId : $("#song_album").val(),
						singerId : $("#song_singer").val()
					};
				},
				columns : [
					{
						checkbox : true
					},
					{
						field : 'name',
						title : '歌曲',
						formatter : function(value, row, index) {
						    return "<a target='/ent/music/song/info/" + row.id + "' id='song_" + row.id + "'>" + value + "</a>"
						}
					},
					{
						field : 'albumName',
						title : '专辑',
						formatter : function(value, row, index) {
                            return "<a target='/ent/music/album/info/" + row.albumId + "' id='album_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'singerName',
						title : '歌手',
                        formatter : function(value, row, index) {
                            return "<a target='/ent/music/singer/info/" + row.singerId + "' id='singer_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'trackNumber',
						title : '音轨号'
					},
					{
						field : 'language',
						title : '语言',
                        formatter : function(value, row, index) {
                            return song_language[value];
                        }
					},
					{
						field : 'length',
						title : '时长'
					},
					{
						field : 'size',
						title : '文件大小',
                        formatter : function(value, row, index) {
                            return value + " MB";
                        }
                    },
                    {
                        field : 'audioType',
                        title : '音频类型',
                        formatter : function(value, row, index) {
                            return audio_type[value];
                        }
                    },
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							return e + d;
						}
					} ]
			});
}

function loadSinger() {
	var html = "<option value=''>--歌手--</option>";
	var data = {};

	$.ajax({
		type: 'post',
		url : "/ent/music/singer/list",
		data: JSON.stringify(data),
		dataType: 'json',
		cache:false,
		async:false,
		contentType:"application/json",
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
			}
			$("#song_singer").html(html);

            $("#song_singer").on('change',function(){
                loadAlbum();
            });
		}
	});
}

function loadAlbum() {
	$("#song_album").html("");
	var singerId = $("#song_singer").val();

	var html = "<option value=''>--专辑--</option>";

	if (singerId != "") {
		var data = {
			"offset" : 0,
			"limit" : 1000,
			"singerId" : singerId
		};

		$.ajax({
			type: 'get',
			url : "/ent/music/album/list",
			data: data,
			dataType: 'json',
			cache:false,
			async:false,
			contentType:"application/json",
			success : function(result) {
				var data = result.rows;
				for (var i = 0; i < data.length; i++) {
					html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
				}
			}
		});
	}
	$("#song_album").html(html);
}

function resert() {
    $("#songName").val("");
    $("#song_album").val("");
    $("#song_singer").val("");
    $("#select2-song_singer-container").text("--歌手--");
    $("#select2-song_album-container").text("--专辑--");
    $('#exampleTable').bootstrapTable('refresh');
}

function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	getTarget(request_prefix + '/add');
}

function remove(id) {
    var singerName = $("#singer_"+id).text();
    var albumName = $("#album_"+id).text();
    var songName = $("#sona_"+id).text();

    $("#song_title").html("删除歌曲");
    $("#song_body p").text("是否要删除歌手["+singerName+"]专辑["+albumName+"]的歌曲["+songName+"]?");
    $("#song_btn1").attr("class", "btn btn-danger");
    $("#song_btn1").text("删除");
    $("#song_btn1").show();
    $("#song_btn1").click(function() {
        $.ajax({
            url : "/ent/music/song/remove",
            type : "post",
            data : {
                'id' : id
            },
            error : function(request) {
                $("#song_title").html("<i class='fa fa-warning'></i>删除歌曲失败");
                $("#song_body p").text("删除歌手["+singerName+"]专辑["+albumName+"]的歌曲["+songName+"]失败");
                $("#song_btn1").hide();
                $("#song_btn2").attr("class", "btn btn-default");
                $("#song_btn2").text("关闭");
                $("#song_btn2").click(function() {
                    $("#song_modal").modal('hide');
                    $('.modal-backdrop').remove();
                });
                $("#song_modal").modal();
            },
            success : function(data) {
                $("#song_title").html("删除歌曲");
                $("#song_body p").text("删除歌手["+singerName+"]专辑["+albumName+"]的歌曲["+songName+"]成功");
                $("#song_btn1").hide();
                $("#song_btn2").attr("class", "btn btn-default");
                $("#song_btn2").text("关闭");
                $("#song_btn2").click(function() {
                    $("#song_modal").modal('hide');
                    $('.modal-backdrop').remove();
                    getTarget("/ent/music/song");
                });
                $("#song_modal").modal();
            }
        });
    });

    $("#song_btn2").attr("class", "btn btn-primary");
    $("#song_btn2").text("取消");
    $("#song_btn2").click(function() {
        $("#song_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#song_modal").modal();
}

function edit(id) {
    getTarget(request_prefix + '/edit/' + id);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
        $("#song_title").html("批量删除歌曲");
        $("#song_body p").text("未选中歌曲");
        $("#song_btn1").hide();
        $("#song_btn2").attr("class", "btn btn-default");
        $("#song_btn2").text("关闭");
        $("#song_btn2").click(function() {
            $("#song_modal").modal('hide');
            $('.modal-backdrop').remove();
        });
        $("#song_modal").modal();
        return;
	}

    $("#song_title").html("批量删除歌曲");
    $("#song_body p").text("是否要删除选中的歌曲?");
    $("#song_btn1").attr("class", "btn btn-danger");
    $("#song_btn1").text("删除");
    $("#song_btn1").show();

    $("#song_btn1").click(function() {
        var ids = new Array();
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });

        $.ajax({
            type : 'POST',
            data : {
                "ids" : ids
            },
            url : request_prefix + '/batchRemove',
            error : function(data) {
                $("#song_title").html("<i class='fa fa-warning'></i>批量删除歌曲失败");
                $("#song_body p").text("批量删除歌曲失败");
                $("#song_btn1").hide();
                $("#song_btn2").attr("class", "btn btn-default");
                $("#song_btn2").text("关闭");
                $("#song_btn2").click(function() {
                    $("#song_modal").modal('hide');
                    $('.modal-backdrop').remove();
                });
                $("#song_modal").modal();
            },
            success : function(data) {
                $("#song_title").html("批量删除歌曲");
                $("#song_body p").text("批量删除歌曲成功");
                $("#song_btn1").hide();
                $("#song_btn2").attr("class", "btn btn-default");
                $("#song_btn2").text("关闭");
                $("#song_btn2").click(function() {
                    $("#song_modal").modal('hide');
                    $('.modal-backdrop').remove();
                    getTarget("/ent/music/song")；
                });
                $("#song_modal").modal();
            }
        });
    });

    $("#song_btn2").attr("class", "btn btn-primary");
    $("#song_btn2").text("取消");
    $("#song_btn2").click(function() {
        $("#song_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#song_modal").modal();

}

//# sourceURL=song.js
