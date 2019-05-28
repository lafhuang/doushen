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
			//加载数据
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

    var title = "删除专辑";
    var msg = "是否要删除歌手["+singerName+"]的专辑["+albumName+"]?";
    var btn1Text = "删除";
    var btn1Class = "btn btn-danger";
    var btn1Url = "function_delAlbum";
    var btn2Text = "取消";
    var btn2Class = "btn btn-primary";
    var btn2Url = "close";
    showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);

    $("#delBtn").click(function () {
        $.ajax({
            url : request_prefix + "/remove",
            type : "post",
            data : {
                'id' : id
            },
            success : function(data) {
                $("#doudou_modal_body p").text(data.msg);
                var sucBtn = "<button type='button' class='btn btn-default' id='close_Btn'><i class='fa  fa-times-circle'></i>&nbsp; 关闭</button>";

                $("#doudou_modal_footer").html(sucBtn);
                $("#doudou_modal").modal();

                $("#close_Btn").click(function () {
                    $("#closeBtn").click();
					reLoad();
                });
            }
        });
    });

}

function edit(id) {
	getTarget(request_prefix + '/edit/' + id);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		$("#doudou_modal_title").text("批量删除专辑");
		$("#doudou_modal_body p").text("未选中专辑");

		var btn = "<button type='button' class='btn btn-default' id='close_Btn'><i class='fa fa-trash-o'></i>&nbsp; 关闭</button>";

		$("#doudou_modal_footer").html(btn);

		$("#doudou_modal").modal();

		$("#close_Btn").click(function () {
			$("#closeBtn").click();
		});
		return;
	}

	$("#doudou_modal_title").text("批量删除专辑");
	$("#doudou_modal_body p").text("是否要删除选中的专辑?");

	var btn = "<button type='button' class='btn btn-danger' id='delBtn'><i class='fa fa-trash-o'></i>&nbsp; 删除</button>" +
		"<button type='button' class='btn btn-default' id='cancelBtn'><i class='fa fa-times'></i>&nbsp; 取消</button>";

	$("#doudou_modal_footer").html(btn);

	$("#doudou_modal").modal();

	$("#delBtn").click(function () {
		$("#closeBtn").click();

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
			success : function(data) {
				$("#doudou_modal_body p").text(data.msg);
				var sucBtn = "<button type='button' class='btn btn-default' id='close_Btn'><i class='fa  fa-times-circle'></i>&nbsp; 关闭</button>";

				$("#doudou_modal_footer").html(sucBtn);
				$("#doudou_modal").modal();

				$("#close_Btn").click(function () {
					$("#closeBtn").click();
					reLoad();
				});
			}
		});

	});

	$("#cancelBtn").click(function () {
		$("#closeBtn").click();
	});

}

//# sourceURL=album.js
