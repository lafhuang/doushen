var request_prefix = "/system/dept"

$(function() {
	loadDept();
});

function expandAll() {
    var children = $('.tree').find('li');
    children.show('fast');
    $('.tree').find('li.parent_li > span').attr('title', '收起').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
}

function collapseAll() {
    $("span[id^='dept_node_']").removeClass("focus");
    $("#deptInfo").html("");
    $('.tree').find('li').each(function () {
        var deptId = $(this).find(" > span").attr("id");
        if (deptId != "dept_node_1") {
            $(this).hide('fast');
        }
    });
    $('.tree').find('li.parent_li > span').attr('title', '展开').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
}

function loadDept() {
	$.ajax({
        type : "GET",
        url : "/system/dept/tree",
        success : function(tree) {
            var parent = $("<ul></ul>");
            loadDeptTree(tree, parent);
            $('.tree').html(parent);

            $('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
            $('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', '收起').find(' > i').on('click', function(e) {
                var children = $(this).parent().parent('li.parent_li').find(' > ul > li');
                if (children.is(':visible')) {
                    children.hide('fast');
                    $(this).parent().attr('title', '展开').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
                } else {
                    children.show('fast');
                    $(this).parent().attr('title', '收起').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
                }
                e.stopPropagation();
            });
        }
    });
}

function loadDeptTree(childList, parent) {
    for (var idx = 0; idx < childList.length; idx++) {
        var child = childList[idx];
        var li = $("<li></li>");
        if (child.children.length > 0) {
            var span = $("<span id='dept_node_"+child.id+"' onclick='showDept("+child.id+")'><i class='fa fa-lg fa-minus-circle'></i> "+child.text+"</span>");
            $(li).append(span).append("<ul></ul>").appendTo(parent);
            loadDeptTree(child.children, $(li).children().eq(1));
        } else {
            var span = $("<span id='dept_node_"+child.id+"' onclick='showDept("+child.id+")'><i class='icon-leaf'></i> "+child.text+"</span>");
            $(li).append(span).appendTo(parent);
        }
    }

}

function showDept(deptId) {
    $("span[id^='dept_node_']").removeClass("focus");
    $("#dept_node_"+deptId).addClass("focus");
    $("#pId").val(deptId);

    $.ajax({
        url : request_prefix + "/get/"+deptId,
        type : "get",
        success : function(r) {
            var deptInfoHtml = "";
            deptInfoHtml += "<form class='form-horizontal'>";
            deptInfoHtml += "    <fieldset>";
            deptInfoHtml += "        <legend>&nbsp;&nbsp;部门详细信息&nbsp;&nbsp;</legend>";
            deptInfoHtml += "        <div class='form-group'>";
            deptInfoHtml += "            <label class='col-md-2 control-label'>部门ID</label>";
            deptInfoHtml += "            <div class='col-md-8'>";
            deptInfoHtml += "                <input class='form-control' disabled='disabled' value='"+r.id+"' type='text'>";
            deptInfoHtml += "            </div>";
            deptInfoHtml += "        </div>";

            deptInfoHtml += "        <div class='form-group'>";
            deptInfoHtml += "            <label class='col-md-2 control-label'>部门名称</label>";
            deptInfoHtml += "            <div class='col-md-8'>";
            deptInfoHtml += "                <input class='form-control' disabled='disabled' value='"+r.deptName+"' type='text'>";
            deptInfoHtml += "            </div>";
            deptInfoHtml += "        </div>";

            var parentId = r.parentId;
            if (parentId == 0) {
                parentId = "无";
            }
            deptInfoHtml += "        <div class='form-group'>";
            deptInfoHtml += "            <label class='col-md-2 control-label'>上级部门ID</label>";
            deptInfoHtml += "            <div class='col-md-8'>";
            deptInfoHtml += "                <input class='form-control' disabled='disabled' value='"+parentId+"' type='text'>";
            deptInfoHtml += "            </div>";
            deptInfoHtml += "        </div>";

            var pName = r.parentName;
            if (pName == null || $.trim(pName) == "") {
                pName = "无";
            }
            deptInfoHtml += "        <div class='form-group'>";
            deptInfoHtml += "            <label class='col-md-2 control-label'>上级部门名称</label>";
            deptInfoHtml += "            <div class='col-md-8'>";
            deptInfoHtml += "                <input class='form-control' disabled='disabled' value='"+pName+"' type='text'>";
            deptInfoHtml += "            </div>";
            deptInfoHtml += "        </div>";

            deptInfoHtml += "    </fieldset>";
            deptInfoHtml += "</form>";

            $("#deptInfo").html(deptInfoHtml);
        }
    });
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
