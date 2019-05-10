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
		data : $('#dictForm').serialize(),
		async : false,
		error : function(request) {
			$("#doudou_modal_title").text("添加数据字典");
			$("#doudou_modal_body p").text("添加数据字典失败");

			var btn = "<button type='button' class='btn btn-danger' id='close_Btn'><i class='fa fa-trash-o'></i>&nbsp; 关闭</button>" +
				"<button type='button' class='btn btn-default' id='backBtn'><i class='fa fa-times'></i>&nbsp; 返回</button>";

			$("#doudou_modal_footer").html(btn);

			$("#doudou_modal").modal();

			$("#close_Btn").click(function () {
				$("#closeBtn").click();
			});

			$("#backBtn").click(function () {
				$("#closeBtn").click();
				getTarget(request_prefix);
			});
		},
		success : function(data) {
			$("#doudou_modal_title").text("添加数据字典");
			$("#doudou_modal_body p").text("添加数据字典失败");

			var btn = "<button type='button' class='btn btn-danger' id='close_Btn'><i class='fa fa-trash-o'></i>&nbsp; 关闭</button>" +
				"<button type='button' class='btn btn-default' id='backBtn'><i class='fa fa-times'></i>&nbsp; 返回</button>";

			$("#doudou_modal_footer").html(btn);

			$("#doudou_modal").modal();

			$("#close_Btn").click(function () {
				$("#closeBtn").click();
			});

			$("#backBtn").click(function () {
				$("#closeBtn").click();
				getTarget(request_prefix);
			});
		}
	});
}
