function formValidate() {
    $('#deptForm').validate({
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
			deptName : {
				required : true
			}
		},
		messages : {
			deptName : {
				required : "&nbsp;&nbsp;请输入部门名称"
			}
		},
		submitHandler: function () {
			var deptId = $("#id").val();
			if (deptId) {
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

//# sourceURL=deptEdit.js
