var request_prefix = "/system/user"

$(function() {
	var deptId = '';
	getTreeData();
	load(deptId);


	$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
	$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function(e) {
		var children = $(this).parent('li.parent_li').find(' > ul > li');
		if (children.is(':visible')) {
			children.hide('fast');
			$(this).attr('title', 'Expand this branch').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
		} else {
			children.show('fast');
			$(this).attr('title', 'Collapse this branch').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
		}
		e.stopPropagation();
	});
});

function load(deptId) {
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
						name : $('#searchName').val(),
						deptId : deptId
					};
				},
				columns : [
					{
						checkbox : true
					},
					{
						field : 'name',
						title : '姓名'
					},
					{
						field : 'userName',
						title : '用户名'
					},
					{
						field : 'email',
						title : '邮箱'
					},
					{
						field : 'status',
						title : '状态',
						align : 'center',
						formatter : function(value, row, index) {
							if (value == '0') {
								return '<span class="btn btn-danger">禁用</span>';
							} else if (value == '1') {
								return '<span class="btn btn-primary">正常</span>';
							}
						}
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var e = '<a  class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit "></i></a> ';
							var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							var f = '<a class="btn btn-success btn-sm ' + s_resetPwd_h + '" href="#" title="重置密码"  mce_href="#" onclick="resetPwd(\''
								+ row.id
								+ '\')"><i class="fa fa-key"></i></a> ';
							return e + d + f;
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
			url : "/system/user/remove",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
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

function resetPwd(id) {
	layer.open({
		type : 2,
		title : '重置密码',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '400px', '260px' ],
		content : request_prefix + '/resetPwd/' + id // iframe的url
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

function getTreeData() {
	$.ajax({
		type : "GET",
		url : "/system/dept/tree",
		success : function(tree) {
		    var parent = $("<ul></ul>");
		    loadDeptTree(tree, parent);
		    $('.tree').html(parent);
		}
	});
}

function loadDeptTree(childList, parent) {

    for (var idx = 0; idx < childList.length; idx++) {
        var child = childList[idx];
        var li = $("<li></li>");
        if (child.children.length > 0) {
            var span = '';
            if (child.id == 1) {
                span = $("<span name='dept_node' dept_id='"+child.id+"'><i class='fa fa-lg fa-home'></i> "+child.text+"</span>");
            } else {
                span = $("<span name='dept_node' dept_id='"+child.id+"'><i class='fa fa-lg fa-minus-circle'></i> "+child.text+"</span>");
            }
            $(li).append(span).append("<ul></ul>").appendTo(parent);
            loadDeptTree(child.children, $(li).children().eq(1));
        } else {
            var span = $("<span name='dept_node' dept_id='"+child.id+"'><i class='icon-leaf'></i> "+child.text+"</span>");
            $(li).append(span).appendTo(parent);
        }
    }

}

//# sourceURL=user.js
