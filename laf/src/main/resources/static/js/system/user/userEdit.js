function formValidate() {
	$('#userForm').validate({
		ignore: [],
		errorClass: 'invalid',
		errorElement: 'em',
		highlight: function (element) {
			$(element).parent().removeClass('state-success').addClass("state-error");
			$(element).removeClass('valid');
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("state-error").addClass('state-success');
			$(element).addClass('valid');
		},
		rules : {
			name : {
				required : true
			},
			userName : {
				required : true,
                remote : {
                    url : "/system/user/exist", // 后台处理程序
                    type : "post", // 数据发送方式
                    dataType : "json", // 接受数据格式
                    data : { // 要传递的数据
                        userName : function() {
                            return $("#userName").val();
                        }
                    }
                }
			},
			deptId : {
			    required : true
			},
			email : {
			    required : true,
			    email : true
			}
		},
		messages : {
			name : {
				required : "&nbsp;&nbsp;请输入姓名"
			},
			userName : {
				required : "&nbsp;&nbsp;请输入用户名",
				remote : "&nbsp;&nbsp;remote"
			},
			deptId : {
				required : "&nbsp;&nbsp;请选择用户所在部门"
			},
            email : {
                required : "&nbsp;&nbsp;请输入email",
                email : "&nbsp;&nbsp;请输入正确的email"
            }
		},
		submitHandler: function () {
			var userId = $("#userId").val();
			if (userId) {
				update();
			} else {
				save();
			}
		},
		errorPlacement: function (error, element) {
			error.insertAfter(element.parent());
		}
	});
}

function loadDept() {
	$.ajax({
        type : "GET",
        url : "/system/dept/tree",
        success : function(tree) {
            var parent = $("<ul></ul>");
            loadDeptTree(tree, parent);
            $('.tree').html(parent);

            $('.tree').find('li').each(function () {
                var deptId = $(this).find(" > span").attr("id");
                if (deptId != "dept_node_1") {
                    $(this).hide();
                }
            });

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
            if (child.id == '1') {
                var span = $("<span id='dept_node_"+child.id+"' class='inline-group' style='margin-bottom: 0px;'><i class='fa fa-lg fa-plus-circle'></i> <label class='radio' style='margin: 0px'><input type='radio' name='userDept' checked/><i onclick='setDept("+child.id+")'></i></label> "+child.text+" </span>");
            } else {
                var span = $("<span id='dept_node_"+child.id+"' class='inline-group' style='margin-bottom: 0px;'><i class='fa fa-lg fa-plus-circle'></i> <label class='radio' style='margin: 0px'><input type='radio' name='userDept'/><i onclick='setDept("+child.id+")'></i></label> "+child.text+" </span>");
            }
            $(li).append(span).append("<ul></ul>").appendTo(parent);
            loadDeptTree(child.children, $(li).children().eq(1));
        } else {
            var span = $("<span id='dept_node_"+child.id+"' class='inline-group' style='margin-bottom: 0px;'> <label class='radio' style='margin: 0px'><input type='radio' name='userDept'/><i onclick='setDept("+child.id+")'></i></label> "+child.text+" </span>");
            $(li).append(span).appendTo(parent);
        }
    }
}

function setDept(deptId) {
    $("#deptId").val(deptId);
}
//# sourceURL=userEdit.js