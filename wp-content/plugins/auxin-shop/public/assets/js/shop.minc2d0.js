!function($){$(function(){$(".woocommerce-product-gallery .flex-control-thumbs img, .woocommerce-product-gallery .flex-viewport img").matchHeight(),$(".single-product .aux-sticky-position").AuxinStickyPosition(),$(".single-product").photoSwipe({target:".auxshp-lightbox-btn",bgOpacity:.97,shareEl:!0,preloaderEl:!0}),$.fn.AuxVariationImgUpdate=function($scope){var flexSliderInstance=($scope=$scope||$(this)).find(".woocommerce-product-gallery").data("flexslider"),$variations=$scope.find(".auxshp-variations select"),$resetButton=$scope.find(".reset_variations"),isMs="undefined"!=typeof masterslider_instances;$variations.each(function(index,element){$(this).on("change",function(event){var slideIndex,value=this.value,attrName=this.getAttribute("name");Object.keys(productAttr).forEach(function(index){productAttr[index][attrName]===value&&(slideIndex=parseInt(index))}),value&&void 0!==slideIndex&&(isMs?masterslider_instances[0].api.gotoSlide(slideIndex):flexSliderInstance.flexAnimate(slideIndex))})}),$resetButton.on("click",function(){isMs?masterslider_instances[0].api.gotoSlide(0):flexSliderInstance.flexAnimate(0)})},$(".single-product .auxshp-template-slider").AuxVariationImgUpdate()});var spinner=$(".aux-number");spinner.spinner({min:""!==spinner.data("min")?spinner.data("min"):1,max:""!==spinner.data("max")?spinner.data("max"):99,step:spinner.data("step"),icons:{down:"",up:""}}),$("body").on("spinstart updated_wc_div",function(event){$(".aux-shop-table.cart").closest("form").find('input[name="update_cart"]').removeProp("disabled"),(spinner=$(".aux-number")).spinner({min:""!==spinner.data("min")?spinner.data("min"):1,max:""!==spinner.data("max")?spinner.data("max"):99,step:spinner.data("step"),icons:{down:"",up:""}})});var zoomItems=$(".woocommerce-product-gallery .auxin-attachment");$.each(zoomItems,function(index,val){var $val=$(val);$img=$val.find("img"),$val.width()<$img.data("original-width")&&($val.trigger("zoom.destroy"),$val.zoom())}),$(window).on("woocommerce_gallery_init_zoom",function(event){if($.fn.masterslider_instances){var WCSlider,mastersliderObjs=masterslider_instances,$sliderID=$(".woocommerce-product-gallery .master-slider").attr("id");mastersliderObjs.forEach(function(el){el.$element.attr("id")!==$sliderID||(WCSlider=el)}),WCSlider&&WCSlider.api.gotoSlide(0)}}),$.fn.AuxinWishList=function($scope){var $wishlistButton=($scope=$scope||$(this)).hasClass("auxshp-wishlist")?$scope:$scope.find(".auxshp-wishlist");$text=$wishlistButton.find(".auxshp-wishlist-text"),$WishListcontainer=$(".auxshp-wishlist-container"),changedText="",$wishlistButton.on("click",function(e){e.preventDefault();var $this=$(this),data={action:"auxshp_wishlist_add",product_id:$this.data("auxshp-product_id"),verify_nonce:$this.data("auxshp-verify_nonce")};$this.hasClass("available-remove")?(data.action="auxshp_wishlist_remove",$this.removeClass("available-remove wl-animate-added"),$this.addClass("available-add wl-animate-removed")):($this.removeClass("available-add wl-animate-removed"),$this.addClass("available-remove wl-animate-added")),$.post(auxshp.ajax_url,data,function(res){$text.text(res.data.status),$WishListcontainer&&($WishListcontainer.find("tr").length>2?$this.closest("tr").remove():$WishListcontainer.html(res.data.message))})})},$(".auxshp-wishlist").each(function(){$(this).AuxinWishList()}),$(" .aux-widget-recent-products-parallax").each(function(index,element){var $element=$(element),$filters=$element.find(".aux-ajax-filters ul li"),$container=$element.find(".aux-product-parallax-wrapper"),$loading=$container.find(".aux-items-loading");data={action:"auxin_parallax_products_handler",n:$container.data("n"),args:eval($container.data("element-id")+"AjaxConfig")},$filters.on("click",function(e){e.preventDefault();var $columns=$container.find('[class*="aux-parallax-column"]'),$this=$(this),data={action:"auxin_parallax_products_handler",n:$container.data("n"),args:eval($container.data("element-id")+"AjaxConfig"),term:$this.data("category-id")};$.post(auxshp.ajax_url,data,function(res){if(res){var $items=$(res.data).filter(".aux-parallax-item");$container.AuxinMasonryAnimate("showLoading"),setTimeout(function(){$container.AuxinMasonryAnimate("insertItem",$items),$container.AuxinMasonryAnimate("hideLoading")},500)}})})}),$(document).on("click",".aux-remove-cart-content",function(e){e.preventDefault();var product_id=$(this).data("product_id"),verify_nonce=$(this).data("verify_nonce"),$cartBoxEl=$(this).closest(".aux-cart-wrapper").addClass("aux-cart-remove-in-progress");$.ajax({type:"POST",dataType:"json",url:auxshp.ajax_url,data:{action:"auxshp_product_remove",product_id:product_id,verify_nonce:verify_nonce},success:function(response){$(".woocommerce-message, .woocommerce-error").remove(),response.success?($(".aux-hidden-blocks").append(response.data.notif),0===parseInt(response.data.total)?($(".aux-card-dropdown").html(response.data.empty),$(".aux-cart-contents").find("span").remove()):($(".aux-card-item").filter(function(){return $(this).data("product-id")==product_id}).remove(),$(".aux-cart-contents").find("span").text(response.data.count)),$(".aux-cart-subtotal").each(function(){$(this).find(".woocommerce-Price-amount").contents().filter(function(){return 3==this.nodeType})[0].nodeValue=response.data.total}),$cartBoxEl.removeClass("aux-cart-remove-in-progress")):$(".aux-hidden-blocks").append(response.data)}})}),$(document).on("click",".aux-ajax-add-to-cart",function(e){if("simple"===$(this).data("product-type")){e.preventDefault();var product_id=$(this).data("product_id"),quantity=$(this).data("quantity"),verify_nonce=$(this).data("verify_nonce"),$cartBoxEl=$(".aux-cart-wrapper"),hasAnimation=!!$cartBoxEl.hasClass("aux-basket-animation");$cartBoxEl.trigger("AuxCartInProgress"),$(this).parents(".aux-shop-quicklook-modal")&&(quantity=$(this).parents(".aux-shop-quicklook-modal").find(".quantity input").val()),$.ajax({type:"POST",dataType:"json",url:auxshp.ajax_url,data:{action:"auxshp_ajax_shopping_cart",args:auxin_cart_options,product_id:product_id,quantity:quantity,verify_nonce:verify_nonce},success:function(response){$(".woocommerce-message, .woocommerce-error").remove(),response.success?($(".aux-hidden-blocks").append(response.data.notif),setTimeout(function(){hasAnimation?$cartBoxEl.on("AuxCartProgressAnimationDone",function(e){$cartBoxEl.find(".aux-card-dropdown").html(response.data.items),$cartBoxEl.find(".aux-shopping-basket").html(response.data.total),$cartBoxEl.trigger("AuxCartUpdated")}):($cartBoxEl.find(".aux-card-dropdown").html(response.data.items),$cartBoxEl.find(".aux-shopping-basket").html(response.data.total),$cartBoxEl.trigger("AuxCartUpdated"))},150)):$(".aux-hidden-blocks").append(response.data)}})}}),$.fn.AdvancedRecentProductAjax=function($scope){$scope=$scope||$(this),$this=$scope.hasClass("aux-widget-recent-products-pro")?$scope:$scope.find(".aux-widget-recent-products-pro"),$container=$this.find(".aux-ajax-view"),$ajaxSpinner=$this.find(".aux-items-loading"),$filterLists=$this.find(".aux-ajax-filters li[data-category-id]"),$sortLists=$this.find(".aux-sort-filter li[data-filter]"),data={action:"aux_advacned_recent_product_filter_content",taxonomy:$container.data("taxonomy"),num:$container.data("num"),order:$container.data("order"),orderby:$container.data("orderby"),n:$container.data("n"),args:eval($container.data("element-id")+"AjaxConfig")},$filterLists.on("click",function(e){e.preventDefault(),data.term=$(this).data("category-id"),$container.removeClass("slow-show").addClass("slow-hide"),$ajaxSpinner.removeClass("aux-loading-hide").addClass("aux-loading-visible"),$.post(auxshp.ajax_url,data,function(res){res&&setTimeout(function(){$container.empty(),$container.append(res.data),$ajaxSpinner.removeClass("aux-loading-visible").addClass("aux-loading-hide"),$container.removeClass("slow-hide").addClass("slow-show"),$(".auxshp-wishlist").each(function(){$(this).AuxinWishList()}),$(".aux-shop-quicklook-wrapper").each(function(index,el){$(this).AuxinQuickLook()})},1e3)})}),$sortLists.on("click",function(e){e.preventDefault(),data.sort=$(this).data("filter"),$(this).attr("data-filter-order")&&(data.sortOrder=$(this).attr("data-filter-order")),$container.removeClass("slow-show").addClass("slow-hide"),$ajaxSpinner.removeClass("aux-loading-hide").addClass("aux-loading-visible"),$.post(auxshp.ajax_url,data,function(res){res&&setTimeout(function(){$container.empty(),$container.append(res.data),$ajaxSpinner.removeClass("aux-loading-visible").addClass("aux-loading-hide"),$container.removeClass("slow-hide").addClass("slow-show"),$(".auxshp-wishlist").each(function(){$(this).AuxinWishList()}),$(".aux-shop-quicklook-wrapper").each(function(index,el){$(this).AuxinQuickLook()})},1e3)})})},$(".aux-widget-recent-products-pro").each(function(){$(this).AdvancedRecentProductAjax()}),$.fn.AuxinQuickLook=function($scope){var st={$btnListener:($scope=$scope||$(this)).find(".aux-shop-quicklook"),$modalTarget:$(".aux-hidden-blocks"),modalClass:"aux-shop-quicklook-modal",modalOnOpenClass:"aux-open"};st.$btnListener.on("click",function(e){var $modal=$("<dialog></dialog>");$modal.addClass(st.modalClass),$modal.appendTo(st.$modalTarget),$closeBtn=$('<button type="button" class="aux-quicklook-close"><i class="aux-ico auxicon-close-1"></i></button>'),$closeBtn.appendTo($modal),setTimeout(function(){$modal.addClass(st.modalOnOpenClass)},300);var data={action:"aux_quick_look_content",nonce:$(this).data("verify-nonce"),productID:$(this).data("product-id"),productType:$(this).data("product-type")};dialogPolyfill.registerDialog($modal[0]),$modal[0].showModal(),$.post(auxshp.ajax_url,data,function(res){$(res.data).appendTo($modal),$(".aux-quicklook-carousel").AuxinCarousel({columns:1}),$(".auxshp-wishlist").each(function(){$(this).AuxinWishList()}),$.fn.AuxinJsSocialsInit($modal);var spinner=$("input.qty");spinner.spinner({min:""!==spinner.data("min")?spinner.data("min"):1,max:""!==spinner.data("max")?spinner.data("max"):99,icons:{down:"",up:""}}),"function"==typeof tawcvs_variation_swatches_form&&($(".variations_form").tawcvs_variation_swatches_form(),$(document.body).trigger("tawcvs_initialized"))}),$closeBtn.on("click",function(){$modal[0].close(),$modal.remove()})})},$(".aux-shop-quicklook-wrapper").each(function(index,el){$(this).AuxinQuickLook()}),$.fn.AuxinCartTotalItems=function($scope){if($scope=$scope||$(this),$totalItems=$scope.find(".aux-cart-total-items"),0!==$totalItems.length){var totalCount=0;$scope.find(".aux-card-item").each(function(index,el){var itemCount=parseInt($(el).find(".aux-card-item-details > span").text().trim().split(" ")[0]);totalCount+=itemCount}),$totalItems.find(".number").text(totalCount)}},$(".site-header-section").each(function(index,el){$(el).find(".aux-cart-wrapper").AuxinCartTotalItems()}),$.fn.AuxinShopWidgetAreaHandler=function($scope){var $scope=$scope||$(this),$window=$(window),st={areaClass:".aux-shop-widget-area",$btn:$scope.find(".aux-shop-custom-widget-area-btn"),$area:$scope.find(".aux-shop-widget-area"),openClass:"aux-open"};st.$btn.on("click",function(e){e.preventDefault(),e.stopPropagation();var areaHeight=st.$area.find(".aux-wrapper").outerHeight(),windowWidth=$window.width();st.$area.toggleClass(st.openClass),st.$area.hasClass(st.openClass)&&windowWidth>768?st.$area.css("height",areaHeight):!st.$area.hasClass(st.openClass)&&windowWidth>768?st.$area.css("height",0):windowWidth<768&&st.$area.css("height","auto")}),$window.on("resize load",function(){var areaHeight=st.$area.find(".aux-wrapper").outerHeight();st.$area.hasClass(st.openClass)&&($(window).width()<768?st.$area.css("height","auto"):st.$area.css("height",areaHeight))}),$(document).on("click",function(e){0===$(e.target).closest(st.areaClass).length&&$(st.areaClass).hasClass(st.openClass)&&st.$area.removeClass(st.openClass)})},$(".woocommerce-page").AuxinShopWidgetAreaHandler(),$.fn.AuxinCartAnimationHandler=function(){$headerCartWrapper=$(this).find(".site-header-section .aux-cart-wrapper"),$headerCartWrapper.hasClass("aux-basket-animation")&&($headerCartWrapper.on("AuxCartInProgress",function(e){$headerCartWrapper.addClass("aux-cart-in-progress")}),$headerCartWrapper.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(e){"FillBasket"===e.originalEvent.animationName&&($headerCartWrapper.removeClass("aux-cart-in-progress"),$headerCartWrapper.trigger("AuxCartProgressAnimationDone"))}),$headerCartWrapper.on("AuxCartUpdated",function(e){$headerCartWrapper.addClass("aux-cart-updated-animation")}))},$("body").AuxinCartAnimationHandler()}(jQuery);