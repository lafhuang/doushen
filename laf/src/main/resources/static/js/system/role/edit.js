$(function() {
	getMenuTreeData();
	validateRule();
});
$.validator.setDefaults({
	submitHandler : function() {
		getAllSelectNodes();
		update();
	}
});
function loadMenuTree(menuTree) {

    var setting = {
        check: {
            enable: true
        },data: {
            simpleData: {
                enable: true
            }
        }
    };

    var zNodes =[];

    for (var idx = 0; idx < menuTree.length; idx++) {
        var menu = menuTree[idx];
        var node = {
            id : menu.id,
            pId : menu.parentId,
            name : menu.menuName,
            open : true,
            checked : menu.checked
        };
        zNodes.push(node);
    }

    $.fn.zTree.init($("#menuTree"), setting, zNodes);

}
function getAllSelectNodes() {
    var menuIdList = [];

    var menuTree = $.fn.zTree.getZTreeObj("menuTree");
    checkedNodes = menuTree.getCheckedNodes(true);

    for (var idx = 0; idx < checkedNodes.length; idx++) {
        var node = checkedNodes[idx];
        menuIdList.push(node.id);
    }

    $('#menuIdList').val(menuIdList);
}
function getMenuTreeData() {
	var id = $('#id').val();
	$.ajax({
		type : "GET",
		url : "/system/menu/tree/" + id,
		success : function(data) {
			loadMenuTree(data);
		}
	});
}
function update() {
	var role = $('#signupForm').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/role/update",
		data : role, // 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(r) {
			if (r.code == 0) {
				parent.layer.msg(r.msg);
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.msg(r.msg);
			}

		}
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			roleName : {
				required : true
			}
		},
		messages : {
			roleName : {
				required : icon + "请输入角色名"
			}
		}
	});
}

//# sourceURL=edit.js
