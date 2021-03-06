$(function(){
    // 1、全选 全不选功能模块
    // 就是把全选按钮(checkall)的状态赋值给 三个小的按钮(j-checkbox)就可以了
    $(".checkall").change(function(){
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));

        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item")
        }else{
            $(".cart-item").removeClass("check-cart-item")
        }
    })

    // 2、如果小复选框被选中的个数等于 小复选框的总数 ，把全部按钮选上，否则全不选
    $(".j-checkbox").change(function(){
        if($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        }else{
            $(".checkall").prop("checked", false);
        }

        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })

    // 3、增减商品数量模块，首先声明一个变量，点击+(increment)，就让这个值++
    $(".increment").click(function(){
        // 获取当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings().val(n);

        // 4、计算小计模块 根据文本框的值 乘以 当前商品的价格 就是商品小计
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1)
        var price = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })
    $(".decrement").click(function(){
        // 获取当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if(n == 1){
            return false
        }
        n--;
        $(this).siblings().val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1)
        var price = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })

    // 5、用户修改文本框的值 计算 小计模块
    $(".itxt").change(function(){
        // 先得到文本框里面的值，乘以 当前商品的单价
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1)
        var price = (p * n).toFixed(2)
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })

    // 6、总计模块和总额模块
    getSum();
    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function(i, ele){
            count += parseInt($(ele).val());
        })
        $(".amount-sum em").text(count)
        $(".p-sum").each(function(i, ele){
            money += parseFloat($(ele).text().substr(1))
        })
        $(".price-sum em").text("￥"+money.toFixed(2))
    }

    // 7、删除商品模块
    // （1）商品后面的删除按钮
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // （2）删除选中的商品
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // （3）清空购物车
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    })
})