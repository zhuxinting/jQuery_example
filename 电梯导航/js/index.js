$(function(){
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var flag = true;
    // 1、隐藏电梯导航
     var toolTop = $(".recommend").offset().top;
     toggleTool();

     function toggleTool() {
        if($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        }else {
           $(".fixedtool").fadeOut();
        }
     }

     $(window).scroll(function(){
        toggleTool();

        // 3、页面滚动到某个内容区域， 左侧电梯导航小li相应添加和删除 current 类名
        
        if(flag) {
            $(".floor .w").each(function(i, ele) {
                // 判断被卷去的头部是否 大于等于 内容区域每一个模块的offset().top
                if($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass('current')
                }
            })
        }
     })

    //  2、点击电梯导航页面 可以滚动到相应内容区域
    $(".fixedtool li").click(function(){
        flag = false;
        // 点击小li ，计算去到对应的的页面的位置， 计算它的offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面滚动的效果
        $("body, html").stop().animate({
            scrollTop: current
        },function(){
            flag = true;
        })
        $(this).addClass("current").siblings().removeClass('current')
    })
})
