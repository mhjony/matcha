(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{11:function(e,t,a){},12:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),o=a.n(c),l=(a(11),a(12),a(2)),s=a.n(l),m=a(5),u=a(1),i=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),l=Object(u.a)(o,2),i=l[0],p=l[1],f=Object(n.useState)(""),d=Object(u.a)(f,2),v=d[0],g=d[1],h=Object(n.useState)(""),b=Object(u.a)(h,2),E=b[0],w=b[1],j=Object(n.useState)(""),O=Object(u.a)(j,2),N=O[0],y=O[1],S=Object(n.useRef)(!0),x=Object(n.useState)(!0),k=Object(u.a)(x,2),C=k[0],F=k[1],J=Object(n.useState)(""),B=Object(u.a)(J,2),P=B[0],R=B[1];Object(n.useEffect)((function(){S.current?S.current=!1:F(W())}),[a]);var W=function(){return""===a?(R("Name field cant be empty"),!0):(R(null),!1)},D=function(){var e=Object(m.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,fetch("http://localhost:5000/signup",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:a,username:i,email:v,password:E,verified:0,token:"newtoken08989today",recieveEmail:0})});case 4:n=e.sent,console.log(n),window.location="/",e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(n.Fragment,null,r.a.createElement("h2",{className:"text-center mt-3"},"Signup Form"),r.a.createElement("div",{className:"row justify-content-center align-items-center"},r.a.createElement("form",{className:"text-center mt-3 col-md-6 col-sm-6 col-lg-4 col-xs-8",onSubmit:D},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"form-control",type:"text",name:"name",value:a,onChange:function(e){return c(e.target.value)},placeholder:"Full Name"}),P),r.a.createElement("div",{className:"form-group mt-3"},r.a.createElement("input",{className:"form-control",type:"text",name:"username",value:i,onChange:function(e){return p(e.target.value)},placeholder:"Username"})),r.a.createElement("div",{className:"form-group mt-3"},r.a.createElement("input",{className:"form-control",type:"text",name:"email",value:v,onChange:function(e){return g(e.target.value)},placeholder:"Email"})),r.a.createElement("div",{className:"form-group mt-3"},r.a.createElement("input",{className:"form-control",type:"password",name:"password",value:E,onChange:function(e){return w(e.target.value)},placeholder:"Password"})),r.a.createElement("div",{className:"form-group mt-3"},r.a.createElement("input",{className:"form-control",type:"password",name:"cpassword",value:N,onChange:function(e){return y(e.target.value)},placeholder:"Confirm password"})),r.a.createElement("button",{className:"btn btn-success mt-3",disabled:C,type:"submit"},"Register"))))};var p=function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",null,r.a.createElement(i,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){e.exports=a(14)}},[[6,1,2]]]);
//# sourceMappingURL=main.3ba96b57.chunk.js.map