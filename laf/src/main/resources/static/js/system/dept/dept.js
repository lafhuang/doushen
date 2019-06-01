var request_prefix = "/system/dept"

$(function() {
	loadDept();
});

function loadDept() {
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
                span = $("<span name='dept_node' onclick='showDept("+child.id+")'><i class='fa fa-lg fa-home'></i> "+child.text+"</span>");
            } else {
                span = $("<span name='dept_node' onclick='showDept("+child.id+")'><i class='fa fa-lg fa-minus-circle'></i> "+child.text+"</span>");
            }
            $(li).append(span).append("<ul></ul>").appendTo(parent);
            loadDeptTree(child.children, $(li).children().eq(1));
        } else {
            var span = $("<span name='dept_node' onclick='showDept("+child.id+")'><i class='icon-leaf'></i> "+child.text+"</span>");
            $(li).append(span).appendTo(parent);
        }
    }

}

function showDept(deptId) {
    $("#pId").val(deptId);
}

function add() {
    var pId = $("#pId").val();
    if (pId == '') {
        pId = 1;
    }
	getTarget(request_prefix + '/add/' + pId);
}

function edit(id) {
	getTarget(request_prefix + '/edit/' + id);
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

//# sourceURL=dept.js
