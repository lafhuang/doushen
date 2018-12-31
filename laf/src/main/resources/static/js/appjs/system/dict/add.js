var dictMap;
var request_prefix = "/system/dict";

$().ready(function() {
    loadType();
	validateRule();
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

            initType();
		}
	});
}

function initType() {
    var type = $("#dictType").val();
    if ("" != type) {
        $("#dictType").val(type);
        $("#description").val(dictMap[type]);
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