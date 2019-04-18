$().ready(function() {

    $.fn.datepicker.dates['cn'] = {   //切换为中文显示
        days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        clear: "清除"
    };

    $('#birthday').datepicker({
        autoclose: true, //自动关闭
        beforeShowDay: $.noop,    //在显示日期之前调用的函数
        calendarWeeks: false,     //是否显示今年是第几周
        clearBtn: false,          //显示清除按钮
        daysOfWeekDisabled: [],   //星期几不可选
        endDate: Infinity,        //日历结束日期
        forceParse: true,         //是否强制转换不符合格式的字符串
        format: 'yyyy-mm-dd',     //日期格式
        keyboardNavigation: true, //是否显示箭头导航
        language: 'cn',           //语言
        minViewMode: 0,
        orientation: "auto",      //方向
        rtl: false,
        startDate: -Infinity,     //日历开始日期
        startView: 0,             //开始显示
        todayBtn: false,          //今天按钮
        todayHighlight: false,    //今天高亮
        weekStart: 0              //星期几是开始
    });

    $('#star').rating({
        language: 'zh',
        min: 0,
        max: 5,
        step: 1,
        stars: 5,
        starCaptions: {1: '就那样', 2: '可以听听', 3: '还不错', 4: '喜欢', 5: '超爱'}
    });

    loadDict();

    initFileUpload();

    $(".fileinput-remove-button").click(function() {
        $("#photo").val("");
    });


    var $singerForm = $("#singerForm").validate({
        errorClass		: errorClass,
        errorElement	: errorElement,
        highlight: function(element) {
            $(element).parent().removeClass('state-success').addClass("state-error");
            $(element).removeClass('valid');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("state-error").addClass('state-success');
            $(element).addClass('valid');
        },
        // Rules for form validation
        rules : {
            name : {
                required : true
            },
            enName : {
                required : true
            },
            region : {
                required : true
            },
            initial : {
                required : true
            },
            birthday : {
                required : true
            },
            type : {
                required : true
            },
            star : {
                required : true
            },
            photo : {
                required : true
            }
        },

        // Messages for form validation
        messages : {
            name : {
                required : ''
            },
            enName : {
                required : ''
            },
            region : {
                required : ''
            },
            initial : {
                required : ''
            },
            birthday : {
                required : ''
            },
            type : {
                required : ''
            },
            star : {
                required : ''
            },
            photo : {
                required : ''
            }
        },

        // Ajax form submition
        submitHandler : function(form) {
            $(form).ajaxSubmit({
                success : function() {
                    $("#comment-form").addClass('submited');
                }
            });
        },

        // Do not change code below
        errorPlacement : function(error, element) {
            error.insertAfter(element.parent());
        }
    });

});

function initFileUpload() {
    $("#img").fileinput({
        language : 'zh',
        uploadUrl : "/upload/music_singer",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#photo").val(res.msg);
        }
    });
}

function save() {
    // validate

	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/singer/save",
		data : $('#singerForm').serialize(),
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

function loadDict() {
    load_singer_dict("singer_initial");
    load_singer_dict("singer_region");
    load_singer_dict("singer_type");
}

function load_singer_dict(dict_type) {
    var html = "";
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
            //加载数据
            if ("singer_initial" == dict_type) {
                html += '<option value="">请选择歌手首字母</option>'
            } else if ("singer_region" == dict_type) {
                html += '<option value="">请选择歌手所在地区</option>'
            } else if ("singer_type" == dict_type) {
                html += '<option value="">请选择歌手类型</option>'
            }
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
            }
            $("#"+dict_type).html(html);
        }
    });
}

function goBack(target) {
    getTarget(target);
}
