var request_prefix = "/system/dict";
var dictMap;

function initDictType() {
	var html = "";
	$.ajax({
		url : request_prefix + '/type',
		success : function(data) {
			dictMap = {};
			var dictType = $("#dictType").val();

			var selected_type = "";

			html += '<option value="">--字典类型--</option>'
			for (var i = 0; i < data.length; i++) {
			    dictMap[data[i].dictType] = data[i].description;
				if (dictType == data[i].dictType) {
					html += '<option value="' + data[i].dictType + '" selected>' + data[i].dictType + '</option>';
					selected_type = data[i].dictType;
				} else {
					html += '<option value="' + data[i].dictType + '">' + data[i].dictType + '</option>'
				}
			}

			$("#dictType_").html(html);

            if (selected_type == "") {
			    $("#select2-dictType_-container").text("--字典类型--");
            } else {
                $("#select2-dictType_-container").text(selected_type);
            }

			$("#dictType_").on('change',function(){
			    dictType = $("#dictType_").val();
                $("#description").val(dictMap[dictType]);
            });

            if (dictType) {
                $("#description").val(dictMap[dictType]);
            }
		}
	});
}

function formValidate() {
    $('#dictForm').validate({
        ignore: [],
        errorClass: 'invalid',
        errorElement: 'em',
        highlight: function (element) {
            $(element).parent().removeClass('state-success').addClass("state-error");
            $(element).removeClass('valid');
        },
        unhighlight: function (element) {
            $(element).parent().removeClass("state-error").addClass('state-success');
            $(element).addClass('valid');
        },
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
            },
            sort : {
                required : true,
                digits : true
            }
        },
        messages : {
            dictName : {
                required : "&nbsp;&nbsp;请输入字典名"
            },
            dictValue : {
                required : "&nbsp;&nbsp;请输入字典值"
            },
            dictType : {
                required : "&nbsp;&nbsp;请输入字典类型"
            },
            description : {
                required : "&nbsp;&nbsp;请输入字典描述"
            },
            sort : {
                required : "&nbsp;&nbsp;请输入字典排序"
            }
        },
        submitHandler: function () {
            var dictId = $("#id").val();
            if (dictId) {
                update();
            } else {
                save();
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
}

function goBack() {
    getTarget(request_prefix);
}