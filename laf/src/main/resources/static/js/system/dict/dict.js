var request_prefix = "/system/dict";

$(function() {
    var title = "<li>系统管理</li><li>数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

	initDictType();
	load();
});

function initDictType() {
	var html = "<option value=\"\">--数据字典类型--</option>";
	$.ajax({
		url : request_prefix + '/type',
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].dictType + '">' + data[i].description + '</option>'
			}
			$("#dict_type").html(html);
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
                        dictType : $("#dict_type").val()
					};
				},
				columns : [
					{
						checkbox : true
					},
					{
						field : 'dictName',
						title : '数据字典名',
                        formatter : function(value, row, index) {
                            return "<a id='dictName_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'dictValue',
						title : '数据字典值',
                        formatter : function(value, row, index) {
                            return "<a id='dictValue_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'dictType',
						title : '数据字典类型'
					},
					{
						field : 'description',
						title : '数据字典描述'
					},
					{
						field : 'sort',
						title : '排序'
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
							var f = '<a class="btn btn-success btn-sm ' + s_add_h + '" href="#" title="增加"  mce_href="#" onclick="addD(\''
								+ row.dictType
								+ '\')"><i class="fa fa-plus"></i></a> ';
							return e + d +f;
						}
					} ]
			});
}

function resert() {
    $("#dict_type").val("");
    $('#exampleTable').bootstrapTable('refresh');
}

function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	getTarget(request_prefix + '/add');
}

function edit(id) {
	getTarget(request_prefix + '/edit/' + id);
}

function remove(id) {

    var dictName = $("#dictName_"+id).text();
    var dictValue = $("#dictValue_"+id).text();
	$("#doudou_modal_title").text("删除数据字典");
    $("#doudou_modal_body p").text("是否要删除数据字典:"+dictName+"["+dictValue+"]?");

    var btn = "<button type='button' class='btn btn-danger' id='delBtn'><i class='fa fa-trash-o'></i>&nbsp; 删除</button>" +
              "<button type='button' class='btn btn-default' id='cancelBtn'><i class='fa fa-times'></i>&nbsp; 取消</button>";

    $("#doudou_modal_footer").html(btn);

    $("#doudou_modal").modal();

    $("#delBtn").click(function () {
        $("#closeBtn").click();

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

    $("#cancelBtn").click(function () {
        $("#closeBtn").click();
    });

}

function addD(type) {
	getTarget(request_prefix + '/add/'+type);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
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

//# sourceURL=dict.js
