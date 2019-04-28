var request_prefix = "/system/dict";

$().ready(function() {

    var title = "<li>系统管理</li><li>数据字典</li><li>编辑数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span><span>>&nbsp;编辑数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

    initDictType();
	formValidate();
});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : request_prefix + "/update",
		data : $('#dictForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			// TODO
		},
		success : function(data) {
			// TODO
		}
	});
}
