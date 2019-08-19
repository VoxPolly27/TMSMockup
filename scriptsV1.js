// ./script.js


// Function for select:

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);



    // function for generating track

    function gridData() {
        var data = new Array();
        var xpos = 300; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 100;
        var width = 100;
        var height = 50;    
        var click= 0;
        // iterate for rows 
        for (var row = 0; row < 10; row++) {
            data.push(new Array()); 
            // iterate for cells/columns inside rows
            for (var column = 0; column < 10; column++) {
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    click: click
                })
                // increment the x position. I.e. move it over by 50 (width variable)
                xpos += width;
            }
            // reset the x position after a row is complete
            xpos = 300;
            // increment the y position for the next row. Move it down 50 (height variable)
            ypos += height;
        }
        return data;
    }

    var gridData = gridData();
    // I like to log the data to the console for quick debugging
    console.log(gridData);
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width","auto")
        .attr("height", "80vh")
        .attr("left", "20vw")
        .attr("top", "10vh")
        .attr("position","absolute");
        // .attr("transform", "translate(250 80)");

    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");

    var column = row.selectAll(".square")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("stroke-dasharray", function (d) {
                    if ((d.x == "1100") || (d.x == "300")) {
            // console.log("d.y");
            return "400";
        }})
        .style("stroke-dashoffset", function (d) {if (d.x == "1100") {
            // console.log("d.y");
            return "0";
        }})
        // .style("fill", "#fff")
        // .style("stroke", "#222")
        // .style("stroke-dasharray", "67")
        // .style("stroke-dashoffset", "100")
        .on('click', function (d) {
            d.click++;
            // .attr("")
            console.log(this);
            if ((d.click) % 4 == 0) {
                d3.select(this).style("fill", "#fff");
            }
            if ((d.click) % 4 == 1) {
                d3.select(this).style("fill", "#2C93E8");
            }
            if ((d.click) % 4 == 2) {
                d3.select(this).style("fill", "#F56C4E");
            }
            if ((d.click) % 4 == 3) {
                d3.select(this).style("fill", "#838690");
            }
        });

    // var rack = d3.select("#Rack")
    //     .attr("left");
        