var request_prefix = "/system/dept"

$(function() {
	load();
});

function load() {
	$('#exampleTable')
		.bootstrapTreeTable(
			{
				id: 'id',
				code: 'id',
				parentCode: 'parentId',
				type: "GET", // 请求数据的ajax类型
				url: request_prefix + '/list', // 请求数据的ajax的url
				ajaxParams: {sort:'sort'}, // 请求数据的ajax的data属性
				expandColumn: '0',// 在哪一列上面显示展开按钮
				striped: true, // 是否各行渐变色
				bordered: true, // 是否显示边框
				expandAll: false, // 是否全部展开
				singleSelect : false, // 设置为true将禁止多选
				columns : [
					{
						field : 'deptName',
						title : '部门名称',
                        valign : 'center',
						witth :20
					},
					{
						field : 'sort',
						title : '排序',
                        align : 'center',
                        valign : 'center',
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
                        valign : 'center',
						formatter : function(item, index) {
							var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ item.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var a = '<a class="btn btn-primary btn-sm ' + s_add_h + '" href="#" title="增加下級"  mce_href="#" onclick="add(\''
								+ item.id
								+ '\')"><i class="fa fa-plus"></i></a> ';
							var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ item.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							return e + a + d;
						}
					} ]
			});
}
function reLoad() {
	load();
}
function add(pId) {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '60%' ],
		content : request_prefix + '/add/' + pId
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '60%' ],
		content : request_prefix + '/edit/' + id // iframe的url
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的部门及其子部门？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : request_prefix + "/remove",
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

