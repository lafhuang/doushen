function initEditor() {
    var lyrics = $("#lyrics").val();
    $('.summernote').html(lyrics);

    $('.summernote').summernote({
        height : 300,
        lang : 'zh-CN',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['view', ['codeview']]
        ]
    });
}

function initSinger() {
    var data = {};
    $.ajax({
        type: 'post',
        url : "/ent/music/singer/list",
        data: JSON.stringify(data),
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(data) {
            var html = "<option value=''>--歌手--</option>";
            var singer = $("#song_singer").val();
            for (var i = 0; i < data.length; i++) {
                if (singer == data[i].id) {
                    html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>';
                } else {
                    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                }
            }
            $("#singer").html(html);

            $("#singer").on('change',function(){
                $("#song_album").val("");
                initAlbum();
            });
        }
    });
}

function initAlbum() {
    var singerId = $("#singer").val();
    if (!singerId || '' == singerId) {
        $("#albumId").html("<option value=''>--专辑--</option>");
        return;
    }

    var data = {
        "offset" : 0,
        "limit" : 1000,
        "singerId" : singerId
    };

    $.ajax({
        type: 'get',
        url : "/ent/music/album/list",
        data: data,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            var html = "<option value=''>--专辑--</option>";
            var data = result.rows;
            var album = $("#song_album").val();

            for (var i = 0; i < data.length; i++) {
                if (album == data[i].id) {
                    html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>';
                } else {
                    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                }
            }

            $("#albumId").html(html);
        }
    });

}

function initDict() {
    load_song_dict("album_language");
    load_song_dict("audio_type");
}

function load_song_dict(dict_type) {
    var html = "";
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            if ("album_language" == dict_type) {
                html += "<option value=''>--语言--</option>";;
            } else {
                html += "<option value=''>--格式--</option>";;
            }
            var album_language_ = $("#album_language_").val();
            var audio_type_ = $("#audio_type_").val();

            for (var i = 0; i < result.length; i++) {
                if (album_language_ == result[i].dictValue || audio_type_ == result[i].dictValue) {
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
    $('#songForm').validate({
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
            name : {
                required : true
            },
            albumId : {
                required : true
            },
            trackNumber : {
                required : true,
                digits : true
            },
            language : {
                required : true,
            },
            length : {
                required : true
            },
            size : {
                required : true,
                number : true
            },
            audioType : {
                required : true
            }
        },
        messages : {
            name : {
                required : "&nbsp;&nbsp;请输入歌曲名"
            },
            albumId : {
                required : "&nbsp;&nbsp;请选择所属专辑"
            },
            trackNumber : {
                required : "&nbsp;&nbsp;请输入音轨号"
            },
            language : {
                required : "&nbsp;&nbsp;请选择歌曲语言"
            },
            length : {
                required : "&nbsp;&nbsp;请输入歌曲时长"
            },
            size : {
                required : "&nbsp;&nbsp;请输入文件大小"
            },
            audioType : {
                required : "&nbsp;&nbsp;请选择音频格式"
            }
        },
        submitHandler: function () {
            var songId = $("#id").val();
            if (songId) {
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
    getTarget("/ent/music/song");
}

//# sourceURL=songEdit.js
