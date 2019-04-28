var request_prefix = "/system/dict";

$().ready(function() {
    var title = "<li>系统管理</li><li>数据字典</li><li>添加数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span><span>>&nbsp;添加数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

	initDictType(dictType);
	formValidate();
});

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : request_prefix + "/save",
		data : $('#dictForm').serialize(),
		async : false,
		error : function(request) {
			// TODO
		},
		success : function(data) {
			// TODO
		}
	});
}
