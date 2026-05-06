$(document).ready(function(){


    $(".toggle").click(function(){
        var id = $(this).data("id");
        $("#" + id).toggle();
    });

    $("#orderForm").submit(function(e){
        e.preventDefault();

        let name = $("#name").val().trim();
        let nid = $("#nid").val().trim();
        let dob = $("#dob").val().trim();
        let mobile = $("#mobile").val().trim();
        let email = $("#email").val().trim();

        // الرقم الوطني فقط إجباري
        if(nid === ""){
            alert("الرقم الوطني مطلوب");
            return;
        }

        // الاسم (إذا تم إدخاله)
        if(name !== "" && !/^[\u0600-\u06FF\s]+$/.test(name)){
            alert("الاسم يجب أن يحتوي على أحرف عربية فقط");
            return;
        }

        // الرقم الوطني 11 خانة وأول خانتين من 01 إلى 14
        if(!/^(0[1-9]|1[0-4])\d{9}$/.test(nid)){
            alert("الرقم الوطني غير صحيح");
            return;
        }

        // تاريخ الولادة (إذا تم إدخاله)
        if(dob !== "" && !/^\d{2}-\d{2}-\d{4}$/.test(dob)){
            alert("تاريخ الولادة غير صحيح");
            return;
        }

        // الموبايل (إذا تم إدخاله)
        if(mobile !== "" && !/^09\d{8}$/.test(mobile)){
            alert("رقم الموبايل غير صحيح");
            return;
        }

        // الإيميل (إذا تم إدخاله)
        if(email !== "" && !/^\S+@\S+\.\S+$/.test(email)){
            alert("الإيميل غير صحيح");
            return;
        }

        let total = 0;
        let items = "";

        $(".meal:checked").each(function(){
            total += parseInt($(this).data("price"));
            items += $(this).data("name") + "\n";
        });

        if(items === ""){
            alert("يرجى اختيار وجبة واحدة على الأقل");
            return;
        }

        let final = total - (total * 0.05);

        let result = window.open("", "_blank");

        result.document.write(
            "<h2>الوجبات المختارة</h2>" +
            "<pre>" + items + "</pre>" +
            "<h3>المبلغ النهائي بعد الحسم 5%: " + final + " ل.س</h3>"
        );
    });

});