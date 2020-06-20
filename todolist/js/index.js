$(
    function () {
        var toList = {
            //初始化方法
            init: function () {
                this.cacheElement()
                this.bindEvent()
               
            },
            //缓存元素
            cacheElement: function () {
                this.$ipt = $('.ipt');
                this.$add = $('.add');
                this.$todolist = $('.todolist');
                this.$all = $('.all');
                this.$done = $('.done');
                this.$removes = $('.removes');
                this.$donelist = $('.donelist');
            },
            //绑定事件
            bindEvent:function(){
                var _this=this
                //点击添加
                this.$add.click(function(){
                    var conText=_this.$ipt.val()
                    if(!conText){
                        return
                    }
                    var addDom=`
                    <li>
                        <input type="checkbox" value="">
                        <span class="con">${conText}</span>
                        <span class="remove">删除</span>
                        <span class="edit">编辑</span>
                    </li>
                    `
                    _this.$todolist.append(addDom)
                    //判断是否勾选
                    if(_this.$all.prop('checked')){
                        _this.$todolist.find("li input").prop('checked',true)
                    }
                    _this.$ipt.val('')
                })
                //点击编辑
                this.$todolist.on('click','li .edit' ,function(){
                    var redDom=this.$(this).siblings('.con')
                    var redText=redDom.val()
                    $('<input type="text" class="repTxt">').replaceAll(redDom)
                    $('.repTxt').val(redText).focus()
                })
                //完成编辑
                this.$todolist.on('blur','li .repTxt',function(){
                    var iptVal=$(this).val()
                    var repDom=$(' <span class="con">'+iptval+'</span>')
                    $(repDom).replaceAll($(this))
                })
                //删除单个任务
                this.$todolist.on("click",'li .remove',function(){
                    $(this).parent().remove()
                })
                //点击全选
                this.$all.click(function(){
                    if($(this).prop('checked')){
                        $(".todolist li input").prop('checked',true)
                    }else{
                        $(".todolist li input").prop('checked',false)
                    }
                })
                //选择任务
                this.$todolist.on('click','li input',function(){
                    var selectArr=[]
                    $('.todolist li input').each(function(index,item){
                        if($(item).prop('checked')){
                            selectArr.push('a')
                        }else{
                            selectArr.push('b')
                        }
                    })
                    if(selectArr.indexOf('b')==-1){
                        _this.$all.prop('checked',true)
                    }else{
                        _this.$all.prop('checked',false)
                    }
                })
                //点击处理
                this.$done.click(function(){
                    $('.todolist li input:checked').each(function(index,item){
                        var chuText=$(item).siblings('.con').text()
                        _this.$donelist.append("<li>"+chuText+"</li>")
                        $(item).parent().remove()
                        _this.$all.prop('checked',false)
                    })
                })
                //批量删除
                this.$removes.click(function(){
                    $('.todolist li input:checked').each(function(index,item){
                        $(item).parent().remove()
                        _this.$all.prop('checked',false)
                    })
                })
            }
        }
        toList.init()
    
    
    })