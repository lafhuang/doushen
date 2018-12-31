var request_prefix = "/system/dict";

$().ready(function() {
    loadType();
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});

function loadType() {
	var html = "";
	$.ajax({
		url : request_prefix + '/type',
		success : function(data) {

			dictMap = {};

			//加载数据
			for (var i = 0; i < data.length; i++) {
			    dictMap[data[i].dictType] = data[i].description;
				html += '<option value="' + data[i].dictType + '">' + data[i].dictType + ' - ' + data[i].description + '</option>'
			}
			$("#dictType").append(html);

			$("#dictType").editableSelect({
			    effects: 'fade'
			}).on('select.editable-select', function (e, li) {
			    var dictText = li.text();
			    if ("选择类别" == dictText) {
			        $("#dictType").val("");
                    $("#description").val("");
			        return;
			    }
			    var dictType = dictText.split(" - ");
			    $("#dictType").val(dictType[0]);
			    $("#description").val(dictType[1]);
            });

			//点击事件
			$("#dictType").on('input propertychange', function() {
			    var type = $.trim($(this).val());
                $(this).val(type);

                var description = dictMap[type];
                if (description) {
                    $("#description").val(description);
                } else {
                    $("#description").val("");
                }
            });

		}
	});
}

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : request_prefix + "/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
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
			}
		},
		messages : {
			name : {
				required : icon + "请输入名字"
			}
		}
	})
}