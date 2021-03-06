var request_prefix = "/system/menu";

$(document).ready(function () {
    load();
});

var load = function () {
    $('#exampleTable')
        .bootstrapTreeTable(
            {
                rootIdValue: '0',
                id: 'id',
                parentId: 'parentId',
                type: "GET", // 请求数据的ajax类型
                url: request_prefix + '/list', // 请求数据的ajax的url
                ajaxParams: {sort:'sort'}, // 请求数据的ajax的data属性
                expandColumn: '1',// 在哪一列上面显示展开按钮
                expandAll: false, // 是否全部展开
                expandFirst : true,
                toolbar: null,
                striped: true, // 是否各行渐变色
                hover: true,
                bordered: true, // 是否显示边框
                checkbox: true,
                singleSelect : false, // 设置为true将禁止多选
                columns: [
                    {
                        checkbox: true
                    },
                    {
                        title: '名称',
                        field: 'menuName'
                    },
                    {
                        title: '图标',
                        field: 'icon',
                        formatter: function (value, row, index) {
                            return row.icon == null ? '' : '<i class="' + row.icon + ' fa-lg"></i>';
                        }
                    },
                    {
                        title: '排序',
                        field: 'sort'
                    },
                    {
                        title: '类型',
                        field: 'type',
                        formatter: function (value, row, index) {
                            if (row.type === '0') {
                                return '目录';
                            }
                            if (row.type === '1') {
                                return '菜单';
                            }
                            if (row.type === '2') {
                                return '按钮';
                            }
                        }
                    },
                    {
                        title: '地址',
                        field: 'url',
                        formatter: function (value, row, index) {
                            if (value == null || value == "") {
                                return "#";
                            } else {
                                return value;
                            }
                        }
                    },
                    {
                        title: '权限标识',
                        field: 'perms'
                    },
                    {
                        title: '操作',
                        field: 'id',
                        align : 'center',
                        formatter: function (value, row, index) {
                            var e = '<a class="btn btn-primary btn-sm '
                                + s_edit_h
                                + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
                                + row.id
                                + '\')"><i class="fa fa-edit"></i></a> ';

                            var p = '';
                            if (row.type === '0' || row.type === '1') {
                                p += '<a class="btn btn-primary btn-sm '
                                    + s_add_h
                                    + '" href="#" mce_href="#" title="添加子节点" onclick="add(\''
                                    + row.id
                                    + '\')"><i class="fa fa-plus"></i></a> ';
                            }

                            var d = '<a class="btn btn-warning btn-sm '
                                + s_remove_h
                                + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
                                + row.id
                                + '\')"><i class="fa fa-remove"></i></a> ';

                            return e + d + p;
                        }
                    }]
            });
    $(".treetable-bars").hide();
}

function reLoad() {
    load();
}

function add(pId) {
    getTarget(request_prefix + '/add/' + pId);
}

function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: request_prefix + "/remove",
            type: "post",
            data: {
                'id': id
            },
            success: function (data) {
                if (data.code == 0) {
                    layer.msg("删除成功");
                    reLoad();
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    })
}

function edit(id) {
    layer.open({
        type: 2,
        title: '菜单修改',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['60%', '60%'],
        content: request_prefix + '/edit/' + id // iframe的url
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
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
		/*
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
		});*/
	}, function() {});
}

//# sourceURL=menu.js
