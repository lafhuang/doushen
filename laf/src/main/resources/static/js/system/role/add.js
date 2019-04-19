$(function() {
	getMenuTreeData();
	validateRule();
});
$.validator.setDefaults({
	submitHandler : function() {
		getAllSelectNodes();
		save();
	}
});

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
	$.ajax({
		type : "GET",
		url : "/system/menu/tree",
		success : function(menuTree) {
			loadMenuTree(menuTree);
		}
	});
}
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
            open : true
        };
        zNodes.push(node);
    }

    $.fn.zTree.init($("#menuTree"), setting, zNodes);
}

function save() {
	var role = $('#signupForm').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/role/save",
		data : role, // 你的formid

		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引

				parent.layer.close(index);

			} else {
				parent.layer.msg(data.msg);
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