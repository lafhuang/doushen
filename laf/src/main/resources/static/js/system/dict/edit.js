$().ready(function() {
    var title = "<li>系统管理</li><li>数据字典</li><li>编辑数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span><span>>&nbsp;编辑数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

    initDictType();
	formValidate();
	initSelect();
});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/system/dict/update",
		data : $('#dictForm').serialize(),
		async : false,
		error : function(request) {
			$("#dict_edit_title").html("<i class='fa fa-warning'></i>编辑数据字典失败");
            $("#dict_edit_body p").text("编辑数据字典失败");
            $("#dict_edit_btn1").attr("class", "btn btn-primary");
            $("#dict_edit_btn1").text("返回");
            $("#dict_edit_btn1").click(function() {
                $("#dict_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/system/dict");
            });
            $("#dict_edit_btn2").attr("class", "btn btn-default");
            $("#dict_edit_btn2").text("关闭");
            $("#dict_edit_btn2").click(function() {
                $("#dict_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#dict_edit_modal").modal();
		},
		success : function(data) {
			$("#dict_edit_title").html("编辑数据字典");
            $("#dict_edit_body p").text("编辑数据字典成功");
            $("#dict_edit_btn1").attr("class", "btn btn-primary");
            $("#dict_edit_btn1").text("返回");
            $("#dict_edit_btn1").click(function() {
                $("#dict_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
                getTarget("/system/dict");
            });
            $("#dict_edit_btn2").attr("class", "btn btn-default");
            $("#dict_edit_btn2").text("关闭");
            $("#dict_edit_btn2").click(function() {
                $("#dict_edit_modal").modal('hide');
                $('.modal-backdrop').remove();
            });
            $("#dict_edit_modal").modal();
		}
	});
}

//# sourceURL=edit.js
