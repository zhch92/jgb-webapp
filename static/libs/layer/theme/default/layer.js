import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'layui-layer-imgbar': {
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap'
  },
  'layui-layer-imgtit a': {
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap'
  },
  'layui-layer-tab layui-layer-title span': {
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap'
  },
  'layui-layer-title': {
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap'
  },
  '*html': {
    'backgroundImage': 'url(about:blank)',
    'backgroundAttachment': 'fixed'
  },
  'html #layuicss-skinlayercss': {
    'display': 'none',
    'position': 'absolute',
    'width': [{ 'unit': 'px', 'value': 1989 }]
  },
  'layui-layer': {
    'position': 'fixed',
    '_position': 'absolute',
    'pointerEvents': 'auto'
  },
  'layui-layer-shade': {
    'position': 'fixed',
    '_position': 'absolute',
    'pointerEvents': 'auto'
  },
  'layui-layer-shade': {
    'top': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    '_height': 'expression(document.body.offsetHeight+"px")'
  },
  'layui-layer': {
    'WebkitOverflowScrolling': 'touch',
    'top': [{ 'unit': 'px', 'value': 150 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'backgroundColor': '#fff',
    'WebkitBackgroundClip': 'content',
    'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'string', 'value': 'rgba(0,0,0,.3)' }]
  },
  'layui-layer-close': {
    'position': 'absolute'
  },
  'layui-layer-content': {
    'position': 'relative'
  },
  'layui-layer-border': {
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#B2B2B2' }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'rgba(0,0,0,.1)' }],
    'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'rgba(0,0,0,.2)' }]
  },
  'layui-layer-load': {
    'background': 'url(loading-1.gif) center center no-repeat #eee'
  },
  'layui-layer-ico': {
    'background': 'url(icon.png) no-repeat'
  },
  'layui-layer-btn a': {
    'display': 'inline-block',
    '*display': 'inline',
    '*zoom': '1',
    'verticalAlign': 'top'
  },
  'layui-layer-dialog layui-layer-ico': {
    'display': 'inline-block',
    '*display': 'inline',
    '*zoom': '1',
    'verticalAlign': 'top'
  },
  'layui-layer-setwin a': {
    'display': 'inline-block',
    '*display': 'inline',
    '*zoom': '1',
    'verticalAlign': 'top'
  },
  'layui-layer-move': {
    'display': 'none',
    'position': 'fixed',
    '*position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'top': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'cursor': 'move',
    'opacity': '0',
    'filter': 'alpha(opacity=0)',
    'backgroundColor': '#fff',
    'zIndex': '2147483647'
  },
  'layui-layer-resize': {
    'position': 'absolute',
    'width': [{ 'unit': 'px', 'value': 15 }],
    'height': [{ 'unit': 'px', 'value': 15 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'cursor': 'se-resize'
  },
  'layui-layer': {
    'borderRadius': '2px',
    'WebkitAnimationFillMode': 'both',
    'animationFillMode': 'both',
    'WebkitAnimationDuration': '.3s',
    'animationDuration': '.3s'
  },
  'layer-anim': {
    'WebkitAnimationName': 'bounceIn',
    'animationName': 'bounceIn'
  },
  'layer-anim-01': {
    'WebkitAnimationName': 'zoomInDown',
    'animationName': 'zoomInDown'
  },
  'layer-anim-02': {
    'WebkitAnimationName': 'fadeInUpBig',
    'animationName': 'fadeInUpBig'
  },
  'layer-anim-03': {
    'WebkitAnimationName': 'zoomInLeft',
    'animationName': 'zoomInLeft'
  },
  'layer-anim-04': {
    'WebkitAnimationName': 'rollIn',
    'animationName': 'rollIn'
  },
  'layer-anim-05': {
    'WebkitAnimationName': 'fadeIn',
    'animationName': 'fadeIn'
  },
  'layer-anim-06': {
    'WebkitAnimationName': 'shake',
    'animationName': 'shake'
  },
  'layer-anim-close': {
    'WebkitAnimationName': 'bounceOut',
    'animationName': 'bounceOut',
    'WebkitAnimationDuration': '.2s',
    'animationDuration': '.2s'
  },
  'layui-layer-title': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 80 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }],
    'height': [{ 'unit': 'px', 'value': 42 }],
    'lineHeight': [{ 'unit': 'px', 'value': 42 }],
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#eee' }],
    'fontSize': [{ 'unit': 'px', 'value': 14 }],
    'color': '#333',
    'overflow': 'hidden',
    'backgroundColor': '#F8F8F8',
    'borderRadius': '2px 2px 0 0'
  },
  'layui-layer-setwin': {
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 15 }],
    '*right': '0',
    'top': [{ 'unit': 'px', 'value': 15 }],
    'fontSize': [{ 'unit': 'px', 'value': 0 }],
    'lineHeight': [{ 'unit': 'string', 'value': 'initial' }]
  },
  'layui-layer-setwin a': {
    'position': 'relative',
    'width': [{ 'unit': 'px', 'value': 16 }],
    'height': [{ 'unit': 'px', 'value': 16 }],
    'marginLeft': [{ 'unit': 'px', 'value': 10 }],
    'fontSize': [{ 'unit': 'px', 'value': 12 }],
    '_overflow': 'hidden'
  },
  'layui-layer-setwin layui-layer-min cite': {
    'position': 'absolute',
    'width': [{ 'unit': 'px', 'value': 14 }],
    'height': [{ 'unit': 'px', 'value': 2 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'marginTop': [{ 'unit': 'px', 'value': -1 }],
    'backgroundColor': '#2E2D3C',
    'cursor': 'pointer',
    '_overflow': 'hidden'
  },
  'layui-layer-setwin layui-layer-min:hover cite': {
    'backgroundColor': '#2D93CA'
  },
  'layui-layer-setwin layui-layer-max': {
    'backgroundPosition': '-32px -40px'
  },
  'layui-layer-setwin layui-layer-max:hover': {
    'backgroundPosition': '-16px -40px'
  },
  'layui-layer-setwin layui-layer-maxmin': {
    'backgroundPosition': '-65px -40px'
  },
  'layui-layer-setwin layui-layer-maxmin:hover': {
    'backgroundPosition': '-49px -40px'
  },
  'layui-layer-setwin layui-layer-close1': {
    'backgroundPosition': '0 -40px',
    'cursor': 'pointer'
  },
  'layui-layer-setwin layui-layer-close1:hover': {
    'opacity': '.7'
  },
  'layui-layer-setwin layui-layer-close2': {
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': -28 }],
    'top': [{ 'unit': 'px', 'value': -28 }],
    'width': [{ 'unit': 'px', 'value': 30 }],
    'height': [{ 'unit': 'px', 'value': 30 }],
    'marginLeft': [{ 'unit': 'px', 'value': 0 }],
    'backgroundPosition': '-149px -31px',
    '*right': '-18px',
    '_display': 'none'
  },
  'layui-layer-setwin layui-layer-close2:hover': {
    'backgroundPosition': '-180px -31px'
  },
  'layui-layer-btn': {
    'textAlign': 'right',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 10 }],
    'pointerEvents': 'auto',
    'userSelect': 'none',
    'WebkitUserSelect': 'none'
  },
  'layui-layer-btn a': {
    'height': [{ 'unit': 'px', 'value': 28 }],
    'lineHeight': [{ 'unit': 'px', 'value': 28 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 6 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 15 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#dedede' }],
    'backgroundColor': '#f1f1f1',
    'color': '#333',
    'borderRadius': '2px',
    'fontWeight': '400',
    'cursor': 'pointer',
    'textDecoration': 'none'
  },
  'layui-layer-btn a:hover': {
    'opacity': '.9',
    'textDecoration': 'none'
  },
  'layui-layer-btn a:active': {
    'opacity': '.8'
  },
  'layui-layer-btn layui-layer-btn0': {
    'borderColor': '#1b65ce',
    'backgroundColor': '#1b65ce',
    'color': '#fff',
    'borderRadius': '4px',
    'fontSize': [{ 'unit': 'px', 'value': 14 }]
  },
  'layui-layer-btn-l': {
    'textAlign': 'left'
  },
  'layui-layer-btn-c': {
    'textAlign': 'center'
  },
  'layui-layer-dialog': {
    'minWidth': [{ 'unit': 'px', 'value': 260 }]
  },
  'layui-layer-dialog layui-layer-content': {
    'position': 'relative',
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }],
    'lineHeight': [{ 'unit': 'px', 'value': 24 }],
    'wordBreak': 'break-all',
    'overflow': 'hidden',
    'fontSize': [{ 'unit': 'px', 'value': 14 }],
    'overflowX': 'hidden',
    'overflowY': 'auto'
  },
  'layui-layer-dialog layui-layer-content layui-layer-ico': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 16 }],
    'left': [{ 'unit': 'px', 'value': 15 }],
    '_left': '-40px',
    'width': [{ 'unit': 'px', 'value': 30 }],
    'height': [{ 'unit': 'px', 'value': 30 }]
  },
  'layui-layer-ico1': {
    'backgroundPosition': '-30px 0'
  },
  'layui-layer-ico2': {
    'backgroundPosition': '-60px 0'
  },
  'layui-layer-ico3': {
    'backgroundPosition': '-90px 0'
  },
  'layui-layer-ico4': {
    'backgroundPosition': '-120px 0'
  },
  'layui-layer-ico5': {
    'backgroundPosition': '-150px 0'
  },
  'layui-layer-ico6': {
    'backgroundPosition': '-180px 0'
  },
  'layui-layer-rim': {
    'border': [{ 'unit': 'px', 'value': 6 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#8D8D8D' }],
    'border': [{ 'unit': 'px', 'value': 6 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'rgba(0,0,0,.3)' }],
    'borderRadius': '5px',
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-msg': {
    'minWidth': [{ 'unit': 'px', 'value': 180 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D3D4D3' }],
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-hui': {
    'minWidth': [{ 'unit': 'px', 'value': 100 }],
    'backgroundColor': '#000',
    'filter': 'alpha(opacity=60)',
    'backgroundColor': 'rgba(0,0,0,.6)',
    'color': '#fff',
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-hui layui-layer-content': {
    'padding': [{ 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 25 }, { 'unit': 'px', 'value': 12 }, { 'unit': 'px', 'value': 25 }],
    'textAlign': 'center'
  },
  'layui-layer-dialog layui-layer-padding': {
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 55 }],
    'textAlign': 'left'
  },
  'layui-layer-page layui-layer-content': {
    'position': 'relative',
    'overflow': 'auto'
  },
  'layui-layer-iframe layui-layer-btn': {
    'paddingTop': [{ 'unit': 'px', 'value': 10 }]
  },
  'layui-layer-page layui-layer-btn': {
    'paddingTop': [{ 'unit': 'px', 'value': 10 }]
  },
  'layui-layer-nobg': {
    'background': '0 0'
  },
  'layui-layer-iframe iframe': {
    'display': 'block',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'layui-layer-loading': {
    'borderRadius': '100%',
    'background': '0 0',
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }],
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-loading layui-layer-content': {
    'width': [{ 'unit': 'px', 'value': 60 }],
    'height': [{ 'unit': 'px', 'value': 24 }],
    'background': 'url(loading-0.gif) no-repeat'
  },
  'layui-layer-loading layui-layer-loading1': {
    'width': [{ 'unit': 'px', 'value': 37 }],
    'height': [{ 'unit': 'px', 'value': 37 }],
    'background': 'url(loading-1.gif) no-repeat'
  },
  'layui-layer-ico16': {
    'width': [{ 'unit': 'px', 'value': 32 }],
    'height': [{ 'unit': 'px', 'value': 32 }],
    'background': 'url(loading-2.gif) no-repeat'
  },
  'layui-layer-loading layui-layer-loading2': {
    'width': [{ 'unit': 'px', 'value': 32 }],
    'height': [{ 'unit': 'px', 'value': 32 }],
    'background': 'url(loading-2.gif) no-repeat'
  },
  'layui-layer-tips': {
    'background': '0 0',
    'boxShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }],
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-tips layui-layer-content': {
    'position': 'relative',
    'lineHeight': [{ 'unit': 'px', 'value': 22 }],
    'minWidth': [{ 'unit': 'px', 'value': 12 }],
    'padding': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 10 }],
    'fontSize': [{ 'unit': 'px', 'value': 12 }],
    '_float': 'left',
    'borderRadius': '2px',
    'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'string', 'value': 'rgba(0,0,0,.2)' }],
    'backgroundColor': '#000',
    'color': '#fff'
  },
  'layui-layer-tips layui-layer-close': {
    'right': [{ 'unit': 'px', 'value': -2 }],
    'top': [{ 'unit': 'px', 'value': -1 }]
  },
  'layui-layer-tips ilayui-layer-TipsG': {
    'position': 'absolute',
    'width': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': 'px', 'value': 0 }],
    'borderWidth': '8px',
    'borderColor': 'transparent',
    'borderStyle': 'dashed',
    '*overflow': 'hidden'
  },
  'layui-layer-tips ilayui-layer-TipsB': {
    'left': [{ 'unit': 'px', 'value': 5 }],
    'borderRightStyle': 'solid',
    'borderRightColor': '#000'
  },
  'layui-layer-tips ilayui-layer-TipsT': {
    'left': [{ 'unit': 'px', 'value': 5 }],
    'borderRightStyle': 'solid',
    'borderRightColor': '#000'
  },
  'layui-layer-tips ilayui-layer-TipsT': {
    'bottom': [{ 'unit': 'px', 'value': -8 }]
  },
  'layui-layer-tips ilayui-layer-TipsB': {
    'top': [{ 'unit': 'px', 'value': -8 }]
  },
  'layui-layer-tips ilayui-layer-TipsL': {
    'top': [{ 'unit': 'px', 'value': 1 }],
    'borderBottomStyle': 'solid',
    'borderBottomColor': '#000'
  },
  'layui-layer-tips ilayui-layer-TipsR': {
    'top': [{ 'unit': 'px', 'value': 1 }],
    'borderBottomStyle': 'solid',
    'borderBottomColor': '#000'
  },
  'layui-layer-tips ilayui-layer-TipsR': {
    'left': [{ 'unit': 'px', 'value': -8 }]
  },
  'layui-layer-tips ilayui-layer-TipsL': {
    'right': [{ 'unit': 'px', 'value': -8 }]
  },
  'layui-layer-lan[type=dialog]': {
    'minWidth': [{ 'unit': 'px', 'value': 280 }]
  },
  'layui-layer-lan layui-layer-title': {
    'background': '#4476A7',
    'color': '#fff',
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-lan layui-layer-btn': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }],
    'textAlign': 'right',
    'borderTop': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#E9E7E7' }]
  },
  'layui-layer-lan layui-layer-btn a': {
    'background': '#BBB5B5',
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-lan layui-layer-btn layui-layer-btn1': {
    'background': '#C9C5C5'
  },
  'layui-layer-molv layui-layer-title': {
    'background': '#009f95',
    'color': '#fff',
    'border': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-molv layui-layer-btn a': {
    'background': '#009f95'
  },
  'layui-layer-molv layui-layer-btn layui-layer-btn1': {
    'background': '#92B8B1'
  },
  'layui-layer-iconext': {
    'background': 'url(icon-ext.png) no-repeat'
  },
  'layui-layer-prompt layui-layer-input': {
    'display': 'block',
    'width': [{ 'unit': 'px', 'value': 220 }],
    'height': [{ 'unit': 'px', 'value': 30 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'lineHeight': [{ 'unit': 'px', 'value': 30 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 5 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'rgba(0,0,0,.1)' }, { 'unit': 'string', 'value': 'rgba(0,0,0,.1)' }, { 'unit': 'string', 'value': 'inset' }],
    'color': '#333'
  },
  'layui-layer-prompt textarealayui-layer-input': {
    'width': [{ 'unit': 'px', 'value': 300 }],
    'height': [{ 'unit': 'px', 'value': 100 }],
    'lineHeight': [{ 'unit': 'px', 'value': 20 }]
  },
  'layui-layer-prompt layui-layer-content': {
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }]
  },
  'layui-layer-prompt layui-layer-btn': {
    'paddingTop': [{ 'unit': 'px', 'value': 0 }]
  },
  'layui-layer-tab': {
    'boxShadow': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 1 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'string', 'value': 'rgba(0,0,0,.4)' }]
  },
  'layui-layer-tab layui-layer-title': {
    'paddingLeft': [{ 'unit': 'px', 'value': 0 }],
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'backgroundColor': '#eee',
    'overflow': 'visible'
  },
  'layui-layer-tab layui-layer-title span': {
    'position': 'relative',
    'float': 'left',
    'minWidth': [{ 'unit': 'px', 'value': 80 }],
    'maxWidth': [{ 'unit': 'px', 'value': 260 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }],
    'textAlign': 'center',
    'cursor': 'default',
    'overflow': 'hidden'
  },
  'layui-layer-tab layui-layer-title spanlayui-layer-tabnow': {
    'height': [{ 'unit': 'px', 'value': 43 }],
    'borderLeft': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'borderRight': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#ccc' }],
    'backgroundColor': '#fff',
    'zIndex': '10'
  },
  'layui-layer-tab layui-layer-title span:first-child': {
    'borderLeft': [{ 'unit': 'string', 'value': 'none' }]
  },
  'layui-layer-tabmain': {
    'lineHeight': [{ 'unit': 'px', 'value': 24 }],
    'clear': 'both'
  },
  'layui-layer-tabmain layui-layer-tabli': {
    'display': 'none'
  },
  'layui-layer-tabmain layui-layer-tablixubox_tab_layer': {
    'display': 'block'
  },
  'xubox_tabclose': {
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 10 }],
    'top': [{ 'unit': 'px', 'value': 5 }],
    'cursor': 'pointer'
  },
  'layui-layer-photos': {
    'WebkitAnimationDuration': '1s',
    'animationDuration': '1s'
  },
  'layui-layer-photos layui-layer-content': {
    'overflow': 'hidden',
    'textAlign': 'center'
  },
  'layui-layer-photos layui-layer-phimg img': {
    'position': 'relative',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'display': 'inline-block',
    '*display': 'inline',
    '*zoom': '1',
    'verticalAlign': 'top'
  },
  'layui-layer-imgbar': {
    'display': 'none'
  },
  'layui-layer-imguide': {
    'display': 'none'
  },
  'layui-layer-imgnext': {
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'width': [{ 'unit': 'px', 'value': 27 }],
    '_width': '44px',
    'height': [{ 'unit': 'px', 'value': 44 }],
    'marginTop': [{ 'unit': 'px', 'value': -22 }],
    'outline': '0',
    'blr': 'expression(this.onFocus=this.blur())'
  },
  'layui-layer-imgprev': {
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'width': [{ 'unit': 'px', 'value': 27 }],
    '_width': '44px',
    'height': [{ 'unit': 'px', 'value': 44 }],
    'marginTop': [{ 'unit': 'px', 'value': -22 }],
    'outline': '0',
    'blr': 'expression(this.onFocus=this.blur())'
  },
  'layui-layer-imgprev': {
    'left': [{ 'unit': 'px', 'value': 10 }],
    'backgroundPosition': '-5px -5px',
    '_backgroundPosition': '-70px -5px'
  },
  'layui-layer-imgprev:hover': {
    'backgroundPosition': '-33px -5px',
    '_backgroundPosition': '-120px -5px'
  },
  'layui-layer-imgnext': {
    'right': [{ 'unit': 'px', 'value': 10 }],
    '_right': '8px',
    'backgroundPosition': '-5px -50px',
    '_backgroundPosition': '-70px -50px'
  },
  'layui-layer-imgnext:hover': {
    'backgroundPosition': '-33px -50px',
    '_backgroundPosition': '-120px -50px'
  },
  'layui-layer-imgbar': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'px', 'value': 32 }],
    'lineHeight': [{ 'unit': 'px', 'value': 32 }],
    'backgroundColor': 'rgba(0,0,0,.8)',
    'backgroundColor': '#000\9',
    'filter': 'Alpha(opacity=80)',
    'color': '#fff',
    'overflow': 'hidden',
    'fontSize': [{ 'unit': 'px', 'value': 0 }]
  },
  'layui-layer-imgtit *': {
    'display': 'inline-block',
    '*display': 'inline',
    '*zoom': '1',
    'verticalAlign': 'top',
    'fontSize': [{ 'unit': 'px', 'value': 12 }]
  },
  'layui-layer-imgtit a': {
    'maxWidth': [{ 'unit': '%H', 'value': 0.65 }],
    'overflow': 'hidden',
    'color': '#fff'
  },
  'layui-layer-imgtit a:hover': {
    'color': '#fff',
    'textDecoration': 'underline'
  },
  'layui-layer-imgtit em': {
    'paddingLeft': [{ 'unit': 'px', 'value': 10 }],
    'fontStyle': 'normal'
  }
});
