(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-be2181d0"],{"0ce6":function(t,e,s){},"13d5":function(t,e,s){"use strict";var a=s("23e7"),r=s("d58f").left,i=s("a640"),n=s("ae40"),o=i("reduce"),c=n("reduce",{1:0});a({target:"Array",proto:!0,forced:!o||!c},{reduce:function(t){return r(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"479e":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-confirm"},[s("div",{staticClass:"order-address",on:{click:t.toAddress}},[t._m(0),t._m(1),s("span",{staticClass:"right-arrow"},[s("svg-icon",{attrs:{"icon-class":"right-arrow"}})],1)]),t._m(2),s("div",{staticClass:"statistical"},[s("van-cell",{attrs:{title:"小计",value:"￥"+t.subtotal}}),s("van-cell",{attrs:{title:"运费",value:"￥"+t.orderInfo.yunfei}})],1),s("div",{staticClass:"order-mask"},[s("van-field",{attrs:{rows:"2",border:!0,autosize:"",label:"留言",type:"textarea",maxlength:"100",placeholder:"请输入留言","show-word-limit":""},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),s("div",{staticClass:"submit-order"},[s("van-submit-bar",{attrs:{price:t.totalPrice,"button-text":"提交订单"},on:{submit:t.onSubmit}})],1)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"user-info"},[s("span",[t._v("张三")]),s("span",[t._v("18895364554")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"address-detail"},[t._v(" 收货地址："),s("span",[t._v("浙江省杭州市余杭区利尔达物联网1号楼703")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"good-info"},[s("div",{staticClass:"good-img"},[s("img",{attrs:{src:"http://ec4.images-amazon.com/images/I/71gfm0gcb0L._UL1500_.jpg",alt:""}})]),s("div",{staticClass:"good-right"},[s("div",{staticClass:"good-name"},[t._v("商品名果水果称")]),s("div",{staticClass:"good-sku"},[t._v('已选："黑色","大" ')]),s("div",{staticClass:"good-bottom"},[s("span",{staticClass:"price"},[t._v("￥0.01")]),s("span",{staticClass:"number"},[t._v("x1")])])])])}],i=(s("13d5"),{data:function(){return{orderInfo:{yunfei:5,goodsInfo:[{img:"",price:.01,number:1,skus:[{k:"颜色",v:"红色"},{k:"尺寸",v:"大"}]}]},message:""}},computed:{subtotal:function(){return this.orderInfo.goodsInfo.reduce((function(t,e){return e.price*e.number+t}),0)},totalPrice:function(){return 100*parseFloat(this.orderInfo.yunfei)+100*parseFloat(this.subtotal)}},methods:{onSubmit:function(){console.log("提交按钮点击")},toAddress:function(){this.$router.push({path:"/addressList?redirect=".concat("/orderConfirm")})}}}),n=i,o=(s("83a8"),s("2877")),c=Object(o["a"])(n,a,r,!1,null,"12240f08",null);e["default"]=c.exports},"83a8":function(t,e,s){"use strict";var a=s("0ce6"),r=s.n(a);r.a},d58f:function(t,e,s){var a=s("1c0b"),r=s("7b0b"),i=s("44ad"),n=s("50c4"),o=function(t){return function(e,s,o,c){a(s);var l=r(e),u=i(l),d=n(l.length),f=t?d-1:0,v=t?-1:1;if(o<2)while(1){if(f in u){c=u[f],f+=v;break}if(f+=v,t?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:d>f;f+=v)f in u&&(c=s(c,u[f],f,l));return c}};t.exports={left:o(!1),right:o(!0)}}}]);