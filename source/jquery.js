$(document).ready(function() { 
//html문서가 다 로드된 뒤에 실행하라. 여기에 모든 jquery 코드(실행 시점에 필요한 코드)작성!
    var i=0; //전역변수, 여러 이벤트 함수에서 공유 가능
    $("div.out").mouseover(function(){
        $("div.out p:first").text("mouse over"); //.text("ㅇ");해당 요소 안의 텍스트가 바뀜. 
        $("div.out p:last").text(++i); 
        //만약 var i가 이 함수 내부에 선언되어있다면, 
        //이벤트함수가 호출될 때마다 i=0부터 다시 시작돼서 항상 1만 출력됨. 
    });

    $("div.out").mouseout(function(){
        $("div.out p:first").text("mouse out");
    });

    $("#b1").on("click",
        {url: "http://www.google.com",
            winattributes: "resize=1, scrollbars=1, status=1"}, max_open);

    $("#bind").click(function(){
        $("body")
        .on("click", "#theone", flash)
        .find("#theone")
        .text("Can Click!");
    });

    $("#unbind").click(function(){
        $("body")
        .off("click", "#theone", flash)
        .find("#theone")
        .text("Does nothing...");
    });

    $("#trigger_test button:first").click(function(){
        update($("#trigger_test span:first"));
    });

    $("#trigger_test button:last").click(function(){
        $("#trigger_test button:first").trigger("click");
        update($("#trigger_test span:last"));
    });

    $("#image").click(function() {
        let current = $(this).attr("src");
        let next = (current.includes("karina.jpg")) ? "karina2.jpg" : "karina.jpg";
        $(this).attr("src", next);
    });

    var imgArray = ["jae1.jpg", "jae2.jpg", "jae3.jpg", "jae4.jpg", "jae5.jpg"];
    var albumIndex = 0;

    $("#imgAlbum").attr("src", imgArray[albumIndex]);
    $("#imgAlbum").click(function(){
        albumIndex = (albumIndex + 1) % imgArray.length;
        $("#imgAlbum").attr("src", imgArray[albumIndex]);
    });

    $(".main-menu").mouseover(function(){
        var menu=$(this);
        menu.css({"background-color":"green", "font-size":"20px"});
    });
    $(".main-menu").mouseout(function(){
        var menu=$(this);
        menu.css({"background":"none", "font-size":"1em"});
    });


    // $("#add_img").click(function(){
    //  $("#note_form").css({"display":"block"});
    // });

    // $("#add_note").click(function(){
    //  $("note").append($("#note_title").val());
    // });
    $("#add_img img").on("click", show_note_form);
    $("#add_note").on("click", push_note);
    $(window).resize(function(){
        change_position($(".popup"));
    });

    $("#moving_button").click(function(){
        if($("#animation_test").width()-50 > $("#moving_box").width()){
            $("#moving_box").animate({right:'0px', width:'+=50px', height:'+=50px'});           
            $("#animation_test").animate({height:'+=50px'});
        }
    });

    // $(".accordion").each(function(){
    //  var dl=$(this);
    //  var alldd = dl.find("dd");
    //  var alldt = dl.find("dt");
    //  alldd.hide();
    //  alldt.css("cursor","pointer");
    //  alldt.click(function(){
    //      alldd.hide();
    //      var dt = $(this);
    //      var dd = dt.next();
    //      dd.show();
    //      alldt.css("cursor","pointer");
    //      dt.css("cursor", "default");
    //  });
    // });

    $(".accordion").each(function (){
        var dl = $(this);
        var allDt = dl.find('dt');
        var allDd = dl.find("dd");
        function closeAll(){
            allDd.addClass("closed");
            allDt.addClass("closed");
        }
        function open(dt,dd){
            dt.removeClass("closed");
            dd.removeClass("closed");
        }
        closeAll();
        allDt.click(function(){
            var dt = $(this);
            var dd = dt.next();
            closeAll();
            open(dt, dd);
        })
    });

    // $("dt").addClass("closed");
    // $("dd").addClass("closed");

    var interval=4000;
    $('.slideshow').each(function(){
        var timer;
        var container = $(this);
        function switchImg(){
            var imgs = container.find("img");
            var first = imgs.eq(0);
            var second = imgs.eq(1);
            // container.append(first);
            // first.fadeOut("slow");
            first.appendTo(container).fadeOut(2000);
            second.fadeIn();
        }
        // setInterval(switchImg, interval);
        function startTimer(){
            timer = setInterval(switchImg, interval);
        }
        function stopTimer(){
            clearInterval(timer);
        }
        container.hover(stopTimer, startTimer);
        startTimer();
    });

    $("#getText1").on("click", function(){
        $("#textbox").text("글자 입력 테스트");
        //txt, json
        // var req = $.ajax("data.json"); //data.txt
        //다른 방법
        var req = $.ajax({   //결과가 변수 req에 반영
            url: "data.txt", //data.txt 파일에 
            dataType: "json" //json형식으로 해석하라고 요청
        });
        req.done(function(data, status){
            //txt
            // var students = JSON.parse(data);
            // for(var i=0; i<students.length; i++){
            //  var str = "<br>"+students[i].name;
            //  $("#textbox").append(str);
            // }
            //json, 다른 방법
            for(var i=0; i<data.length; i++){
                var str = "<br>"+data[i].name;
                $("#textbox").append(str);
            }
        });
    });

    $("#getText2").on("click", function(){
        var req = $.ajax({
            url: "data.txt",
            dataType: "json"
        });
        req.done(function(data, status){     
            var tb = $("<table/>");
            var row = $("<tr/>").append(
                $("<th/>").text("이름"),
                $("<th/>").text("아이디"),
                $("<th/>").text("학과"),
                $("<th/>").text("수강과목")
            );
            tb.append(row);

            for(var i=0; i<data.length; i++){
                var name = data[i].name;
                var id = data[i].id;
                var dept = data[i].department;
                var cls = data[i].class;
                var sub ='';
                for(var j=0; j<cls.length;j++){
                    if(j<(cls.length-1)) sub += cls[j]+',';
                    else sub += cls[j];
                }
                var phone = data[i].phone;

                var row = $("<tr/>").append(
                    $("<td/>").text(name),
                    $("<td/>").text(id),
                    $("<td/>").text(dept),
                    $("<td/>").text(sub)
                );
                tb.append(row);
            }   
            $("#textbox").html(tb);
        });
        
    });

    var req = $.ajax({
        url:"/rss",
        dataType: "xml"});

        req.done(function(data){
            var items = $(data).find("item");
            if(items.length > 0){
                items = items.slice(0,5);
                var uTag = $("<ul/>");
                items.each(function(){
                    var item = $(this);
                    var lk = item.find("link").text();
                    var title = item.find("title").text();
                    var aTag = $("<a/>")
                    .attr({
                        "href":lk,
                        "target":"_blank"
                    })
                    .text(title);
                    var liTag = $("<li/>")
                    .append(aTag);
                    uTag.append(liTag);
                });
                $("#news").html(uTag);
            }
        });
        // req.done(function(data){
        //  console.log(data);
        // });
        req.fail(function (jqXHR, textStatus){
            alert("failed: " + textStatus);
        });

});
//
//함수 정의는 $(document).ready() 밖에 있어도 문제 없다. 
function max_open(event){
    var maxwindow = window.open(event.data.url, "", event.data.winattributes);
    maxwindow.moveTo(0, 0);
    maxwindow.resizeTo(screen.availWidth, screen.availHeight);
}

function flash(){
    $("#off_test").show().fadeOut("slow");
}

function update(j){
    var n = parseInt(j.text(), 10);
    j.text(n+1);
}

function show_note_form(){
    $("#note_form").addClass("popup");
    change_position($(".popup")); //top 및 left 속성 변경
    $("#note_form").show("slow").slideDown("slow");
    $("#note_form").css("display","block");
    //$("#note_form").show();
}

function change_position(obj){
    var l = ($(window).width() - obj.width())/2;
    var t = ($(window).height() - obj.height())/2;
    obj.css({top:t, left:l});
}

function push_note(){
    var title=$("#note_title").val();
    var date = $("#note_date").val();
    var content = $("#note_content").val();
    var str="<p>" + title + "<br>" + date + "<br>" + content + "</p><br>";
    $("#note_form").fadeOut("slow");
    // $("#note_form").css("display","none");
    //$("#note_form").hide();
    $("#note").append(str);
}