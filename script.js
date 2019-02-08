var successBtn = document.getElementById("select");
var quantity_img = document.getElementById("quantity_img");
var img_wrap = document.getElementById("img_wrap");
var tableInfoBtn = document.getElementById("tableInfoBtn");
var img_src = "./img/";

var gallery = [
    "adult-3170055__340.jpg",
    "alk-bielobrada-3614404__340.jpg",
    "auto-3298890__340.jpg",
    "belfry-2611573__340.jpg",
    "bookshelf-413705__340.jpg",
    "buzzard-2287699__340.jpg",
    "canyon-1356886__340.jpg",
    "christmas-motif-3834860__340.jpg",
    "cows-3536058__340.jpg",
    "cozy-2681090__340.jpg",
    "daisy-3508963__340.jpg",
    "dalia-2677502__340.jpg",
    "dog-3735336__340.jpg",
    "elephants-1900332__340.jpg",
    "field-192179__340.jpg",
    "flower-3876195__340.jpg",
    "flowers-3975556__340.jpg",
    "glass-3306625__340.jpg",
    "gourds-2855925__340.jpg",
    "hamburg-3846525__340.jpg",
    "houses-1622066__340.jpg",
    "ice-2817112__340.jpg",
    "knowledge-1052013__340.jpg",
    "lake-3918137__340.jpg",
    "landscape-3604825__340.jpg",
    "landscape-3913574__340.jpg",
    "lavender-3490600__340.jpg",
    "leaf-3865014__340.jpg",
    "lichterkette-3834926__340.jpg",
    "mountain-806915__340.jpg",
    "mountains-3959204__340.jpg",
    "nature-3373196__340.jpg",
    "open-fire-3879031__340.jpg",
    "pentacon-1448444__340.jpg",
    "pink-2566241__340.jpg",
    "plouzane-1758197__340.jpg",
    "plume-2428666__340.jpg",
    "rays-3902368__340.jpg",
    "red-panda-1982445__340.jpg",
    "salt-harvesting-3060093__340.jpg",
    "tree-3822149__340.jpg",
    "usa-1777986__340.jpg",
    "vintage-2203715__340.jpg",
    "water-lily-3784022__340.jpg",
];

// function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomImg() {
//     return "https://picsum.photos/200/300/?image=" + getRandom(1, 1084);
// }

function getInfo(e) {
    var img = new Image();
    img.onload = function(){
        img.realHeight = this.height;
        img.realWidth = this.width;

        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", this.src, true);
        xhr.onreadystatechange = function(){

            if(this.readyState == 4 && this.status==200){
                img.realSize = xhr.getResponseHeader("Content-Length");
            }

            e.target.nextSibling.style.display = "block";
            e.target.nextSibling.innerHTML = "<p class='realHeight'>Высота: <span>" + img.realHeight + "</span></p>"
                                            +"<p class='realWidth'>Ширина: <span>" + img.realWidth + "</span></p>"
                                            +"<p class='realSize'>Размер: <span>" + img.realSize + "</span> Кб</p>";
        };

        xhr.send(null);
    };
    
    img.src = e.target.src;
    
}

function ready() {

    img_wrap.innerHTML = "";
    var quantity_img_val = quantity_img.value;


    for(var i=1; i<=quantity_img_val; i++) {
        var DOM_img = new Image();
        DOM_img.title = gallery[i];
        DOM_img.src = img_src + gallery[i];
        var imgBlock = document.createElement("div");
        imgBlock.className = "imgBlock";
        var info = document.createElement("div");
        info.className = "info";

        img_wrap.append(imgBlock);
        imgBlock.append(DOM_img);
        imgBlock.append(info);

        DOM_img.onload = function(){

            fetch(this.src).then(response => {
                this.nextSibling.innerHTML = "<p class='fileName'>Имя: <span>" + this.title + "</span></p>"
                        +"<p class='realHeight'>Высота: <span>" + this.naturalHeight + "</span></p>"
                        +"<p class='realWidth'>Ширина: <span>" + this.naturalWidth + "</span></p>"
                        +"<p class='realSize'>Размер: <span>" + response.headers.get("content-length") + "</span> Кб</p>";


            });
        };

    }

    var image = document.querySelectorAll("img");

    for(var j = 0; j < image.length; j++) {
        image[j].onmouseover = getInfo;
        image[j].onmouseleave = function(e) {
            e.target.nextSibling.style.display = "none";
        }
    }

    if (imgBlock != undefined) {
        tableInfoBtn.style.display = "inline-block";
    }
}

function getTableInfo() {
    var tableInfo = document.getElementById("tableInfo");
    var info = document.querySelectorAll(".info");

    if( document.querySelectorAll(".imgBlock").length == 0 ) {
        tableInfo.style.display = "";
        console.log("000");
    } else {
        tableInfo.style.display = "table";
    }
    
    tableInfo.innerHTML = "<tr>\n" +
        "                <th>Имя</th>\n" +
        "                <th>Ширина</th>\n" +
        "                <th>Высота</th>\n" +
        "                <th>Размер</th>\n" +
        "            </tr>";
    // console.log(tableInfo);

    for(var i = 0; i < info.length; i++) {
        console.log(info[i]);
        var tr = document.createElement("tr");
        for(var j = 0; j < info[i].childNodes.length; j++) {
            var td = document.createElement("td");
            var val = info[i].childNodes[j].childNodes[1].textContent;
            td.innerText = val;
            tr.appendChild(td);
        }
        tableInfo.appendChild(tr);
    }


}

tableInfoBtn.addEventListener("click", getTableInfo);

successBtn.addEventListener("click", ready);