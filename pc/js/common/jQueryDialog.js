/**
 * Dialog
 *
 * @author    caixw <http://www.caixw.com>
 * @copyright Copyright (C) 2010, http://www.caixw.com
 * @license   FreeBSD license
 */


/**
 * jQuery鐨凞ialog鎻掍欢銆�
 *
 * @param object content
 * @param object options 閫夐」銆�
 * @return 
 */
function Dialog(content, options)
{
    var defaults = { // 榛樿鍊笺€� 
        title:'鏍囬',       // 鏍囬鏂囨湰锛岃嫢涓嶆兂鏄剧ずtitle璇烽€氳繃CSS璁剧疆鍏禿isplay涓簄one 
        showTitle:true,     // 鏄惁鏄剧ず鏍囬鏍忋€�
        closeText:'[鍏抽棴]', // 鍏抽棴鎸夐挳鏂囧瓧锛岃嫢涓嶆兂鏄剧ず鍏抽棴鎸夐挳璇烽€氳繃CSS璁剧疆鍏禿isplay涓簄one 
        draggable:true,     // 鏄惁绉诲姩 
        modal:true,         // 鏄惁鏄ā鎬佸璇濇 
        center:true,        // 鏄惁灞呬腑銆� 
        fixed:true,         // 鏄惁璺熼殢椤甸潰婊氬姩銆�
        time:0,             // 鑷姩鍏抽棴鏃堕棿锛屼负0琛ㄧず涓嶄細鑷姩鍏抽棴銆� 
        id:false            // 瀵硅瘽妗嗙殑id锛岃嫢涓篺alse锛屽垯鐢辩郴缁熻嚜鍔ㄤ骇鐢熶竴涓敮涓€id銆� 
    };
    var options = $.extend(defaults, options);
    options.id = options.id ? options.id : 'dialog-' + Dialog.__count; // 鍞竴ID
    var overlayId = options.id + '-overlay'; // 閬僵灞侷D
    var timeId = null;  // 鑷姩鍏抽棴璁℃椂鍣� 
    var isShow = false;
    var isIe = $.browser.msie;
    var isIe6 = $.browser.msie && ('6.0' == $.browser.version);

    /* 瀵硅瘽妗嗙殑甯冨眬鍙婃爣棰樺唴瀹广€�*/
    var barHtml = !options.showTitle ? '' :
        '<div class="bar"><span class="title">' + options.title + '</span><a class="close">' + options.closeText + '</a></div>';
    var dialog = $('<div id="' + options.id + '" class="dialog">'+barHtml+'<div class="content"></div></div>').hide();
    $('body').append(dialog);


    /**
     * 閲嶇疆瀵硅瘽妗嗙殑浣嶇疆銆�
     *
     * 涓昏鏄湪闇€瑕佸眳涓殑鏃跺€欙紝姣忔鍔犺浇瀹屽唴瀹癸紝閮借閲嶆柊瀹氫綅
     *
     * @return void
     */
    var resetPos = function()
    {
        /* 鏄惁闇€瑕佸眳涓畾浣嶏紝蹇呴渶鍦ㄥ凡缁忕煡閬撲簡dialog鍏冪礌澶у皬鐨勬儏鍐典笅锛屾墠鑳芥纭眳涓紝涔熷氨鏄鍏堣缃甦ialog鐨勫唴瀹广€� */
        if(options.center)
        {
            var left = ($(window).width() - dialog.width()) / 2;
            var top = ($(window).height() - dialog.height()) / 2;
            if(!isIe6 && options.fixed)
            {   dialog.css({top:top,left:left});   }
            else
            {   dialog.css({top:top+$(document).scrollTop(),left:left+$(document).scrollLeft()});   }
        }
    }

    /**
     * 鍒濆鍖栦綅缃強涓€浜涗簨浠跺嚱鏁般€�
     *
     * 鍏朵腑鐨則his琛ㄧずDialog瀵硅薄鑰屼笉鏄痠nit鍑芥暟銆�
     */
    var init = function()
    {
        /* 鏄惁闇€瑕佸垵濮嬪寲鑳屾櫙閬僵灞� */
        if(options.modal)
        {
            $('body').append('<div id="' + overlayId + '" class="dialog-overlay"></div>');
            $('#' + overlayId).css({'left':0, 'top':0,
                    /*'width':$(document).width(),*/
                    'width':'100%',
                    /*'height':'100%',*/
                    'height':$(document).height(),
                    'z-index':++Dialog.__zindex,
                    'position':'absolute'})
                .hide();
        }

        dialog.css({'z-index':++Dialog.__zindex, 'position':options.fixed ? 'fixed' : 'absolute'});

		/*  IE6 鍏煎fixed浠ｇ爜 */
        if(isIe6 && options.fixed)
        {
            dialog.css('position','absolute');
            resetPos();
            var top = parseInt(dialog.css('top')) - $(document).scrollTop();
            var left = parseInt(dialog.css('left')) - $(document).scrollLeft();
            $(window).scroll(function(){
                dialog.css({'top':$(document).scrollTop() + top,'left':$(document).scrollLeft() + left});
            });
        }

        /* 浠ヤ笅浠ｇ爜澶勭悊妗嗕綋鏄惁鍙互绉诲姩 */
        var mouse={x:0,y:0};
        function moveDialog(event)
        {
            var e = window.event || event;
            var top = parseInt(dialog.css('top')) + (e.clientY - mouse.y);
            var left = parseInt(dialog.css('left')) + (e.clientX - mouse.x);
            dialog.css({top:top,left:left});
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        dialog.find('.bar').mousedown(function(event){
            if(!options.draggable){  return; }

            var e = window.event || event;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            $(document).bind('mousemove',moveDialog);
        });
        $(document).mouseup(function(event){
            $(document).unbind('mousemove', moveDialog);
        });

        /* 缁戝畾涓€浜涚浉鍏充簨浠躲€� */
        dialog.find('.close').bind('click', this.close);
        dialog.bind('mousedown', function(){  dialog.css('z-index', ++Dialog.__zindex); });

        // 鑷姩鍏抽棴 
        if(0 != options.time){  timeId = setTimeout(this.close, options.time);    }
    }


    /**
     * 璁剧疆瀵硅瘽妗嗙殑鍐呭銆� 
     *
     * @param string c 鍙互鏄疕TML鏂囨湰銆�
     * @return void
     */
    this.setContent = function(c)
    {
        var div = dialog.find('.content');
        if('object' == typeof(c))
        {
            switch(c.type.toLowerCase())
            {
            case 'id': // 灏咺D鐨勫唴瀹瑰鍒惰繃鏉ワ紝鍘熸潵鐨勮繕鍦ㄣ€�
                div.html($('#' + c.value).html());
                break;
            case 'img':
                div.html('鍔犺浇涓�...');
                $('<img alt="" />').load(function(){div.empty().append($(this));resetPos();})
                    .attr('src',c.value);
                break;
            case 'url':
                div.html('鍔犺浇涓�...');
                $.ajax({url:c.value,
                        success:function(html){div.html(html);resetPos();},
                        error:function(xml,textStatus,error){div.html('鍑洪敊鍟�')}
                });
                break;
            case 'iframe':
                div.append($('<iframe src="' + c.value + '" />'));
                break;
            case 'text':
            default:
                div.html(c.value);
                break;
            }
        }
        else
        {   div.html(c); }
    }

    /**
     * 鏄剧ず瀵硅瘽妗�
     */
    this.show = function()
    {
        if(undefined != options.beforeShow && !options.beforeShow())
        {   return;  }

        /**
         * 鑾峰緱鏌愪竴鍏冪礌鐨勯€忔槑搴︺€侷E浠庢护澧冧腑鑾峰緱銆�
         *
         * @return float
         */
        var getOpacity = function(id)
        {
            if(!isIe)
            {   return $('#' + id).css('opacity');    }

            var el = document.getElementById(id);
            return (undefined != el
                    && undefined != el.filters
                    && undefined != el.filters.alpha
                    && undefined != el.filters.alpha.opacity)
                ? el.filters.alpha.opacity / 100 : 1;
        }
        /* 鏄惁鏄剧ず鑳屾櫙閬僵灞� */
        if(options.modal)
        {   $('#' + overlayId).fadeTo('slow', getOpacity(overlayId));   }
        dialog.fadeTo('slow', getOpacity(options.id), function(){
            if(undefined != options.afterShow){   options.afterShow(); }
            isShow = true;
        });
        // 鑷姩鍏抽棴 
        if(0 != options.time){  timeId = setTimeout(this.close, options.time);    }

        resetPos();
    }


    /**
     * 闅愯棌瀵硅瘽妗嗐€備絾骞朵笉鍙栨秷绐楀彛鍐呭銆�
     */
    this.hide = function()
    {
        if(!isShow){ return; }

        if(undefined != options.beforeHide && !options.beforeHide())
        {   return;  }

        dialog.fadeOut('slow',function(){
            if(undefined != options.afterHide){   options.afterHide(); }
        });
        if(options.modal)
        {   $('#' + overlayId).fadeOut('slow');   }

        isShow = false;
    }

    /**
     * 鍏抽棴瀵硅瘽妗� 
     *
     * @return void
     */
    this.close = function()
    {
        if(undefined != options.beforeClose && !options.beforeClose())
        {   return;  }

        dialog.fadeOut('slow', function(){
            $(this).remove();
            isShow = false;
            if(undefined != options.afterClose){   options.afterClose(); }
        });
        if(options.modal)
        {   $('#'+overlayId).fadeOut('slow', function(){$(this).remove();}); }
        clearTimeout(timeId);
    }

    

    init.call(this);
    this.setContent(content);
    
    Dialog.__count++;
    Dialog.__zindex++;
}
Dialog.__zindex = 500;
Dialog.__count = 1;
Dialog.version = '1.0 beta';

function dialog(content, options)
{
	var dlg = new Dialog(content, options);
	dlg.show();
	return dlg;
}

