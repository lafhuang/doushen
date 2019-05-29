var request_prefix = "/ent/music/album";

var singerMap;

var album_type;
var album_style;
var album_language;

$(function() {

    var title = "<li>音乐</li><li>专辑</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;专辑&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/album');

    loadSinger();
    loadDict();
	load();

	$("article").on("click", "a", function() {
        var target = $(this).attr("target");
        if (target) {
            getTarget(target);
        }
    });

    initSelect();

});

function loadSinger() {
    var data = {};
    $.ajax({
        type: 'post',
        url : "/ent/music/singer/list",
        data: JSON.stringify(data),
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
			singerMap = {};
			var html = "<option value=''>--歌手--</option>";
			for (var i = 0; i < result.length; i++) {
			    singerMap[result[i].id] = result[i].name;
				html += '<option value="' + result[i].id + '">' + result[i].name + '</option>'
			}
			$("#album_singer").html(html);
		}
	});
}

function loadDict() {
	$.ajax({
        type: 'get',
		url : "/system/dict/list/album_type",
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            album_type = {};
            for (var i = 0; i < result.length; i++) {
                album_type[result[i].dictValue] = result[i].dictName;
            }
        }
    });

    $.ajax({
        type: 'get',
        url : "/system/dict/list/album_style",
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            album_style = {};
            for (var i = 0; i < result.length; i++) {
                album_style[result[i].dictValue] = result[i].dictName;
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
            album_language = {};
            for (var i = 0; i < result.length; i++) {
                album_language[result[i].dictValue] = result[i].dictName;
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
						name : $('#albumName').val(),
						singerId : $("#album_singer").val()
					};
				},
				columns : [
					{
						checkbox : true
					},
					{
						field : 'name',
						title : '专辑名',
                        formatter : function(value, row, index) {
                            return "<a target='/ent/music/album/info/" + row.id + "' id='album_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'singerId',
						title : '歌手',
						formatter : function(value, row, index) {
						    return "<a target='/ent/music/singer/info/" + value + "' id='singer_" + row.id + "'>" + singerMap[value] + "</a>"
						}
					},
					{
						field : 'issueDate',
						title : '发行日期',
						formatter : function(value, row, index) {
						    if (value) {
						        return value.replace(" 00:00:00", "");
						    } else {
						        return "";
						    }
						}
					},
					{
						field : 'language',
						title : '语言',
						formatter : function(value, row, index) {
						    return album_language[value];
						}
					},
					{
						field : 'type',
						title : '类型',
                        formatter : function(value, row, index) {
                            return album_type[value];
                        }
					},
					{
						field : 'style',
						title : '风格',
                        formatter : function(value, row, index) {
                            var display_style = "";
                            var styles = value.split(",")
                            for (var idx = 0; idx < styles.length - 1; idx++) {
                                display_style += album_style[styles[idx]] + ", ";
                            }
                            display_style += album_style[styles[styles.length-1]];
                            return display_style;
                        }
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var e = '<a class="btn btn-warning btn-sm ' + s_edit_h + '" href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var d = '<a class="btn btn-danger btn-sm ' + s_remove_h + '" href="#" title="删除" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							return e + d;
						}
					} ]
			});
}

function resert() {
    $("#album_singer").val("");
    $("#albumName").val("");
    $("#select2-album_singer-container").text("--歌手--");
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

    $("#modal_title").html("删除专辑");
    $("#modal_body p").text("是否要删除歌手["+singerName+"]的专辑["+albumName+"]?");
    $("#modal_btn1").attr("class", "btn btn-danger");
    $("#modal_btn1").text("删除");
    $("#modal_btn1").show();
    $("#modal_btn1").click(function() {
        $.ajax({
            url : request_prefix + "/remove",
            type : "post",
            data : {
                'id' : id
            },
            error : function(request) {
                var title = "<i class='fa fa-warning'></i>删除专辑失败";
                var msg = "删除歌手["+singerName+"]的专辑["+albumName+"]失败";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = "close";
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            },
            success : function(data) {
                var title = "删除专辑";
                var msg = "删除歌手["+singerName+"]的专辑["+albumName+"]成功";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = request_prefix;
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            }
        });
    });

    $("#modal_btn2").attr("class", "btn btn-primary");
    $("#modal_btn2").text("取消");
    $("#modal_btn2").click(function() {
        $("#doudou_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#doudou_modal").modal();
}

function edit(id) {
	getTarget(request_prefix + '/edit/' + id);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		var title = "批量删除专辑";
        var msg = "未选中专辑";
        var btn1Text = "关闭";
        var btn1Class = "btn btn-default";
        var btn1Url = "";
        var btn2Text = "关闭";
        var btn2Class = "btn btn-default";
        var btn2Url = "close";
        showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
		return;
	}

    $("#modal_title").html("批量删除专辑");
    $("#modal_body p").text("是否要删除选中的专辑?");
    $("#modal_btn1").attr("class", "btn btn-danger");
    $("#modal_btn1").text("删除");
    $("#modal_btn1").show();

    $("#modal_btn1").click(function() {
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
                var title = "<i class='fa fa-warning'></i>批量删除专辑失败";
                var msg = "批量删除专辑失败";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = "close";
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            },
            success : function(data) {
                var title = "批量删除专辑";
                var msg = "批量删除专辑成功";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = "/ent/music/album";
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            }
        });
    });

    $("#modal_btn2").attr("class", "btn btn-primary");
    $("#modal_btn2").text("取消");
    $("#modal_btn2").click(function() {
        $("#doudou_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#doudou_modal").modal();
}

//# sourceURL=album.js
