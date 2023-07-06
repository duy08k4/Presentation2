let toltalQuest = questionForm.length;

// Chức năng chơi lại
function openForm() {
    document.querySelector(".confirmPage").setAttribute("style", "display: flex");
    setTimeout(() => {
        document.querySelector(".fakeRestartBtn").removeAttribute("style", openForm)
    }, 500)
}

document.querySelector(".fakeRestartBtn").addEventListener("click", openForm)

document.querySelector(".acceptBtn").addEventListener("click", reset)

function closeForm() {
    document.querySelector(".confirmPage").removeAttribute("style")
    setTimeout(() => {
        document.querySelector(".cancelBtn").removeAttribute("style", closeForm)
    }, 500)
}

document.querySelector(".cancelBtn").addEventListener("click", closeForm)

function handleResult() {
    if (localStorage.getItem("data")) {
        const getAmountDataFromLocal = localStorage.getItem("data")
        const convertAmountData = getAmountDataFromLocal.split(",");
        let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0

        if (convertAmountData.length === questionForm.length && score == 0) {
            document.querySelector(".endForm").classList.add("activeForm")
            setTimeout(() => {
                document.querySelector(".container").setAttribute("style", "display: none")
            }, 1000)

            let amountTrue = 0;
            const getLogicData = localStorage.getItem("dataLogic").split(";");

            getLogicData.forEach((val, index) => {
                const logicData = val.split(",");
                // Vị trí 0 là số câu
                // Nếu trong dãy logic true false mà true đứng đầu => người dùng chọn đúng đáp án
                let setColor = logicData[1].indexOf("T") != -1 ? "lime" : "red";
                let resultString = "";

                if (logicData[1].indexOf("T") != -1) {
                    amountTrue++;
                    score += defaultScore;
                    localStorage.setItem("score", score.toString())
                } else localStorage.setItem("score", score.toString())

                logicData.forEach((valData, indexData) => {
                    if (indexData != 0) {
                        resultString += valData;
                    }
                })

                //Tạo dữ liệu cho thẻ câu hỏi
                const tagForm = `
                    <div class="resultTag" style="border-left-color: ${setColor};">
                        <div class="resultTitleBox">
                            <h1 class="resultTitleContent">Câu ${logicData[0]}</h2>
                            <button value="${logicData[0]}" class="overviewQuestBtn" onclick="reviewQuest(this.value)">Xem</button>
                        </div>

                        <div class="resultBox">
                            <div class="resultShowcase">
                                <div class="resultIcon ${(resultString.indexOf("A") != -1) ? (resultString.indexOf("AT") != -1) ? "active" : "wrong" : ""}">
                                    <p class="resultIconContent">A</p>
                                </div>

                                <div class="resultIcon ${(resultString.indexOf("B") != -1) ? (resultString.indexOf("BT") != -1) ? "active" : "wrong" : ""}">
                                    <p class="resultIconContent">B</p>
                                </div>

                                <div class="resultIcon ${(resultString.indexOf("C") != -1) ? (resultString.indexOf("CT") != -1) ? "active" : "wrong" : ""}">
                                    <p class="resultIconContent">C</p>
                                </div>

                                <div class="resultIcon ${(resultString.indexOf("D") != -1) ? (resultString.indexOf("DT") != -1) ? "active" : "wrong" : ""}">
                                    <p class="resultIconContent">D</p>
                                </div>
                            </div>
                            
                            <div class="amountChooseBox">
                                <label class="amountChooseBoxTitle">Số lần chọn: </label>
                                <p class="amountChooseBoxContent">${logicData.length - 1}</p>
                            </div>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    document.querySelector(".endFormRight").innerHTML += tagForm;
                }, 50 * index)

                if (index === getLogicData.length - 1) {
                    document.querySelector(".branchScore").innerHTML = localStorage.getItem("score");
                    document.querySelector(".branchTrue").innerHTML = amountTrue;
                    document.querySelector(".branchFalse").innerHTML = toltalQuest - amountTrue;
                }
            })
        } else {
            const getAmountDataFromLocal = localStorage.getItem("data")
            const convertAmountData = getAmountDataFromLocal.split(",");
            if (convertAmountData.length === questionForm.length) {
                const toltalScore = questionForm.length * defaultScore;

                document.querySelector(".endForm").classList.add("activeForm")
                setTimeout(() => {
                    document.querySelector(".container").setAttribute("style", "display: none")
                }, 1000)

                document.querySelector(".branchScore").innerHTML = score;
                document.querySelector(".branchTrue").innerHTML = score / 5;
                document.querySelector(".branchFalse").innerHTML = questionForm.length - (score / 5);


                let amountTrue = 0;
                const getLogicData = localStorage.getItem("dataLogic").split(";");

                getLogicData.forEach((val, index) => {
                    const logicData = val.split(",");

                    let setColor = logicData[1].indexOf("T") != -1 ? "lime" : "red";
                    let resultString = "";

                    if (logicData[1].indexOf("T") != -1) {
                        localStorage.setItem("score", score.toString())
                    } else localStorage.setItem("score", score.toString())

                    logicData.forEach((valData, indexData) => {
                        if (indexData != 0) {
                            resultString += valData;
                        }
                    })

                    //Tạo dữ liệu cho thẻ câu hỏi
                    const tagForm = `
                        <div class="resultTag" style="border-left-color: ${setColor};">
                            <div class="resultTitleBox">
                                <h1 class="resultTitleContent">Câu ${logicData[0]}</h2>
                                <button value="${logicData[0]}" class="overviewQuestBtn" onclick="reviewQuest(this.value)">Xem</button>
                            </div>

                            <div class="resultBox">
                                <div class="resultShowcase">
                                    <div class="resultIcon ${(resultString.indexOf("A") != -1) ? (resultString.indexOf("AT") != -1) ? "active" : "wrong" : ""}">
                                        <p class="resultIconContent">A</p>
                                    </div>

                                    <div class="resultIcon ${(resultString.indexOf("B") != -1) ? (resultString.indexOf("BT") != -1) ? "active" : "wrong" : ""}">
                                        <p class="resultIconContent">B</p>
                                    </div>

                                    <div class="resultIcon ${(resultString.indexOf("C") != -1) ? (resultString.indexOf("CT") != -1) ? "active" : "wrong" : ""}">
                                        <p class="resultIconContent">C</p>
                                    </div>

                                    <div class="resultIcon ${(resultString.indexOf("D") != -1) ? (resultString.indexOf("DT") != -1) ? "active" : "wrong" : ""}">
                                        <p class="resultIconContent">D</p>
                                    </div>
                                </div>
                                
                                <div class="amountChooseBox">
                                    <label class="amountChooseBoxTitle">Số lần chọn: </label>
                                    <p class="amountChooseBoxContent">${logicData.length - 1}</p>
                                </div>
                            </div>
                        </div>
                    `;

                    setTimeout(() => {
                        document.querySelector(".endFormRight").innerHTML += tagForm;
                    }, 500 * index)
                })
            }
        }
    }
}

handleResult();
// Chức năng xem lại câu hỏi
function reviewQuest(value) {
    document.querySelector(".questionForm").setAttribute("style", "opacity: 1; transform: translateX(0);")
    document.querySelector(".time").setAttribute("style", "display: none")
    document.querySelector(".backScoreBtn").setAttribute("style", "display: block");
    document.querySelector(".questionForm--meteorite1").setAttribute("style", "display: none;")
    
    const idReview = value;
    const getData = localStorage.getItem("data").split(",");
    const getLogicalData = localStorage.getItem("dataLogic").split(";");
    
    if (getData.includes(idReview) == true) {
        const indexData = getData.indexOf(idReview)
        const questReview = questionForm[parseInt(idReview) - 1]
        const getDataLogic = getLogicalData[indexData].split(",")
        
        document.querySelector(".board").innerHTML = questReview.content;
        document.querySelector(".answerContentA ").innerHTML = questReview.a;
        document.querySelector(".answerContentB ").innerHTML = questReview.b;
        document.querySelector(".answerContentC ").innerHTML = questReview.c;
        document.querySelector(".answerContentD ").innerHTML = questReview.d;
        document.querySelector(".descriptionForm").innerHTML = questReview.des;

        getDataLogic.forEach((val, index) => {
            if (index != 0) {
                const convertValue = val.split("");
                const answer = convertValue[0];
                const status = convertValue[1];
                const setColorReview = status == "T" ? "lime" : "red";
                const getAnswer = document.querySelector(`#c${answer}`);

                getAnswer.querySelector(".order").setAttribute("style", `color: white; background-color: ${setColorReview}; border-color: ${setColorReview};`)
            }
        })
    }
}

const closeReview = document.querySelector(".backScoreBtn");

closeReview.addEventListener("click", () => {
    document.querySelector(".questionForm").removeAttribute("style");
    setTimeout(() => {
        document.querySelector(".time").removeAttribute("syle");
        document.querySelector(".questionForm--meteorite1").removeAttribute("style")
        document.querySelector(".board").innerHTML = "";
        document.querySelector(".descriptionForm").innerHTML = "";

        document.querySelectorAll(".answerContent").forEach((val) => {
            val.innerHTML = "";
        })

        document.querySelectorAll(".order").forEach((val) => {
            val.removeAttribute("style")
        })
    }, 500)
})


// Reset
function reset() {
    localStorage.removeItem("data");
    localStorage.removeItem("dataLogic");
    localStorage.removeItem("score");
    setTimeout(() => {
        location.reload();
    }, 500)
}