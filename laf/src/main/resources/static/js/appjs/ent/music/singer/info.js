var request_prefix = "/ent/music/singer"

function edit(id) {
    var id = $("#id").val();
	layer.open({
		type : 2,
		title : '修改歌手信息',
		maxmin : true,
		shadeClose : false,
		area : [ '60%', '60%' ],
		content : request_prefix + '/edit/' + id // iframe的url
	});
}

function reLoad() {
	window.location.reload();
}