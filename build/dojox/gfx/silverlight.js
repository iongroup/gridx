//>>built
define("dojox/gfx/silverlight","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/Color dojo/on dojo/_base/array dojo/dom-geometry dojo/dom dojo/_base/sniff ./_base ./shape ./path ./registry".split(" "),function(n,k,l,C,D,s,t,r,u,e,h,v){function w(a){var b=e.normalizeColor(a);a=b.toHex();b=Math.round(255*b.a);b=(0>b?0:255<b?255:b).toString(16);return"#"+(2>b.length?"0"+b:b)+a.slice(1)}function m(a,b){var c={target:a,currentTarget:a,preventDefault:function(){},stopPropagation:function(){}};
try{b.source&&(c.target=b.source,c.gfxTarget=h.byId(c.target.tag))}catch(f){}if(b)try{c.ctrlKey=b.ctrl;c.shiftKey=b.shift;var g=b.getPosition(null);c.x=c.offsetX=c.layerX=g.x;c.y=c.offsetY=c.layerY=g.y;var d=q[a.getHost().content.root.name],e=t.position(d);c.clientX=e.x+g.x;c.clientY=e.y+g.y}catch(k){}return c}function x(a,b){var c={keyCode:b.platformKeyCode,ctrlKey:b.ctrl,shiftKey:b.shift};try{b.source&&(c.target=b.source,c.gfxTarget=h.byId(c.target.tag))}catch(f){}return c}var d=e.silverlight={};
n.experimental("dojox.gfx.silverlight");var y={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]},z={normal:400,bold:700},E={butt:"Flat",round:"Round",square:"Square"},F={bevel:"Bevel",round:"Round"},A={serif:"Times New Roman",times:"Times New Roman","sans-serif":"Arial",helvetica:"Arial",monotone:"Courier New",courier:"Courier New"};d.Shape=l("dojox.gfx.silverlight.Shape",
h.Shape,{destroy:function(){u("gfxRegistry")&&h.dispose(this);this.rawNode=null},setFill:function(a){var b=this.rawNode.getHost().content;if(!a)return this.fillStyle=null,this._setFillAttr(null),this;if("object"==typeof a&&"type"in a){switch(a.type){case "linear":this.fillStyle=a=e.makeParameters(e.defaultLinearGradient,a);var c=b.createFromXaml("\x3cLinearGradientBrush/\x3e");c.mappingMode="Absolute";c.startPoint=a.x1+","+a.y1;c.endPoint=a.x2+","+a.y2;s.forEach(a.colors,function(a){var f=b.createFromXaml("\x3cGradientStop/\x3e");
f.offset=a.offset;f.color=w(a.color);c.gradientStops.add(f)});this._setFillAttr(c);break;case "radial":this.fillStyle=a=e.makeParameters(e.defaultRadialGradient,a);var f=b.createFromXaml("\x3cRadialGradientBrush/\x3e"),g=e.matrix.multiplyPoint(e.matrix.invert(this._getAdjustedMatrix()),a.cx,a.cy),g=g.x+","+g.y;f.mappingMode="Absolute";f.gradientOrigin=g;f.center=g;f.radiusX=f.radiusY=a.r;s.forEach(a.colors,function(a){var c=b.createFromXaml("\x3cGradientStop/\x3e");c.offset=a.offset;c.color=w(a.color);
f.gradientStops.add(c)});this._setFillAttr(f);break;case "pattern":this.fillStyle=null,this._setFillAttr(null)}return this}this.fillStyle=a=e.normalizeColor(a);g=b.createFromXaml("\x3cSolidColorBrush/\x3e");g.color=a.toHex();g.opacity=a.a;this._setFillAttr(g);return this},_setFillAttr:function(a){this.rawNode.fill=a},setStroke:function(a){var b=this.rawNode.getHost().content,c=this.rawNode;if(!a)return this.strokeStyle=null,c.stroke=null,this;if("string"==typeof a||k.isArray(a)||a instanceof C)a=
{color:a};a=this.strokeStyle=e.makeParameters(e.defaultStroke,a);a.color=e.normalizeColor(a.color);if(a)if(b=b.createFromXaml("\x3cSolidColorBrush/\x3e"),b.color=a.color.toHex(),b.opacity=a.color.a,c.stroke=b,c.strokeThickness=a.width,c.strokeStartLineCap=c.strokeEndLineCap=c.strokeDashCap=E[a.cap],"number"==typeof a.join?(c.strokeLineJoin="Miter",c.strokeMiterLimit=a.join):c.strokeLineJoin=F[a.join],b=a.style.toLowerCase(),b in y&&(b=y[b]),b instanceof Array){b=k.clone(b);if("butt"!=a.cap){for(a=
0;a<b.length;a+=2)--b[a],1>b[a]&&(b[a]=1);for(a=1;a<b.length;a+=2)++b[a]}c.strokeDashArray=b.join(",")}else c.strokeDashArray=null;return this},_getParentSurface:function(){for(var a=this.parent;a&&!(a instanceof e.Surface);a=a.parent);return a},_applyTransform:function(){var a=this._getAdjustedMatrix(),b=this.rawNode;if(a){var c=this.rawNode.getHost().content,f=c.createFromXaml("\x3cMatrixTransform/\x3e"),c=c.createFromXaml("\x3cMatrix/\x3e");c.m11=a.xx;c.m21=a.xy;c.m12=a.yx;c.m22=a.yy;c.offsetX=
a.dx;c.offsetY=a.dy;f.matrix=c;b.renderTransform=f}else b.renderTransform=null;return this},setRawNode:function(a){a.fill=null;a.stroke=null;this.rawNode=a;this.rawNode.tag=this.getUID()},_moveToFront:function(){var a=this.parent.rawNode.children,b=this.rawNode;a.remove(b);a.add(b);return this},_moveToBack:function(){var a=this.parent.rawNode.children,b=this.rawNode;a.remove(b);a.insert(0,b);return this},_getAdjustedMatrix:function(){return this.matrix},setClip:function(a){this.inherited(arguments);
var b=this.rawNode;if(a){var c=a?"width"in a?"rect":"cx"in a?"ellipse":"points"in a?"polyline":"d"in a?"path":null:null;if(a&&!c)return this;var f=this.getBoundingBox()||{x:0,y:0,width:0,height:0},g="1,0,0,1,"+-f.x+","+-f.y;switch(c){case "rect":b.clip=b.getHost().content.createFromXaml("\x3cRectangleGeometry/\x3e");b.clip.rect=a.x+","+a.y+","+a.width+","+a.height;b.clip.transform=g;break;case "ellipse":b.clip=b.getHost().content.createFromXaml("\x3cEllipseGeometry/\x3e");b.clip.center=a.cx+","+a.cy;
b.clip.radiusX=a.rx;b.clip.radiusY=a.ry;b.clip.transform="1,0,0,1,"+-f.x+","+-f.y;break;case "polyline":if(2<a.points.length){var g=b.getHost().content.createFromXaml("\x3cPathGeometry/\x3e"),d=b.getHost().content.createFromXaml("\x3cPathFigure/\x3e");d.StartPoint=a.points[0]+","+a.points[1];for(var e=2;e<=a.points.length-2;e+=2)c=b.getHost().content.createFromXaml("\x3cLineSegment/\x3e"),c.Point=a.points[e]+","+a.points[e+1],d.segments.add(c);g.figures.add(d);g.transform="1,0,0,1,"+-f.x+","+-f.y;
b.clip=g}}}else b.clip=null;return this}});d.Group=l("dojox.gfx.silverlight.Group",d.Shape,{constructor:function(){h.Container._init.call(this)},setRawNode:function(a){this.rawNode=a;this.rawNode.tag=this.getUID()},destroy:function(){this.clear(!0);d.Shape.prototype.destroy.apply(this,arguments)}});d.Group.nodeType="Canvas";d.Rect=l("dojox.gfx.silverlight.Rect",[d.Shape,h.Rect],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;a.width=b.width;
a.height=b.height;a.radiusX=a.radiusY=b.r;return this._applyTransform()},_getAdjustedMatrix:function(){var a=this.matrix,b=this.shape,b={dx:b.x,dy:b.y};return new e.Matrix2D(a?[a,b]:b)}});d.Rect.nodeType="Rectangle";d.Ellipse=l("dojox.gfx.silverlight.Ellipse",[d.Shape,h.Ellipse],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;a.width=2*b.rx;a.height=2*b.ry;return this._applyTransform()},_getAdjustedMatrix:function(){var a=this.matrix,
b=this.shape,b={dx:b.cx-b.rx,dy:b.cy-b.ry};return new e.Matrix2D(a?[a,b]:b)}});d.Ellipse.nodeType="Ellipse";d.Circle=l("dojox.gfx.silverlight.Circle",[d.Shape,h.Circle],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;a.width=a.height=2*this.shape.r;return this._applyTransform()},_getAdjustedMatrix:function(){var a=this.matrix,b=this.shape,b={dx:b.cx-b.r,dy:b.cy-b.r};return new e.Matrix2D(a?[a,b]:b)}});d.Circle.nodeType="Ellipse";d.Line=l("dojox.gfx.silverlight.Line",
[d.Shape,h.Line],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;a.x1=b.x1;a.y1=b.y1;a.x2=b.x2;a.y2=b.y2;return this}});d.Line.nodeType="Line";d.Polyline=l("dojox.gfx.silverlight.Polyline",[d.Shape,h.Polyline],{setShape:function(a,b){a&&a instanceof Array?(this.shape=e.makeParameters(this.shape,{points:a}),b&&this.shape.points.length&&this.shape.points.push(this.shape.points[0])):this.shape=e.makeParameters(this.shape,a);this.bbox=null;
this._normalizePoints();for(var c=this.shape.points,f=[],d=0;d<c.length;++d)f.push(c[d].x,c[d].y);this.rawNode.points=f.join(",");return this}});d.Polyline.nodeType="Polyline";d.Image=l("dojox.gfx.silverlight.Image",[d.Shape,h.Image],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;a.width=b.width;a.height=b.height;a.source=b.src;return this._applyTransform()},_getAdjustedMatrix:function(){var a=this.matrix,b=this.shape,b={dx:b.x,dy:b.y};
return new e.Matrix2D(a?[a,b]:b)},setRawNode:function(a){this.rawNode=a;this.rawNode.tag=this.getUID()}});d.Image.nodeType="Image";d.Text=l("dojox.gfx.silverlight.Text",[d.Shape,h.Text],{setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;a.text=""+b.text;a.textDecorations="underline"===b.decoration?"Underline":"None";a["Canvas.Left"]=-1E4;a["Canvas.Top"]=-1E4;this._delay||(this._delay=window.setTimeout(k.hitch(this,"_delayAlignment"),10));
return this},_delayAlignment:function(){var a=this.rawNode,b=this.shape,c,f;try{c=a.actualWidth,f=a.actualHeight}catch(d){return}var e=b.x;f=b.y-0.75*f;switch(b.align){case "middle":e-=c/2;break;case "end":e-=c}this._delta={dx:e,dy:f};a["Canvas.Left"]=0;a["Canvas.Top"]=0;this._applyTransform();delete this._delay},_getAdjustedMatrix:function(){var a=this.matrix,b=this._delta;return new e.Matrix2D(a?b?[a,b]:a:b?b:{})},setStroke:function(){return this},_setFillAttr:function(a){this.rawNode.foreground=
a},setRawNode:function(a){this.rawNode=a;this.rawNode.tag=this.getUID()},getTextWidth:function(){return this.rawNode.actualWidth},getBoundingBox:function(){var a=null,b=this.getShape().text,c=this.rawNode,f=0,d=0;if(!e._base._isRendered(this))return{x:0,y:0,width:0,height:0};if(b){try{f=c.actualWidth,d=c.actualHeight}catch(h){return null}a=e._base._computeTextLocation(this.getShape(),f,d,!0);a={x:a.x,y:a.y,width:f,height:d}}return a}});d.Text.nodeType="TextBlock";d.Path=l("dojox.gfx.silverlight.Path",
[d.Shape,v.Path],{_updateWithSegment:function(a){this.inherited(arguments);var b=this.shape.path;"string"==typeof b&&(this.rawNode.data=b?b:null)},setShape:function(a){this.inherited(arguments);var b=this.shape.path;this.rawNode.data=b?b:null;return this}});d.Path.nodeType="Path";d.TextPath=l("dojox.gfx.silverlight.TextPath",[d.Shape,v.TextPath],{_updateWithSegment:function(a){},setShape:function(a){},_setText:function(){}});d.TextPath.nodeType="text";var q={},G=new Function;d.Surface=l("dojox.gfx.silverlight.Surface",
h.Surface,{constructor:function(){h.Container._init.call(this)},destroy:function(){this.clear(!0);window[this._onLoadName]=G;delete q[this._nodeName];this.inherited(arguments)},setDimensions:function(a,b){this.width=e.normalizedLength(a);this.height=e.normalizedLength(b);var c=this.rawNode&&this.rawNode.getHost();c&&(c.width=a,c.height=b);return this},getDimensions:function(){var a=this.rawNode&&this.rawNode.getHost(),a=a?{width:a.content.actualWidth,height:a.content.actualHeight}:null;0>=a.width&&
(a.width=this.width);0>=a.height&&(a.height=this.height);return a}});d.createSurface=function(a,b,c){if(!b&&!c){var f=t.position(a);b=b||f.w;c=c||f.h}"number"==typeof b&&(b+="px");"number"==typeof c&&(c+="px");var g=new d.Surface;a=r.byId(a);g._parent=a;g._nodeName=e._base._getUniqueId();f=a.ownerDocument.createElement("script");f.type="text/xaml";f.id=e._base._getUniqueId();f.text="\x3c?xml version\x3d'1.0'?\x3e\x3cCanvas xmlns\x3d'http://schemas.microsoft.com/client/2007' Name\x3d'"+g._nodeName+
"'/\x3e";a.parentNode.insertBefore(f,a);g._nodes.push(f);var h=e._base._getUniqueId(),k="__"+e._base._getUniqueId()+"_onLoad";g._onLoadName=k;window[k]=function(b){g.rawNode||(g.rawNode=r.byId(h,a.ownerDocument).content.root,q[g._nodeName]=a,g.onLoad(g))};f=u("safari")?"\x3cembed type\x3d'application/x-silverlight' id\x3d'"+h+"' width\x3d'"+b+"' height\x3d'"+c+" background\x3d'transparent' source\x3d'#"+f.id+"' windowless\x3d'true' maxFramerate\x3d'60' onLoad\x3d'"+k+"' onError\x3d'__dojoSilverlightError' /\x3e\x3ciframe style\x3d'visibility:hidden;height:0;width:0'/\x3e":
"\x3cobject type\x3d'application/x-silverlight' data\x3d'data:application/x-silverlight,' id\x3d'"+h+"' width\x3d'"+b+"' height\x3d'"+c+"'\x3e\x3cparam name\x3d'background' value\x3d'transparent' /\x3e\x3cparam name\x3d'source' value\x3d'#"+f.id+"' /\x3e\x3cparam name\x3d'windowless' value\x3d'true' /\x3e\x3cparam name\x3d'maxFramerate' value\x3d'60' /\x3e\x3cparam name\x3d'onLoad' value\x3d'"+k+"' /\x3e\x3cparam name\x3d'onError' value\x3d'__dojoSilverlightError' /\x3e\x3c/object\x3e";a.innerHTML=
f;f=r.byId(h,a.ownerDocument);f.content&&f.content.root?(g.rawNode=f.content.root,q[g._nodeName]=a):(g.rawNode=null,g.isLoaded=!1);g._nodes.push(f);g.width=e.normalizedLength(b);g.height=e.normalizedLength(c);return g};__dojoSilverlightError=function(a,b){};var p=h.Container;n={add:function(a){this!=a.getParent()&&(p.add.apply(this,arguments),this.rawNode.children.add(a.rawNode));return this},remove:function(a,b){if(this==a.getParent()){var c=a.rawNode.getParent();c&&c.children.remove(a.rawNode);
p.remove.apply(this,arguments)}return this},clear:function(){this.rawNode.children.clear();return p.clear.apply(this,arguments)},getBoundingBox:p.getBoundingBox,_moveChildToFront:p._moveChildToFront,_moveChildToBack:p._moveChildToBack};l={createObject:function(a,b){if(!this.rawNode)return null;var c=new a,d=this.rawNode.getHost().content.createFromXaml("\x3c"+a.nodeType+"/\x3e");c.setRawNode(d);c.setShape(b);this.add(c);return c}};k.extend(d.Text,{_setFont:function(){var a=this.fontStyle,b=this.rawNode,
c=a.family.toLowerCase();b.fontStyle="italic"==a.style?"Italic":"Normal";b.fontWeight=a.weight in z?z[a.weight]:a.weight;b.fontSize=e.normalizedLength(a.size);b.fontFamily=c in A?A[c]:a.family;this._delay||(this._delay=window.setTimeout(k.hitch(this,"_delayAlignment"),10))}});k.extend(d.Group,n);k.extend(d.Group,h.Creator);k.extend(d.Group,l);k.extend(d.Surface,n);k.extend(d.Surface,h.Creator);k.extend(d.Surface,l);var B={onclick:{name:"MouseLeftButtonUp",fix:m},onmouseenter:{name:"MouseEnter",fix:m},
onmouseleave:{name:"MouseLeave",fix:m},onmouseover:{name:"MouseEnter",fix:m},onmouseout:{name:"MouseLeave",fix:m},onmousedown:{name:"MouseLeftButtonDown",fix:m},onmouseup:{name:"MouseLeftButtonUp",fix:m},onmousemove:{name:"MouseMove",fix:m},onkeydown:{name:"KeyDown",fix:x},onkeyup:{name:"KeyUp",fix:x}};n={connect:function(a,b,c){return this.on(a,c?k.hitch(b,c):b)},on:function(a,b){if("string"===typeof a){0===a.indexOf("mouse")&&(a="on"+a);var c,d=a in B?B[a]:{name:a,fix:function(){return{}}};c=this.getEventSource().addEventListener(d.name,
function(a,c){b(d.fix(a,c))});return{name:d.name,token:c,remove:k.hitch(this,function(){this.getEventSource().removeEventListener(d.name,c)})}}return D(this,a,b)},disconnect:function(a){return a.remove()}};k.extend(d.Shape,n);k.extend(d.Surface,n);e.equalSources=function(a,b){return a&&b&&a.equals(b)};return d});
//@ sourceMappingURL=silverlight.js.map