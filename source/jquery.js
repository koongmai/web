var i = 0;

function handleClick() {
    alert("Clicked!");
}

$(document).ready(function () {
    // 초기 설정: 노트 입력 폼 숨기기
    $("#note_form").hide();

    // div.out 마우스 이벤트 처리
    $("div.out")
        .mouseover(function () {
            $(this).find("p:first").text("mouse over");
            $(this).find("p:last").text(++i);
        })
        .mouseout(function () {
            $(this).find("p:first").text("mouse out");
        });

    // 버튼 클릭 시 새 창 열기
    $("#b1").on("click",
        {
            url: "http://www.google.com",
            winattributes: "resize=1, scrollbars=1, status=1"
        },
        max_open
    );

    function max_open(event) {
        var maxwindow = window.open(event.data.url, "", event.data.winattributes);
        maxwindow.moveTo(0, 0);
        maxwindow.resizeTo(screen.availWidth, screen.availHeight);
    }

    // 버튼 클릭 생겼다가 지웠다가
    $("#bind").click(function () {
        $("#theone").on("click", handleClick);
    });

    $("#unbind").click(function () {
        $("#theone").off("click", handleClick);
    });

    // 실습3 - 버튼 클릭 횟수
    $("#trigger_test button:first").on("click", function () {
        let count = parseInt($("#trigger_test span:first").text());
        $("#trigger_test span:first").text(count + 1);
    });

    $("#trigger_test button:eq(1)").on("click", function () {
        let count = parseInt($("#trigger_test span:eq(1)").text());
        $("#trigger_test span:eq(1)").text(count + 1);

        $("#trigger_test button:first").trigger("click");
    });

    // 이미지 토글
    $("#image").on("click", function () {
        if ($(this).attr("data-state") === "1") {
            $(this).attr("src", "karina2.jpg");
            $(this).attr("data-state", "2");
        } else {
            $(this).attr("src", "karina.jpg");
            $(this).attr("data-state", "1");
        }
    });

    // 사진 앨범 이미지 변경
    var imgArray = ["jae1.jpg", "jae2.jpg", "jae3.jpg", "jae4.jpg", "jae5.jpg"];
    var albumIndex = 0;
    $("#imgAlbum").attr("src", imgArray[albumIndex]);
    $("#imgAlbum").click(function () {
        albumIndex = (albumIndex + 1) % imgArray.length;
        $("#imgAlbum").attr("src", imgArray[albumIndex]);
    });

    // 메뉴 스타일 변경
    $(".main-menu").mouseover(function () {
        $(this).css({
            "font-size": "20px",
            "background-color": "green"
        });
    });

    $(".main-menu").mouseout(function () {
        $(this).css({
            "font-size": "",
            "background-color": ""
        });
    });

    // 플러스 이미지 클릭 시 note_form 보이기
    $("#add_img").click(function () {
        $("#note_form").addClass("popup").show();
        $(this).hide();
    });

    // 확인 버튼 클릭 시 note에 내용 추가
    $("#add_note").click(function () {
        const title = $("#note_title").val();
        const date = $("#note_date").val();
        const content = $("#note_content").val();

        const noteHtml = `
            <div class="note_item" style="border:1px solid #ccc; margin:10px; padding:10px;">
                <h3>${title}</h3>
                <p><strong>${date}</strong></p>
                <p>${content.replace(/\n/g, "<br>")}</p>
            </div>
        `;

        $("#note").append(noteHtml);
        $("#note_title").val("");
        $("#note_date").val("");
        $("#note_content").val("");
        $("#note_form").fadeOut(1000, function() {
            $("#add_img").show();
        });
    });

    function show_note_form() {
        $("#note_form").addClass("popup");
        change_position($(".popup"));
        $("#note_form").fadeIn(5000);
    }

    function change_position(obj){
        var l=($(window).width()-obj.width())/2;
        var t=($(window).height()-obj.height())/2;
        obj.css({top:t, left:l})
    }

    function centerNoteForm() {
        const $popup = $("#note_form");

        if ($popup.is(":visible")) {
            const winWidth = $(window).width();
            const winHeight = $(window).height();
            const popupWidth = $popup.outerWidth();
            const popupHeight = $popup.outerHeight();

            const left = (winWidth - popupWidth) / 2;
            const top = (winHeight - popupHeight) / 2;

            $popup.css({ top: top + "px", left: left + "px" });
        }
    }

    $(window).on("resize", centerNoteForm);  // 창 크기 바뀔 때 위치 재조정

    $("#moving_button").click(function() {
        if($("#moving_box").width() <= $("#animation_test").width() - 30) {
            $("#moving_box").animate({
                right: '0px',
                height: '+=50px',
                width: '+=50px'
            });

            $("#animation_test").animate({
                height: '+=50px'
            });
        }
    });
    $(".accordion").each(function () {
        const dl = $(this);
        const allDt = dl.find("dt");
        const allDd = dl.find("dd");

        function closeAll() {
            allDd.addClass("closed");
            allDt.addClass("closed");
        }

        function open(dt, dd) {
            dt.removeClass("closed");
            dd.removeClass("closed");
        }

        closeAll();

        allDt.on("click", function () {
            const dt = $(this);
            const dd = dt.next("dd");
            closeAll();
            open(dt, dd);
        });
    });

    // 슬라이드쇼 기능
    $(".slideshow").each(function () {
        const container = $(this);
        const imgs = container.find("img").hide().eq(0).show();
        const interval = 3000;
        let timer;

        function switchImg() {
            const first = container.find("img").eq(0);
            const second = container.find("img").eq(1);

            first.fadeOut(1000, function () {
                first.appendTo(container);
            });
            second.fadeIn(1000);
        }

        function startTimer() {
            timer = setInterval(switchImg, interval);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        container.hover(stopTimer, startTimer);
        startTimer();
    });
});

$(document).ready(function(){
    $("#getText1").on("click", function(){
        $("#textbox").text("글자 입력 테스트");
        var req =$.ajax("data.json");
        req.done(function(data, status){
            var tb =$("<table/>");
            var row = $("<tr/>").append(
                $("<th/>").text("이름"),
                $("<th/>").text("아이디"),
                $("<th/>").text("학과"),
                $("<th/>").text("수강과목")

            );
            tb.append(row);


            //var students = JSON.parse(data);
            for (var i=0;i<data.length;i++)
            {
                var name =data[i].name;
                var id =data[i].id;
                var dept= data[i].department;
                var cls =data[i].class;
                var sub='';
                for(var j=0; j<cls.length; j++){
                    if(j<(cls.length-1)) sub +=cls[j]+',';
                    else sub+=cls[j];
                }
                var phone = data[i].phone;
                var row =$("<tr/>").append(
                    $("<td/>").text(name),
                    $("<td/>").text(id),
                    $("<td/>").text(dept),
                    $("<td/>").text(sub)
                    );
                tb.append(row);}
                $("#textbox").html(tb);
            
        });
    });
});