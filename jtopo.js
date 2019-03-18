(function (JTopo) {

    JTopo.test = function (canvas) {
        var ctx = canvas.getContext("2d")

        ctx.beginPath()

        ctx.lineTo(100, 100)
        ctx.lineTo(200, 100)
        ctx.lineTo(200, 200)
        ctx.lineWidth = '2'
        ctx.fillStyle = '#F6F152'
        ctx.strokeStyle = '#F5270B'
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

        alert('a')
    }


    /**
     * 绘制梯形
     * 
     * 
     *  */

    JTopo.Trapezoid = function ({
        scene = '',
        left = 825,
        top = 450,
        a = 200, //上边 
        b = 432, //下边
        h = 75, //高度
        link1 = '',
        link4 = '',
        link2 = '',
        link3 = '',
        node1 = '',
        node2 = '',
        node3 = '',
        node4 = '',
        strokeColor = '54,123,227',
        lineWidth = 2,
        dashedPattern = '0.1',
        fullColor = '6,236,244'
    }) {


        var node1 = newNode(left, top, lineWidth, lineWidth, node1, strokeColor);
        var node2 = newNode(left + a, top, lineWidth, lineWidth, node2, strokeColor);
        var node3 = newNode(left + a + (Math.abs((b - a) / 2)), top + h, lineWidth, lineWidth, node3, strokeColor);
        var node4 = newNode(left - (Math.abs((b - a) / 2)), top + h, lineWidth, lineWidth, node4, strokeColor);

        newLink(node1, node2, link1, dashedPattern);
        newLink(node2, node3, link2, dashedPattern);
        newLink(node3, node4, link3, dashedPattern);
        newLink(node4, node1, link4, dashedPattern);

        //创建节点进行填充
        for (var i = 1; i < h; i++) {
            var x = i * (Math.abs(b - a) / 2) / h
            // console.log(x)
            var nodeA = newNode(left - x, top + i, 2, 2, '', strokeColor)
            var nodeB = newNode(left + a + x, top + i, 2, 2, '', strokeColor)
            fullLink(nodeA, nodeB, fullColor)
        }

        function fullLink(nodeA, nodeZ, fullColor) {
            var link = new JTopo.Link(nodeA, nodeZ);
            link.lineWidth = 1; // 线宽
            link.bundleGap = 0; // 线条之间的间隔
            link.strokeColor = fullColor; // 
            link.selected = false
            link.showSelected = false; // 折线拐角处的长度
            scene.add(link);
            return link;
        }



        function newLink(nodeA, nodeZ, text, dashedPattern) {
            var link = new JTopo.Link(nodeA, nodeZ, text);
            link.lineWidth = lineWidth; // 线宽
            link.bundleGap = 0; // 线条之间的间隔
            link.textOffsetY = 3; // 文本偏移量（向下3个像素）
            link.strokeColor = strokeColor; // 
            link.bundleOffset = 60; // 折线拐角处的长度
            link.dashedPattern = dashedPattern;
            scene.add(link);
            return link;
        }


        function newNode(x, y, w, h, text, color) {
            var node = new JTopo.Node(text);
            node.setLocation(x, y);
            node.setSize(w, h);
            node.fillColor = color
            scene.add(node);
            return node;
        }

    }



    //绘制矩形
    JTopo.rectangle = function ({
        scene = '',
        left = 825,
        top = 450,
        width = 200, //上边 
        height = 432, //下边
        link1 = '',
        link4 = '',
        link2 = '',
        link3 = '',
        node1 = '',
        node2 = '',
        node3 = '',
        node4 = '',
        strokeColor = '6,236,244',
        lineWidth = 2,
        dashedPattern = '0.1',
    }) {


        var node1 = newNode(left, top, lineWidth, lineWidth, node1, strokeColor);
        var node2 = newNode(left + width, top, lineWidth, lineWidth, node2, strokeColor);
        var node3 = newNode(left + width, +top + height, lineWidth, lineWidth, node3, strokeColor);
        var node4 = newNode(left, top + height, lineWidth, lineWidth, node4, strokeColor);

        newLink(node1, node2, link1, dashedPattern);
        newLink(node2, node3, link2, dashedPattern);
        newLink(node3, node4, link3, dashedPattern);
        newLink(node4, node1, link4, dashedPattern);

        function newLink(nodeA, nodeZ, text, dashedPattern) {
            var link = new JTopo.Link(nodeA, nodeZ, text);
            link.lineWidth = lineWidth; // 线宽
            // link.bundleOffset = 60; // 折线拐角处的长度
            link.bundleGap = 0; // 线条之间的间隔
            link.textOffsetY = 3; // 文本偏移量（向下3个像素）
            link.strokeColor = strokeColor; // 
            link.bundleOffset = 60; // 折线拐角处的长度
            link.dashedPattern = dashedPattern;
            scene.add(link);
            return link;
        }

        function newNode(x, y, w, h, text, color) {
            var node = new JTopo.Node(text);
            node.setLocation(x, y);
            node.setSize(w, h);
            node.fillColor = color
            scene.add(node);
            return node;
        }

    }

    /**
     * 文字标注函数
     * 需要传入 必须传入舞台scene参数
     */
    JTopo.newTxt = function ({
        scene = '',
        left = 0,
        top = 0,
        data = '测试',
        rotate = 0,
        fontSize = '22',
        x = 0,
        y = 0,
        fontColor = '6,236,244',
        font = 'Microsoft YaHei',
        scaleY = '1',
        scaleX = '1'
    } = {}) {
        var dataList = data.split('');


        dataList.map(function (item, id) {

            var node = new JTopo.Node(item);
            node.setLocation(left + id * fontSize * x, top + id * fontSize * y);
            node.setSize(1, 1);
            node.font = fontSize + "px " + font
            node.fontColor = fontColor
            node.textPosition = "Middle_Center",
                node.rotate = rotate
            node.scaleY = scaleY
            node.scaleX = scaleX
            scene.add(node);

        })
    }



    /**
     * 
     * 创建节点
     */

    JTopo.newNode = function ({
        scene = '',
        left = '',
        top = '',
        fillColor = '',
        width = 100,
        height = 100,
        image = '',
        text = '',
        textPosition = '',
        font = ''

    }) {
        var node = new JTopo.Node()
        node.setLocation(left, top)
        node.setSize(width, height)
        node.fillColor = fillColor
        node.setImage(image)
        node.text = text
        node.textPosition = textPosition
        node.font = font,
            scene.add(node)
        return node
    }


    /**
     * 绘制平行四边形函数
     * 
     */
    JTopo.squared = function squared({
        scene = '',
        left = 200,
        top = 80,
        c1 = 15,
        c2 = 10,
        a = 250,
        b = 232,
        link1 = '',
        link4 = '',
        link2 = '',
        link3 = '',
        node1 = '',
        node2 = '',
        node3 = '',
        node4 = '',
        strokeColor = '6,236,244',
        lineWidth = 1,
        dashedPattern = '0.1',

    } = {}) {

        var node1 = newNode(left, top, lineWidth, lineWidth, node1, strokeColor);
        var node2 = newNode(left - Math.abs(Math.sin(c1)) * a, top + Math.abs(Math.cos(c1)) * a,
            lineWidth, lineWidth, node2,
            strokeColor);
        var node3 = newNode((left - Math.abs(Math.sin(c1)) * a + left + Math.abs(Math.sin(c2)) * b) -
            left, ((top + Math.abs(Math.cos(c2)) * b + top + Math.abs(Math.cos(c1)) * a)) - top,
            lineWidth,
            lineWidth, node3, strokeColor)
        var node4 = newNode(left + Math.abs(Math.sin(c2)) * b, top + Math.abs(Math.cos(c2)) * b,
            lineWidth, lineWidth, node4,
            strokeColor)

        newLink(node1, node2, link1, dashedPattern);
        newLink(node2, node3, link2, dashedPattern);
        newLink(node3, node4, link3, dashedPattern);
        newLink(node4, node1, link4, dashedPattern);




        //进行填充


        var h = Math.abs(Math.cos(c1) * a)
        console.log('h' + h)

        for (var i = 1; i < h; i++) {
            var x = (i * (Math.abs(Math.sin(c1) * a))) / h
            // console.log(x)
            var nodeA = newNode(left - x, top + i, 2, 2, '', strokeColor)
            var nodeB = newNode((left + Math.abs(Math.sin(c2)) * b) - x, (top + Math.abs(Math.cos(c2)) * b) + i, 2, 2, '', strokeColor)
            fullLink(nodeA, nodeB, fullColor)
        }


        function fillLink(nodeA, nodeZ, fullColor) {
            var link = new JTopo.Link(nodeA, nodeZ);
            link.lineWidth = 1; // 线宽
            link.bundleGap = 0; // 线条之间的间隔
            link.strokeColor = fullColor; // 
            link.selected = false
            link.showSelected = false; // 折线拐角处的长度
            scene.add(link);
            return link;
        }


        function newLink(nodeA, nodeZ, text, dashedPattern) {
            var link = new JTopo.Link(nodeA, nodeZ, text);
            link.lineWidth = lineWidth; // 线宽
            // link.bundleOffset = 60; // 折线拐角处的长度
            link.bundleGap = 0; // 线条之间的间隔
            link.textOffsetY = 3; // 文本偏移量（向下3个像素）
            link.strokeColor = strokeColor; // 
            link.bundleOffset = 60; // 折线拐角处的长度

            link.dashedPattern = dashedPattern;
            scene.add(link);
            return link;
        }

        function newNode(x, y, w, h, text, color) {
            var node = new JTopo.Node(text);
            node.setLocation(x, y);
            node.setSize(w, h);
            node.fillColor = color
            scene.add(node);
            return node;
        }
    }

    /**
     * 绘制直线
     * 传递两个Node
     */

    JTopo.newLink = function newLink({
        node1 = '',
        node2 = '',
        lineWidth = 3,
        bundleGap = 0,
        strokeColor = '200,16,26',
        dashedPattern = 3,
        arrowsRadius = false,
        scene = ''
    } = {}) {

        var link = new JTopo.Link(node1, node2)
        link.lineWidth = lineWidth; // 线宽
        link.bundleGap = bundleGap; // 线条之间的间隔
        // link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = strokeColor;
        link.dashedPattern = dashedPattern;
        link.arrowsRadius = arrowsRadius //连线的箭头
        scene.add(link)
    }

    /**
     * 
     * 连线上实现图片
     * 思路：在给定的节点之间创建中间节点，使用中间节点，在中间节点上显示图片，
     */
    JTopo.newLinkImage = function newLinkImage({
        node1 = '',
        node2 = '',
        scene = '',
        lineWidth = 1,
        bundleGap = 10,
        strokeColor = '25,222,22',
        dashedPattern = 6,
        arrowsRadius = 15,


    }) {


        var nodeMiddleX = (node1.x + node2.x) / 2
        var nodeMiddleY = (node1.y + node2.y) / 2

        var nodeMiddle = new JTopo.Node()
        nodeMiddle.setImage('./img/demos.png')
        nodeMiddle.dragable = false
        nodeMiddle.setSize(30, 30)
        nodeMiddle.text = '连线上加图片'
        nodeMiddle.setLocation(nodeMiddleX, nodeMiddleY)
        scene.add(nodeMiddle)


        var link = new JTopo.Link(node1, node2)
        link.lineWidth = lineWidth; // 线宽
        link.bundleGap = bundleGap; // 线条之间的间隔
        // link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = strokeColor;
        link.dashedPattern = dashedPattern;
        link.arrowsRadius = arrowsRadius //连线的箭头
        scene.add(link)

    }


    /**
     * 箭头流动特效
     * 思路：在两个节点之间不断创建节点，然后绘制箭头
     */
    JTopo.newLinkMove = function newLinkMove({
        node1 = '',
        node2 = '',
        scene = '',
        moveLength = 1 //箭头之间的间隔
    }) {
        //先连接两个节点(将线条隐藏，因为直接相连的线条和后边节点的运动轨迹不同)
        var link = new JTopo.Link(node1, node2)
        link.linkWidth = 0
        link.dashedPattern = 4
        link.visible = true
        console.log(link)
        scene.add(link)


        var k = (node2.y - node1.y) / (node2.x - node1.x)


        var n = new JTopo.Node()
        n.setSize(10, 10)
        // n.setLocation(node1.x - 80, node1.y - 80 * k)
        n.setLocation(node1.x, node1.y)

        scene.add(n)
        JTopo.Animate.stepByStep(n, {
            x: node2.x,
            y: node2.y
        }, 1000, true).start();

    }



    /**
     * 绘制平行四边形函数
     * 
     */
    JTopo.squared = function ({
        scene = '',
        left = 200,
        top = 80,
        c1 = 15,
        c2 = 10,
        a = 250,
        b = 232,
        link1 = '',
        link4 = '',
        link2 = '',
        link3 = '',
        node1 = '',
        node2 = '',
        node3 = '',
        node4 = '',
        strokeColor = '6,236,244',
        lineWidth = 1,
        dashedPattern = '0.1',
        fullColor = '',
        changeTime = '',
        alpha = '0.3'

    } = {}) {

        // c2 = 360 - c2


        var node1 = newNode(left, top, lineWidth, lineWidth, node1, strokeColor);
        var node2 = newNode(left - Math.abs(Math.sin(c1)) * a, top + Math.abs(Math.cos(c1)) * a,
            lineWidth, lineWidth, node2,
            strokeColor);
        var node3 = newNode((left - Math.abs(Math.sin(c1)) * a + left + Math.abs(Math.sin(c2)) * b) -
            left, ((top + Math.abs(Math.cos(c2)) * b + top + Math.abs(Math.cos(c1)) * a)) - top,
            lineWidth,
            lineWidth, node3, strokeColor)
        var node4 = newNode(left + Math.abs(Math.sin(c2)) * b, top + Math.abs(Math.cos(c2)) * b,
            lineWidth, lineWidth, node4,
            strokeColor)


        newLink(node1, node2, link1, dashedPattern);
        newLink(node2, node3, link2, dashedPattern);
        newLink(node3, node4, link3, dashedPattern);
        newLink(node4, node1, link4, dashedPattern);



        //如果有填充颜色的话进行闪烁
        if (fullColor) {

            var h = Math.abs(Math.cos(c1) * a)
            console.log('h' + h)

            for (var i = 0; i < h; i++) {
                var x = (i * (Math.abs(Math.sin(c1) * a))) / h
                // console.log(x)
                var nodeA = newNode(left - x, top + i, 0, 0, '', strokeColor)
                var nodeB = newNode((left + Math.abs(Math.sin(c2)) * b) - x, (top + Math.abs(Math.cos(
                        c2)) *
                    b) + i, 0, 0, '', strokeColor)

                fillLink(nodeA, nodeB, fullColor)
            }

            function fillLink(nodeA, nodeZ, fullColor) {
                var link = new JTopo.Link(nodeA, nodeZ);
                link.lineWidth = 5; // 线宽
                link.bundleGap = 0; // 线条之间的间隔
                link.strokeColor = fullColor; // 
                link.selected = false
                link.alpha = alpha
                if (changeTime) {
                    setInterval(function () {
                        link.alpha != 0 ? link.alpha = 0 : link.alpha = 0.3
                    }, changeTime)
                }


                link.showSelected = false; // 折线拐角处的长度
                scene.add(link);
                return link;
            }
        }









        function newLink(nodeA, nodeZ, text, dashedPattern) {
            var link = new JTopo.Link(nodeA, nodeZ, text);
            link.lineWidth = lineWidth; // 线宽
            // link.bundleOffset = 60; // 折线拐角处的长度
            link.bundleGap = 0; // 线条之间的间隔
            link.textOffsetY = 3; // 文本偏移量（向下3个像素）
            link.strokeColor = strokeColor; // 
            link.bundleOffset = 60; // 折线拐角处的长度

            link.dashedPattern = dashedPattern;
            scene.add(link);
            return link;
        }

        function newNode(x, y, w, h, text, color) {
            var node = new JTopo.Node(text);
            node.setLocation(x, y);
            node.setSize(w, h);
            node.fillColor = color
            scene.add(node);
            return node;
        }
    }






    /**
     * 显示文字函数
     */
    JTopo.newTxt = function ({
        scene = '',
        left = 0,
        top = 0,
        data = '测试',
        rotate = 0,
        fontSize = '22',
        x = 0,
        y = 0,
        fontColor = '6,236,244',
        font = 'Microsoft YaHei',
        scaleY = '1',
        scaleX = '1'
    } = {}) {
        var dataList = data.split('');


        dataList.map(function (item, id) {


            var node = new JTopo.Node(item);
            node.setLocation(left + id * fontSize * x, top + id * fontSize * y);

            node.setSize(1, 1);
            node.font = fontSize + "px " + font
            // node.font = "22px"
            node.fontColor = fontColor
            node.textPosition = "Middle_Center",
                node.rotate = rotate
            node.scaleY = scaleY
            node.scaleX = scaleX
            scene.add(node);

        })
    }




    /**
     * 绘制直线
     * 传递两个Node
     */

    JTopo.newLink = function ({
        scene = scene,
        node1 = '',
        node2 = '',
        lineWidth = 3,
        bundleGap = 0,
        strokeColor = '200,16,26',
        dashedPattern = 4,
        arrowsRadius = false,
    } = {}) {

        var link = new JTopo.Link(node1, node2)
        link.lineWidth = lineWidth; // 线宽
        link.bundleGap = bundleGap; // 线条之间的间隔
        // link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = strokeColor;
        link.dashedPattern = dashedPattern;


        console.log(link)
        link.arrowsRadius = arrowsRadius //连线的箭头
        scene.add(link)
    }





    /**
     * 
     * 连线上实现图片
     * 思路：在给定的节点之间创建中间节点，使用中间节点，在中间节点上显示图片，
     */
    JTopo.newLinkImage = function ({
        node1 = '',
        node2 = '',
        scene = scene,
        lineWidth = 1,
        bundleGap = 10,
        strokeColor = '25,222,22',
        dashedPattern = 6,
        arrowsRadius = 15,


    }) {


        var nodeMiddleX = (node1.x + node2.x) / 2
        var nodeMiddleY = (node1.y + node2.y) / 2

        var nodeMiddle = new JTopo.Node()
        nodeMiddle.setImage('./img/demos.png')
        nodeMiddle.dragable = false
        nodeMiddle.setSize(30, 30)
        nodeMiddle.text = '连线上加图片'
        nodeMiddle.setLocation(nodeMiddleX, nodeMiddleY)
        scene.add(nodeMiddle)


        var link = new JTopo.Link(node1, node2)
        link.lineWidth = lineWidth; // 线宽
        link.bundleGap = bundleGap; // 线条之间的间隔
        // link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = strokeColor;
        link.dashedPattern = dashedPattern;
        link.arrowsRadius = arrowsRadius //连线的箭头
        scene.add(link)

    }


    /**
     * 箭头流动特效
     * 思路：在两个节点之间不断创建节点，然后绘制箭头
     */
    JTopo.newLinkMove = function ({
        node1 = '',
        node2 = '',
        scene = scene,
        moveLength = 1 //箭头之间的间隔
    }) {
        //先连接两个节点(将线条隐藏，因为直接相连的线条和后边节点的运动轨迹不同)
        var link = new JTopo.Link(node1, node2)
        link.linkWidth = 0
        link.dashedPattern = 4
        link.visible = true
        console.log(link)
        scene.add(link)


        var k = (node2.y - node1.y) / (node2.x - node1.x)


        var n = new JTopo.Node()
        n.setSize(10, 10)
        // n.setLocation(node1.x - 80, node1.y - 80 * k)
        n.setLocation(node1.x, node1.y)

        scene.add(n)
        JTopo.Animate.stepByStep(n, {
            x: node2.x,
            y: node2.y
        }, 1000, true).start();

    }





    /**
     * 流动虚线
     */

    // JTopo.flowLine = function ({
    //     node1 = '',
    //     node2 = '',
    //     scene = scene,
    // }) {
    //     CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function (a, b, c, d, e) {
    //         var animespeed = (new Date()) / 100;
    //         "undefined" == typeof e && (e = 5);
    //         var f = c - a, //x轴差
    //             g = d - b, //y轴差
    //             h = Math.floor(Math.sqrt(f * f + g * g)), //勾股定理,直线长度
    //             i = 0 >= e ? h : h / e, //虚线段数
    //             j = g / h * e,
    //             k = f / h * e;
    //         this.beginPath();
    //         animespeed = animespeed % (e * 2);
    //         var txs = -f / h * animespeed;
    //         var tys = -g / h * animespeed;
    //         for (var l = 0; i > l; l++) {
    //             l % 2 ? this.lineTo(a + l * k - txs, b + l * j - tys) : this.moveTo((a + l * k - txs) > (a + i * k) ? (a + l * k) : (a + l * k - txs), (b + l * j - tys) > (b + i * j) ? (b + l * j) : (b + l * j - tys))
    //         };
    //         this.stroke()
    //     };
    //     CanvasRenderingContext2D.prototype.JtopoDrawPointPath = function (a, b, c, d, e, f) {
    //         var animespeed = (new Date()) / 10;
    //         var xs = c - a,
    //             xy = d - b,
    //             l = Math.floor(Math.sqrt(xs * xs + xy * xy)),
    //             colorlength = 50,
    //             j = l;
    //         xl = xs / l,
    //             yl = xy / l;
    //         var colorpoint = animespeed % (l + colorlength) - colorlength;

    //         for (var i = 0; i < j; i++) {
    //             if (((i) > colorpoint) && ((i) < (colorpoint + colorlength))) {
    //                 this.beginPath();
    //                 this.strokeStyle = e;
    //                 this.moveTo(a + (i - 1) * xl, b + (i - 1) * yl);
    //                 this.lineTo(a + i * xl, b + i * yl);
    //                 this.stroke();
    //             } else {
    //                 this.beginPath();
    //                 this.strokeStyle = f;
    //                 this.moveTo(a + (i - 1) * xl, b + (i - 1) * yl);
    //                 this.lineTo(a + i * xl, b + i * yl)
    //                 this.stroke();
    //             }
    //         }
    //     };

        
    //     var node = new JTopo.Node("Hello");                            
    //     node.setLocation(10, 10);
    //     scene.add(node);
        
    //     var node2 = new JTopo.Node("Hello");                            
    //     node2.setLocation(400, 200);
    //     scene.add(node2);
    //     var link1=new JTopo.Link(node,node2);
    //     link1.dashedPattern =5;
    //      link1.strokeColor="255,0,255";
    //     scene.add(link1)

    //     var nodeX = new JTopo.Node("Hello");                            
    //     nodeX.setLocation(100, 110);
    //     scene.add(nodeX);
        
    //     var nodeY = new JTopo.Node("Hello");                            
    //     nodeY.setLocation(200, 200);
    //     scene.add(nodeY);
    //     var link1=new JTopo.Link(nodeX,nodeY);
    //     link1.dashedPattern =5;
    //      link1.strokeColor="255,0,255";
    //     scene.add(link1)

    // }




})(JTopo)