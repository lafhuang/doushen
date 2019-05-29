var request_prefix = "/system/dict";

$().ready(function() {
    var title = "<li>系统管理</li><li>数据字典</li><li>添加数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span><span>>&nbsp;添加数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

	initDictType();
	formValidate();

	initSelect();
});

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : request_prefix + "/save",
		data : $('#dictForm').serialize(),
		async : false,
		error : function() {
		    var title = "<i class='fa fa-warning'></i>添加数据字典失败";
            var msg = "添加数据字典失败";
            var btn1Text = "关闭";
            var btn1Class = "btn btn-default";
            var btn1Url = "close";
            var btn2Text = "返回";
            var btn2Class = "btn btn-primary";
            var btn2Url = "/system/dict";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		},
		success : function(data) {
		    var title = "添加数据字典";
            var msg = "添加数据字典成功";
            var btn1Text = "返回";
            var btn1Class = "btn btn-default";
            var btn1Url = "/system/dict";
            var btn2Text = "继续添加";
            var btn2Class = "btn btn-primary";
            var btn2Url = "/system/dict/add";
            showDialog(title, msg, btn1Text, btn1Class, btn1Class, btn2Text, btn2Class, btn2Url);
		}
	});
}

//# sourceURL=add.js
