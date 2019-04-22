var request_prefix = "/ent/music/song";

var song_language;
var audio_type;

$(function() {
    loadDict();
	load();

	loadSinger();
	loadAlbum();
});

function loadDict() {
	$.ajax({
        type: 'get',
		url : "/system/dict/list/audio_type",
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

            audio_type = {};

            //加载数据
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

            song_language = {};

            //加载数据
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
				method : 'get', // 服务器数据的请求方式 get or post
				url : request_prefix + "/list", // 服务器数据的加载地址
				//	showRefresh : true,
				//	showToggle : true,
				//	showColumns : true,
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				// contentType : "application/x-www-form-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				//search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
				queryParams : function(params) {
					return {
						//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						name : $('#songName').val(),
						albumId : $("#song_album").val(),
						singerId : $("#song_singer").val()
					};
				},
				// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
				// queryParamsType = 'limit' ,返回参数必须包含
				// limit, offset, search, sort, order 否则, 需要包含:
				// pageSize, pageNumber, searchText, sortName,
				// sortOrder.
				// 返回false将会终止请求
				columns : [
					{
						checkbox : true
					},
					{
						field : 'name',
						title : '歌曲',
						formatter : function(value, row, index) {
						    return "<a href='/ent/music/song/info/" + row.id + "'>" + value + "</a>"
						}
					},
					{
						field : 'albumName',
						title : '专辑',
						formatter : function(value, row, index) {
                            return "<a href='/ent/music/album/info/" + row.albumId + "'>" + value + "</a>"
                        }
					},
					{
						field : 'singerName',
						title : '歌手',
                        formatter : function(value, row, index) {
                            return "<a href='/ent/music/singer/info/" + row.singerId + "'>" + value + "</a>"
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

	var html = "<option value=''>选择歌手</option>";
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
		},success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
			}
			$("#song_singer").html(html);

			$("#song_singer").selectpicker().on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
				loadAlbum();
			});

		}
	});
}

function loadAlbum() {

	$("#song_album").html("");
	var singerId = $("#song_singer").val();

	var html = "<option value=''>选择专辑</option>";

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
			error : function(request) {
				parent.layer.alert("Connection error");
			},success : function(result) {
				//加载数据
				var data = result.rows;
				for (var i = 0; i < data.length; i++) {
					html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
				}
			}
		});
	}
	$("#song_album").html(html);
	$("#song_album").selectpicker('refresh');
}

function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '添加歌曲',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '100%', '100%' ],
		content : request_prefix + '/add' // iframe的url
	});
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
	layer.open({
		type : 2,
		title : '歌曲信息修改',
		maxmin : true,
		shadeClose : true, // 点击遮罩关闭层
		area : [ '100%', '100%' ],
		content : request_prefix + '/edit/' + id // iframe的url
	});
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