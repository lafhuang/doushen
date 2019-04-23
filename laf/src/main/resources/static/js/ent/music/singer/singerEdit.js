function initFileInput() {
    $("#img").fileinput({
        language: 'zh',
        uploadUrl: "/upload/music_singer",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function (e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#photo").val(res.msg);
        }
    });
}

function initDatepicker() {
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
}

function initStar() {
    $('#star').rating({
        language: 'zh',
        min: 0,
        max: 6,
        step: 1,
        stars: 6,
        starCaptions: {1: '无所谓', 2: '随便听听', 3: '还不错', 4: '喜欢', 5: '超爱', 6 : '偶像'}
    });
}

function initDict() {
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
            var singer_region = $("#singer_region_").val();
            var singer_initial = $("#singer_initial_").val();
            var singer_type = $("#singer_type_").val();

            if (singer_region || singer_initial || singer_type) {
                if ("singer_initial" == dict_type) {
                    html += '<option>--歌手首字母--</option>'
                } else if ("singer_region" == dict_type) {
                    html += '<option>--歌手所在地区--</option>'
                } else if ("singer_type" == dict_type) {
                    html += '<option>--歌手类型--</option>'
                }
            } else {
                if ("singer_initial" == dict_type) {
                    html += '<option selected="">--歌手首字母--</option>'
                } else if ("singer_region" == dict_type) {
                    html += '<option selected="">--歌手所在地区--</option>'
                } else if ("singer_type" == dict_type) {
                    html += '<option selected="">--歌手类型--</option>'
                }
            }

            for (var i = 0; i < result.length; i++) {
                if (result[i].dictValue == singer_region || result[i].dictValue == singer_initial || result[i].dictValue == singer_type) {
                    html += '<option value="' + result[i].dictValue + '" selected>' + result[i].dictName + '</option>'
                } else {
                    html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
                }
            }
            $("#"+dict_type).html(html);
        }
    });
}

function formValidate() {
    $('#singerForm').validate({
        ignore: [],
        errorClass: 'invalid',
        errorElement: 'em',
        highlight: function (element) {
            if ("star" == $(element).attr("name")) {
                $(element).parent().parent().parent().removeClass('state-success').addClass("state-error");
                $(element).removeClass('valid');
            } else {
                $(element).parent().removeClass('state-success').addClass("state-error");
                $(element).removeClass('valid');
            }
        },
        unhighlight: function (element) {
            if ("star" == $(element).attr("name")) {
                $(element).parent().parent().parent().removeClass("state-error").addClass('state-success');
                $(element).addClass('valid');
            } else {
                $(element).parent().removeClass("state-error").addClass('state-success');
                $(element).addClass('valid');
            }
        },
        rules: {
            name: {
                required: true
            },
            enName: {
                required: true
            },
            region: {
                required: true
            },
            initial: {
                required: true
            },
            birthday: {
                required: true
            },
            type: {
                required: true
            },
            star: {
                required: true
            },
            photo: {
                required: true
            }
        },
        messages: {
            name: {
                required: '请输入歌手姓名'
            },
            enName: {
                required: '请输入歌手英文名'
            },
            region: {
                required: '请选择歌手所在地区'
            },
            initial: {
                required: '请选择歌手首字母'
            },
            birthday: {
                required: '请选择歌手出生日期'
            },
            type: {
                required: '请选择歌手类型'
            },
            star: {
                required: '请选择歌手星级'
            },
            photo: {
                required: '请上传歌手图片'
            }
        },
        submitHandler: function () {
            var singerId = $("#id").val();
            if (singerId) {
                update();
            } else {
                save();
            }
        },
        errorPlacement: function (error, element) {
            if ("star" == element.attr("name")) {
                error.insertAfter(element.parent().parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });
}

function goBack() {
    getTarget('/ent/music/singer');
}

//# sourceURL=singerEdit.js
