var request_prefix = "/ent/music/album";

var singerMap;

var album_type;
var album_style;
var album_language;

$(function() {
    loadSinger();
    loadDict();

	setTimeout("load();",500);
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
			singerMap = {};

			var html = "<option value=''>选择歌手</option>";
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

            album_type = {};

            //加载数据
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

            album_style = {};

            //加载数据
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

            album_language = {};

            //加载数据
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
				method : 'get', // 服务器数据的请求方式 get or post
				url : request_prefix + "/list", // 服务器数据的加载地址
				iconSize : 'outline',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				singleSelect : false, // 设置为true将禁止多选
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
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
                            return "<a href='/ent/music/album/info/" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'singerId',
						title : '歌手',
						formatter : function(value, row, index) {
						    return "<a href='/ent/music/singer/info/" + value + "'>" + singerMap[value] + "</a>"
						}
					},
					{
						field : 'issueDate',
						title : '发行日期',
						formatter : function(value, row, index) {
						    return value.replace(" 00:00:00", "");
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
                            return album_style[value];
                        }
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var e = '<a class="btn btn-warning btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var d = '<a class="btn btn-danger btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							return e + d;
						}
					} ]
			});
}

function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	getTarget(request_prefix + '/add');
}

function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : request_prefix + "/remove",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code === 0) {
					layer.msg("删除成功");
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})

}

function edit(id) {
	getTarget(request_prefix + '/edit/' + id);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	}, function() {
		var ids = new Array();
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
		console.log(ids);
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : request_prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {});
}

//# sourceURL=album.js
