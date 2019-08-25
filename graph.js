const canvas = document.querySelector("canvas");
const brush = canvas.getContext("2d")

canvas.width = 800
canvas.height = 500

$(document).ready(function () {
    $("#btn-graph").on("click", () => {
        $("#spans").html("")
        $("#middle").html("250")
        brush.clearRect(0, 0, 800, 500)
        const val1 = parseInt($("#num1").val());
        const val2 = parseInt($("#num2").val());
        const val3 = parseInt($("#num3").val());
        let arr = [
            { name: "num1", val: val1, color: "lightgreen" },
            { name: "num2", val: val2, color: "lightcoral" },
            { name: "num3", val: val3, color: "lightblue" }
        ]
        const arrSorted = arr.reduce((reasult, num) => {
            return [...reasult, num.val].sort(function (a, b) { return b - a });
        }, [])
        const arrDraw = setHieghts(arrSorted, arr)
        drawLines(arrDraw)
        const barWidth = 100
        let barX = 150
        for (let i = 0; i < arrDraw.length; i++) {
            brush.fillStyle = arr[i].color
            brush.fillRect(barX, canvas.height - arrDraw[i], barWidth, arrDraw[i])
            barX += barWidth + 50
            $("#spans").append(`<span style="left:${barX + 150}px">${arr[i].name}<span>`)
        }
    })
});

function drawLines(arr) {
    // const middle = arr[0] - arr[2]
    brush.beginPath()
    brush.moveTo(0, 250);
    brush.lineTo(800, 250)
    brush.lineWidth = 1;
    brush.strokeStyle = "black"
    brush.stroke()
}

function setHieghts(sort, arr) {
    let mult = 1
    let x = sort[0]
    if (x < 500 && x > 250) return arr.map(bar => bar.val)
    else if (x > 500) {
        while (x > 500) {
            mult *= 2
            x /= 2
        }
        $("#middle").html(`${250 * mult}`)
        return arr.map(bar => bar.val / mult)
    }
    else while (x < 250) {
        mult *= 2
        x *= 2
    }
    $("#middle").html(`${250 / mult}`)
    return arr.map((bar) => bar.val * mult)
}

