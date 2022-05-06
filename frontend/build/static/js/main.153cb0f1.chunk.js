(this["webpackJsonpmail-react-app"]=this["webpackJsonpmail-react-app"]||[]).push([[0],{187:function(e,t,n){},189:function(e,t,n){},506:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(19),s=n.n(c),o=(n(187),n(36)),i=n(8),u=(n(188),n(189),n(25)),l=n(4),d=n.n(l),b=n(10),j=n(9),p=n(63),f=n(170),h="http://127.0.0.1:8000/api/",m=n.n(f).a.create({baseURL:h,timeout:5e3,headers:{Authorization:localStorage.getItem("access_token")?"JWT "+localStorage.getItem("access_token"):null,"Content-Type":"application/json",accept:"application/json"}});m.interceptors.response.use((function(e){return e}),function(){var e=Object(b.a)(d.a.mark((function e(t){var n,r,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.config,"undefined"!==typeof t.response){e.next=4;break}return alert("A server/network error occurred. Looks like CORS might be the problem. Sorry about this - we will get it fixed shortly."),e.abrupt("return",Promise.reject(t));case 4:if(401!==t.response.status||n.url!==h+"token/refresh/"){e.next=7;break}return window.location.href="/login/",e.abrupt("return",Promise.reject(t));case 7:if("token_not_valid"!==t.response.data.code||401!==t.response.status||"Unauthorized"!==t.response.statusText){e.next=23;break}if(!(r=localStorage.getItem("refresh_token"))){e.next=21;break}if(a=JSON.parse(atob(r.split(".")[1])),c=Math.ceil(Date.now()/1e3),console.log(a.exp),!(a.exp>c)){e.next=17;break}return e.abrupt("return",m.post("/token/refresh/",{refresh:r}).then((function(e){return localStorage.setItem("access_token",e.data.access),localStorage.setItem("refresh_token",e.data.refresh),m.defaults.headers.Authorization="JWT "+e.data.access,n.headers.Authorization="JWT "+e.data.access,m(n)})).catch((function(e){console.log(e)})));case 17:console.log("Refresh token is expired",a.exp,c),window.location.href="/login/";case 19:e.next=23;break;case 21:console.log("Refresh token not available."),window.location.href="/login/";case 23:return e.abrupt("return",Promise.reject(t));case 24:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var x=m,O={fetchMessages:function(){var e=Object(b.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/emails/".concat(t,"/"));case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),fetchMessage:function(){var e=Object(b.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("/emails/get/".concat(t,"/"));case 2:return n=e.sent,r=n.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),sendMessage:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("emails/compose/",JSON.stringify(t));case 2:return e.next=4,e.sent.status;case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),updateReadOrArchiveStatus:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.put("emails/edit/".concat(t.id),JSON.stringify(t)).status;case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteMessage:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.delete("emails/delete/".concat(t.id));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),register:function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("register/",{email:t,password:n,confirmation:n+"i"}).catch((function(e){return console.log(e.response.data),e.response.data.message}));case 2:if(201!==(r=e.sent).status){e.next=7;break}return console.log("created user, attempting login"),O.login(t,n),e.abrupt("return");case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),login:function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.post("token/",{username:t,password:n});case 3:return r=e.sent,localStorage.setItem("access_token",r.data.access),localStorage.setItem("refresh_token",r.data.refresh),x.defaults.headers.Authorization="JWT "+localStorage.getItem("access_token"),a=Object(p.a)(r.data.access),window.location.href="/mailbox/inbox",e.abrupt("return",a);case 12:if(e.prev=12,e.t0=e.catch(0),!e.t0.response||400!==e.t0.response.status){e.next=18;break}return console.log(e.t0.response.data),console.log("login fail"),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t,n){return e.apply(this,arguments)}}(),logout:function(){var e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{console.log("API logging out"),localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),window.location.href="/login"}catch(t){}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getCurrentUser:function(){var e=Object(b.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(p.a)(localStorage.getItem("access_token"));case 3:return t=e.sent,console.log("current user:"+t.username),e.abrupt("return",t.username);case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},v=O,g=n(1),w=Object(r.createContext)();function k(e){var t=e.children,n=function(){var e=Object(r.useState)(null),t=Object(j.a)(e,2),n=t[0],a=t[1],c=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("useProvideAuth.login"),e.next=3,v.login(t,n);case 3:return r=e.sent,console.log(r),a(r),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),s=function(){var e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("useProvideAuth.logout"),a(null),v.logout();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.getCurrentUser();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){try{var e=localStorage.getItem("access_token");a(Object(p.a)(e))}catch(t){return void a(null)}}),[]),{user:n,login:c,logout:s,getUser:o}}();return Object(g.jsx)(w.Provider,{value:n,children:t})}var y=function(){return Object(r.useContext)(w)};var S,C,I,N,L,R,T,E,P,A,W,_,M=n(171),G=n(172),U=n(182),B=n(181),F=n(12),z=n(13),J=(n(208),z.b.div(S||(S=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n\tpadding: 1em 0;\n\ttext-align: left;\n\n\tbutton {\n\t\tmargin-right: 1em;\n\t\tpadding: 0.3em 0.6em;\n\t}\n\n\t.active {\n\t\tcolor: #fff;\n\t\tbackground-color: #007bff;\n\t\tborder-color: #007bff;\n\t}\n\n\t.inactive {\n\t\tcolor: #007bff;\n\t\tbackground-color: transparent;\n\t\tbackground-image: none;\n\t\tborder-color: #007bff;\n\t}\n\n\t.inactive:hover {\n\t\tcolor: #fff;\n\t\tbackground-color: #007bff;\n\t\tborder-color: #007bff;\n\t}\n"])))),D=n(509),q=n(508),Y=n(510),K=function(e){e.mailbox;var t=e.setMailbox,n=y().user,a=Object(i.f)().state,c=Object(i.f)();return Object(r.useEffect)((function(){a&&a.length>0&&t(a)})),Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(J,{className:"navigaton",children:Object(g.jsx)(D.a,{collapseOnSelect:!0,expand:"sm",bg:"primary",variant:"dark",children:Object(g.jsxs)(q.a,{children:[Object(g.jsx)(D.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),!n&&Object(g.jsxs)(Y.a,{children:[Object(g.jsx)(D.a.Brand,{children:"Web Mail"}),Object(g.jsx)(D.a.Collapse,{id:"responsive-navbar-nav",children:Object(g.jsxs)(Y.a,{children:[Object(g.jsx)(Y.a.Link,{href:"/register",children:"Register"}),Object(g.jsx)(Y.a.Link,{href:"/login",children:"Login"})]})})]}),n&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(D.a.Collapse,{id:"responsive-navbar-nav",children:Object(g.jsxs)(Y.a,{className:"me-auto",activeKey:c.pathname,children:[Object(g.jsx)(Y.a.Link,{href:"/mailbox/inbox",children:"Inbox"}),Object(g.jsx)(Y.a.Link,{href:"/compose",children:"Compose"}),Object(g.jsx)(Y.a.Link,{href:"/mailbox/sent",children:"Sent"}),Object(g.jsx)(Y.a.Link,{href:"/mailbox/archive",children:"Archive"})]})}),Object(g.jsx)(Y.a,{children:Object(g.jsx)(D.a.Brand,{children:n.username})}),Object(g.jsx)(Y.a,{children:Object(g.jsx)(Y.a.Link,{href:"/logout",children:"Logout"})})]})]})})})})},H=z.b.div(C||(C=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n"]))),Q=z.b.div(I||(I=Object(F.a)(["\n\tdisplay: flex;\n\tborder: 1px solid black;\n\tpadding: 0.2rem;\n\tbackground-color: ",";\n\t","\n\n\t:hover {\n\t\tbackground-color: #007bff;\n\t\tborder-color: #007bff;\n\t\tcolor: #fff;\n\t}\n"])),(function(e){return e.read&&"#c8c7c7"}),""),V=z.b.div(N||(N=Object(F.a)(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\twidth: 100%;\n\n\tdiv {\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.sender {\n\t\tfont-weight: 500;\n\t\tmax-width: 30em;\n\t\tmin-width: 10em;\n\t}\n\n\t.subject {\n\t\ttext-align: left;\n\t\tjustify-content: flex-start;\n\t\twidth: auto;\n\t}\n\n\t@media screen and (max-width: 600px) {\n\t\t.timestamp {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.subject {\n\t\t\ttext-align: left;\n\t\t\tjustify-content: flex-start;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n"]))),X=function(e){var t=e.sender,n=e.subject,r=e.read,a=e.timestamp,c=e.handleClick,s=e.id;return Object(g.jsx)(Q,{read:r,onClick:function(){return c(s)},children:Object(g.jsxs)(V,{children:[Object(g.jsx)("div",{className:"sender",children:t}),Object(g.jsxs)("div",{className:"subject",children:[" ",n]}),Object(g.jsx)("div",{className:"timestamp",children:a})]})})},Z=z.b.div(L||(L=Object(F.a)(["\n\tborder: 5px solid var(--lightGrey);\n\tborder-top: 5px solid var(--darkGrey);\n\tborder-radius: 50%;\n\twidth: 50px;\n\theight: 50px;\n\tmargin: 20px auto;\n\n\tanimation: spin 0.8s linear infinite;\n\n\t@keyframes spin {\n\t\t0% {\n\t\t\ttransform: rotate(0deg);\n\t\t}\n\t\t100% {\n\t\t\ttransform: rotate(360deg);\n\t\t}\n\t}\n"]))),$=function(){var e=Object(i.h)().mailbox,t=Object(i.g)(),n=Object(r.useState)(e),a=Object(j.a)(n,2),c=(a[0],a[1],Object(r.useState)(!1)),s=Object(j.a)(c,2),o=s[0],u=s[1],l=Object(r.useState)(!1),p=Object(j.a)(l,2),f=(p[0],p[1]),h=Object(r.useState)([]),m=Object(j.a)(h,2),x=m[0],O=m[1];Object(r.useEffect)((function(){(function(){var t=Object(b.a)(d.a.mark((function t(){var n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,f(!1),u(!0),t.next=5,v.fetchMessages(e);case 5:n=t.sent,O(n),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),f(!0);case 12:u(!1);case 13:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}})()(e)}),[e]);var w=function(e){var n=x.find((function(t){return t.id===e}));!function(e){e.read=!0,v.updateReadOrArchiveStatus(e)}(n),t("/read",{state:n})};return Object(g.jsxs)(H,{children:[o?Object(g.jsx)(Z,{}):x.map((function(e){return Object(g.jsx)(X,{id:e.id,sender:e.sender,subject:e.subject,read:e.read,timestamp:e.timestamp,handleClick:w},e.id)})),x.length<1&&Object(g.jsxs)("div",{className:"no-messages",children:["You have no ",e," messages."]})]})},ee=(r.Component,z.b.div(R||(R=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n\n\t.send-button {\n\t\ttext-align: right;\n\t}\n"])))),te=n(15),ne=n(24),re=n(64),ae=n.n(re),ce=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),s=Object(j.a)(c,2),o=s[0],u=s[1],l=Object(r.useState)(""),p=Object(j.a)(l,2),f=p[0],h=p[1],m=Object(r.useState)(!1),x=Object(j.a)(m,2),O=x[0],w=x[1],k=Object(i.g)(),y=Object(i.f)().state,S=Object(r.useRef)(),C=Object(r.useRef)();Object(r.useEffect)((function(){var e=function(){S.current.focus(),setTimeout((function(){return S.current.setSelectionRange(0,0)}),100)},t=function(){return"Re: "+y.subject.replace(/((re:*|Re:*|RE:*|re:*)+(\s)*)+/,"")},n=function(){return"\n\nOn ".concat(y.timestamp," ").concat(y.sender," wrote:\n").concat(y.body)};y?(a(y.sender),u(t()),h(n()),e()):C.current.focus()}),[y]);var I=function(){var e=Object(b.a)(d.a.mark((function e(t){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r={recipients:n,subject:o,body:f},w(!0),e.prev=3,e.next=6,v.sendMessage(r);case 6:201===e.sent&&k("/mailbox/inbox"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log("error");case 13:w(!1);case 14:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)(ee,{children:Object(g.jsxs)(te.a,{onSubmit:I,children:[Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",size:"lg",children:[Object(g.jsx)(te.a.Label,{children:"Email to:"}),Object(g.jsx)(te.a.Control,{ref:C,type:"email",placeholder:"name@cs50.com",value:n,onChange:function(e){return a(e.target.value)}})]}),Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",size:"lg",children:[Object(g.jsx)(te.a.Label,{children:"Subject"}),Object(g.jsx)(te.a.Control,{type:"subject",name:"subject",value:o,placeholder:"Subject",onChange:function(e){return u(e.target.value)}})]}),Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1",children:[Object(g.jsx)(te.a.Label,{children:"Write your email here"}),Object(g.jsx)(te.a.Control,{ref:S,as:"textarea",rows:10,value:f,onChange:function(e){return h(e.target.value)}})]}),Object(g.jsxs)("div",{className:"send-button",children:[!O&&Object(g.jsx)(ne.a,{variant:"primary",type:"submit",onSubmit:I,children:"Send"}),O&&Object(g.jsx)(ne.a,{variant:"primary",type:"submit",disabled:!0,children:"Sending..."})]})]})})},se=z.b.div(T||(T=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n"]))),oe=z.b.div(E||(E=Object(F.a)(["\n\t#message-body {\n\t\twhite-space: pre-wrap;\n\t}\n\n\t#option-buttons {\n\t\tmargin: 1rem 0;\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\n\t\tButton + Button {\n\t\t\tmargin-left: 1rem;\n\t\t}\n\t}\n"]))),ie=function(){var e=Object(i.g)(),t=Object(i.f)().state,n=Object(r.useState)(t.read),a=Object(j.a)(n,2),c=a[0],s=a[1],o=Object(r.useState)(t.archived),u=Object(j.a)(o,2),l=u[0],d=u[1];return Object(g.jsxs)(se,{children:[t&&Object(g.jsxs)(oe,{children:[Object(g.jsxs)("div",{id:"sender",children:["From: ",t.sender]}),Object(g.jsxs)("div",{id:"recipients",children:["To: ",t.recipients.join(", ")]}),Object(g.jsxs)("div",{id:"timestamp",children:["Time: ",t.timestamp]}),Object(g.jsxs)("div",{id:"subject",children:["Subject: ",t.subject]}),Object(g.jsx)("hr",{}),Object(g.jsx)("div",{id:"message-body",children:t.body}),Object(g.jsxs)("div",{id:"option-buttons",children:[Object(g.jsx)("div",{className:"reply-button",children:Object(g.jsx)(ne.a,{variant:"outline-primary btn",onClick:function(){e("/compose",{state:t})},children:"Reply"})}),Object(g.jsxs)("div",{className:"action-buttons",children:[Object(g.jsx)(ne.a,{variant:"outline-danger btn-sm",onClick:function(){v.deleteMessage(t),e("/mailbox/inbox",{state:t})},children:"Delete"}),Object(g.jsx)(ne.a,{variant:"outline-primary btn-sm",onClick:function(){t.archived=!t.archived,d((function(e){return!e})),v.updateReadOrArchiveStatus(t),e("/mailbox/archive")},children:l?"Unarchive":"Archive"}),Object(g.jsx)(ne.a,{variant:"outline-primary btn-sm",onClick:function(){t.read=!t.read,s((function(e){return!e})),v.updateReadOrArchiveStatus(t)},children:c?"Mark Unread":"Mark Read"})]})]})]}),!t&&e("/")]})},ue=z.b.div(P||(P=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n"]))),le=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),s=Object(j.a)(c,2),o=s[0],u=s[1],l=Object(r.useState)(),p=Object(j.a)(l,2),f=p[0],h=p[1],m=(Object(i.g)(),y()),x=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(!1),console.log("dosubmit"),t.preventDefault(),e.next=5,m.login(n,o);case 5:e.sent||h(!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(ue,{children:[Object(g.jsx)("h1",{children:"Login"}),Object(g.jsxs)(te.a,{children:[f&&Object(g.jsx)("div",{className:"error",children:"Username or Password incorrect. Try again."}),Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[Object(g.jsx)(te.a.Label,{children:"Username"}),Object(g.jsx)(te.a.Control,{type:"email",placeholder:"Enter Username",value:n,onChange:function(e){return a(e.target.value)}}),Object(g.jsx)(te.a.Text,{className:"text-muted",children:"The email address you are accessing"})]}),Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"formBasicPassword",children:[Object(g.jsx)(te.a.Label,{children:"Password"}),Object(g.jsx)(te.a.Control,{type:"password",placeholder:"Password",value:o,onChange:function(e){return u(e.target.value)}})]}),Object(g.jsx)(ne.a,{variant:"primary",type:"submit",onClick:x,children:"Submit"})]})]})},de=z.b.div(A||(A=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n"]))),be=function(){var e=y();return Object(r.useEffect)((function(){e.logout()}),[]),Object(g.jsx)(de,{children:Object(g.jsx)("div",{children:"Logging out..."})})},je=n(3),pe=z.b.div(W||(W=Object(F.a)(["\n\tmax-width: var(--maxWidth);\n\tmargin: 0 auto;\n"]))),fe=function(){var e=Object(r.useState)({email:"",password:""}),t=Object(j.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)({}),s=Object(j.a)(c,2),o=s[0],i=s[1],u=ae.a.object({email:ae.a.string().required().email({minDomainSegments:2,tlds:{allow:["com"]}}),password:ae.a.string().required().min(5)}),l=function(){var e=Object(b.a)(d.a.mark((function e(){var t,r,a,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i({}),t={abortEarly:!1},r=u.validate(n,t),a={},!r.error){e.next=8;break}return r.error.details.map((function(e){a[e.path]=e.message})),i(a),e.abrupt("return");case 8:return e.prev=8,e.next=11,v.register(n.email,n.password);case 11:c=e.sent,a.usernameError=c,i(a),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(8),console.log(e.t0);case 19:return e.abrupt("return");case 20:case"end":return e.stop()}}),e,null,[[8,16]])})));return function(){return e.apply(this,arguments)}}(),p=function(e){var t=e.currentTarget,r=Object(je.a)({},n);r[t.name]=t.value,a(r)},f=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),l(),e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(pe,{children:[Object(g.jsx)("h1",{children:"Register"}),Object(g.jsxs)(te.a,{children:[Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[o.usernameError&&Object(g.jsx)("div",{className:"error",children:o.usernameError}),Object(g.jsx)(te.a.Label,{children:"Username"}),Object(g.jsx)(te.a.Control,{name:"email",type:"email",placeholder:"Enter Username",value:n.email,onChange:function(e){return p(e)}}),Object(g.jsx)(te.a.Text,{className:"text-muted",children:"Your desired Email address"}),o.email&&Object(g.jsx)("div",{className:"alert alert-danger",children:o.email})]}),Object(g.jsxs)(te.a.Group,{className:"mb-3",controlId:"formBasicPassword",children:[Object(g.jsx)(te.a.Label,{children:"Password"}),Object(g.jsx)(te.a.Control,{name:"password",type:"password",placeholder:"Password",value:n.password,onChange:function(e){return p(e)}}),o.password&&Object(g.jsx)("div",{className:"alert alert-danger",children:o.password})]}),Object(g.jsx)(ne.a,{variant:"primary",type:"submit",onClick:function(e){return f(e)},children:"Submit"})]})]})},he=Object(z.a)(_||(_=Object(F.a)(["\n    :root {\n        ","\n        --maxWidth: 1000px;\n        --lightGrey: #aaa;\n        --medGrey: #353535;\n        --darkGrey: #1c1c1c;\n    }\n\n    * {\n        box-sizing: border-box;\n    }\n\n    body {\n        margin: 0;\n        padding: 0;\n    }\n\n    .error {\n\t\tcolor: red;\n\t\tfont-size: 1.1em;\n\t}\n\n    @media screen and (max-width: 1000px) {\n        body {\n            padding: 0 2em;\n        }\n    }\n"])),"");var me=function(){var e=Object(u.b)();return Object(g.jsxs)(o.a,{history:e,children:[Object(g.jsxs)(k,{children:[Object(g.jsx)(K,{}),Object(g.jsxs)(i.c,{children:[Object(g.jsx)(i.a,{exact:!0,path:"/register",element:Object(g.jsx)(fe,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/login",element:Object(g.jsx)(le,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/logout",element:Object(g.jsx)(be,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/compose",element:Object(g.jsx)(ce,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/read",element:Object(g.jsx)(ie,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/reply",element:Object(g.jsx)(ie,{})}),Object(g.jsx)(i.a,{exact:!0,path:"/mailbox/:mailbox",element:Object(g.jsx)($,{})})]})]}),Object(g.jsx)(he,{})]})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,511)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(me,{})}),document.getElementById("root")),xe()}},[[506,1,2]]]);
//# sourceMappingURL=main.153cb0f1.chunk.js.map