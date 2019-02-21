$().ready(function() {

    laydate.render({
        elem: '#releaseDate'
        ,theme: 'molv'
    });

    initFileUpload();

    $('.summernote').summernote({
        height : '250px',
        lang : 'zh-CN',
        callbacks: {
            onImageUpload: function(files) {
                sendFile(files);
            }
        }
    });

    loadDict();

    validateRule();
});

function initFileUpload() {
    $("#img").fileinput({
        language : 'zh',
        uploadUrl : "/upload/video_movie",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#poster").val(res.msg);
        }
    });
}

function loadDict() {
    load_movie_dict("video_medium");
    load_movie_dict("video_encode");
    load_movie_dict("video_audioEncode");
    load_movie_dict("video_definition");
    load_movie_dict("video_region");
    load_movie_dict("movie_type");
    load_movie_dict("video_language");
}

function load_movie_dict(dict_type) {
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
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
            }

            $("#"+dict_type).html(html);
            $("#"+dict_type).selectpicker();
        }
    });
}

$.validator.setDefaults({
    submitHandler : function() {
        save();
    }
});

function save() {

    $("#discribe").val($(".note-editable").html());

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/video/movie/save",
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
        ignore : [],
        rules : {
            name : {
                required : true
            },
            sourceName : {
                required : true
            },
            poster : {
                required : true
            },
            size : {
                required : true,
                number : true
            },
            medium : {
                required : true
            },
            encode : {
                required : true
            },
            audioEncode : {
                required : true
            },
            definition : {
                required : true
            },
            releaseDate : {
                required : true,
                digits : true
            }
            /*,
            region : {
                required : true
            },
            movieType : {
                required : true
            },
            language : {
                required : true
            }*/,
            length : {
                required : true,
                digits : true
            }
        },
        messages : {
            name : {
                required : icon + "请输入片名"
            },
            sourceName : {
                required : icon + "请输入源文件名"
            },
            poster : {
                required : icon + "请上传海报"
            },
            size : {
                required : icon + "请输入文件大小"
            },
            medium : {
                required : icon + "请选择媒介"
            },
            encode : {
                required : icon + "请选择编码"
            },
            audioEncode : {
                required : icon + "请选择音频编码"
            },
            definition : {
                required : icon + "请选择分辨率"
            },
            releaseDate : {
                required : icon + "请输入上映日期"
            }
            /*,
            region : {
                required : icon + "请选择地区"
            },
            movieType : {
                required : icon + "请选择类别"
            },
            language : {
                required : icon + "请选择语言"
            }*/,
            length : {
                required : icon + "请输入时长"
            }
        }
    })
}