/**
 * Created by ruituo on 16/6/16.
 */
window.onload = function () {
    imgLocation("container", "box")
    var imgData = {"data":[{"src":"1.png"},{"src":"2.png"},{"src":"3.png"},{"src":"4.png"},{"src":"5.png"},{"src":"6.png"}]}
    window.onscroll = function () {
        if (checkFlag()){
            var cparent = document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}
//判断是否需要上拉加载更多
function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    //最后一个的顶部
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    //网页被卷进去的高
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //可见区域高度
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    // console.log(lastContentHeight);
    if (lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}

function imgLocation(parent,content) {
//    将parent下多有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);
    var imgWidth = ccontent[0].offsetWidth;
    console.log(imgWidth);
    //每行的个数
    var cols = Math.floor(document.documentElement.clientWidth/imgWidth);
    console.log(cols);
    //不让图片随屏幕宽度乱动
    cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto";
    //
    // 个数为第一排的个数
    var BoxHeightArr = [];
    for(var i = 0;i<ccontent.length;i++){
        if(i<cols){
            BoxHeightArr[i] = ccontent[i].offsetHeight;
        }else {
            var minHeight = Math.min.apply(null,BoxHeightArr);
            var minIndex = getminheightLocation(BoxHeightArr,minHeight);
            // 算出其余的位置,拼接到最短的上面,最短的那个高度变化
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}
//计算出最短的那个位置
function getminheightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if (BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}
//box的数组
function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    console.log(allcontent.length);
    for(var i = 0;i<allcontent.length;i++){
        if (allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}