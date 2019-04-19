var dictMap;
var request_prefix = "/system/dict";

$().ready(function() {
	var dictType = $("#dictType").val();
	if (dictType) {
		loadType(dictType);
	}
	validateRule();
});

function loadType(dictType) {
	var html = "";
	$.ajax({
		url : request_prefix + '/type',
		success : function(data) {

			dictMap = {};

			//加载数据
			for (var i = 0; i < data.length; i++) {
			    dictMap[data[i].dictType] = data[i].description;
				if (dictType == data[i].dictType) {
					html += '<option value="' + data[i].dictType + '" selected>' + data[i].dictType + '</option>'
				} else {
					html += '<option value="' + data[i].dictType + '">' + data[i].dictType + '</option>'
				}
			}

			$("#dictType_1").html(html);
			$("#dictType_1").selectpicker().on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
				var type = $("#dictType_1").val();

				$("#dictType").val(type);

				var description = dictMap[type];
				if (description) {
					$("#description").val(description);
				} else {
					$("#description").val("");
				}
			});

            initType(dictType);
		}
	});
}

function initType(dictType) {
    if ("" != dictType) {
        $("#dictType_1").val(dictType);
        $("#description").val(dictMap[dictType]);
    }
}

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : request_prefix + "/save",
		data : $('#signupForm').serialize(), // 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("网络超时");
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
			dictName : {
				required : true
			},
			dictValue : {
			    required : true
			},
			dictType : {
			    required : true
            },
			description : {
			    required : true
            }
        },
		messages : {
			dictName : {
				required : icon + "请输入字典名"
			},
			dictValue : {
			    required : icon + "请输入字典值"
			},
			dictType : {
			    required : icon + "请输入字典类型"
			},
			description : {
			    required : icon + "请输入字典描述"
			}
		}
	})
}