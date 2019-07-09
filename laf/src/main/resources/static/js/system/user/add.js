$().ready(function() {
    var title = "<li>系统管理</li><li>用户管理</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-user'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;用户管理&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'system/user');

    loadDept();
	formValidate();
});

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/album/save",
        data : $('#albumForm').serialize(),
        async : false,
        error : function(request) {
            $("#album_add_title").html("<i class='fa fa-warning'></i>添加专辑失败");
            $("#album_add_body p").text("添加专辑失败");
            $("#album_add_btn1").attr("class", "btn btn-primary");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
            });
            $("#album_add_btn2").attr("class", "btn btn-default");
            $("#album_add_btn2").text("关闭");
            $("#album_add_btn2").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#album_add_modal").modal();
        },
        success : function(data) {
            $("#album_add_title").html("添加专辑成功");
            $("#album_add_body p").text("添加专辑成功");
            $("#album_add_btn1").attr("class", "btn btn-default");
            $("#album_add_btn1").text("返回");
            $("#album_add_btn1").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album");
            });
            $("#album_add_btn2").attr("class", "btn btn-primary");
            $("#album_add_btn2").text("继续添加");
            $("#album_add_btn2").click(function() {
                $("#album_add_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/ent/music/album/add");
            });
            $("#album_add_modal").modal();
        }
    });
}

//# sourceURL=add.js

function getCheckedRoles() {
	var adIds = "";
	$("input:checkbox[name=role]:checked").each(function(i) {
		if (0 == i) {
			adIds = $(this).val();
		} else {
			adIds += ("," + $(this).val());
		}
	});
	return adIds;
}

function save() {
	$("#roleIdList").val(getCheckedRoles());
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/user/save",
		data : $('#userForm').serialize(),
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			},
			userName : {
				required : true,
				minlength : 2,
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
			password : {
				required : true,
				minlength : 6
			},
			confirm_password : {
				required : true,
				minlength : 6,
				equalTo : "#password"
			},
			email : {
				required : true,
				email : true
			},
			topic : {
				required : "#newsletter:checked",
				minlength : 2
			},
			agree : "required"
		},
		messages : {

			name : {
				required : icon + "请输入姓名"
			},
			userName : {
				required : icon + "请输入您的用户名",
				minlength : icon + "用户名必须两个字符以上",
				remote : icon + "用户名已经存在"
			},
			password : {
				required : icon + "请输入您的密码",
				minlength : icon + "密码必须6个字符以上"
			},
			confirm_password : {
				required : icon + "请再次输入密码",
				minlength : icon + "密码必须6个字符以上",
				equalTo : icon + "两次输入的密码不一致"
			},
			email : icon + "请输入您的E-mail",
		}
	})
}

//# sourceURL=add.js
