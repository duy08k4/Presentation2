function createLight(a) {
    var container = document.querySelector(".container");
    const blurLv = 10;
    const count = a;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    for (var i = 0; i < count; i++) {
        var randomLeft = Math.floor(Math.random() * width);
        var randomTop = Math.floor(Math.random() * height);
        var delayTime = Math.floor(Math.random() * 3 + 1)
        var duration = Math.floor(Math.random() * 2 + 1)

        var blur = Math.floor(Math.random() * 2);
        var widthEle = Math.floor(Math.random() * 5) + 15;
        var moveTime = Math.floor(Math.random() * 4) + 4;

        var div = document.createElement("div");
        div.classList.add("star");
        // div.setAttribute("style", "animation: starAnimate 1s ease-in-out infinite alternate;")
        container.appendChild(div);

        div.setAttribute("style", "left:" + randomLeft + "px; top: " + randomTop + "px; animation: starAnimate " + duration + "s ease-in-out " + delayTime + "s infinite alternate;")
    }
}

createLight(30)

//Animate Start
let getStartBtn = document.querySelector(".startBtn");
getStartBtn.addEventListener("click", () => {
    let getMainPage = document.querySelector(".mainPage");
    // Ẩn thiên thạch
    let getMeteorite_animate = document.querySelector(".meteorite_animate");
    getMeteorite_animate.setAttribute("style", "opacity: 0; transition: .5s")
    setTimeout(() => {
        getMeteorite_animate.setAttribute("style", "opacity: 0; transition: .5s; display: none;")

        // Ẩn Planet
        let getplanetBox = document.querySelector(".animate");
        getplanetBox.setAttribute("style", "transform: translateX(-100%); opacity: 0; transition: .5s")
        setTimeout(() => {
            getplanetBox.setAttribute("style", "transform: translateX(-100%); opacity: 0; transition: .5s; display: none")

            // Ẩn banner và phi hành gia
            let getBanner = document.querySelector(".bannerGame");
            getBanner.setAttribute("style", "top: 0; transform: translate(-50%, -100%); opacity: 0; transition: .5s")
            setTimeout(() => {
                getBanner.setAttribute("style", "top: 0; transform: translate(-50%, -100%); opacity: 0; transition: .5s; display: none")
            }, 500)

            getMainPage.setAttribute("style", "display: block;")

            let getAstrounaut = document.querySelector(".astrounat")
            getAstrounaut.setAttribute("style", "bottom: 0; transform: translate(-50%, 100%); opacity: 0; transition: .5s")
            setTimeout(() => {
                getAstrounaut.setAttribute("style", "bottom: 0; transform: translate(-50%, 100%); opacity: 0; transition: .5s; display: none;")

                // Ẩn nút bấm
                getStartBtn.setAttribute("style", "right: 0; transform: translateX(100%); opacity: 0; transition: .5s")

                let getContainer = document.querySelector(".container");

                setTimeout(() => {
                    getContainer.setAttribute("style", "opacity: 0; transition: .5s")
                    getMainPage.setAttribute("style", "display: block; opacity: 1; transition: .5s")

                    setTimeout(() => {
                        getContainer.setAttribute("style", "display: none;")
                    }, 500)
                })
            }, 500)
        }, 500)
    }, 500)
})

document.querySelector(".prev").addEventListener("click", () => {
    let getAllQuestionTag = document.querySelectorAll(".questionTag");
    let getAllQuestionTag_arr = Array.from(getAllQuestionTag);
    let getQuestionBox = document.querySelector(".questionBox");

    getQuestionBox.prepend(getAllQuestionTag_arr[getAllQuestionTag_arr.length - 1])
})

document.querySelector(".next").addEventListener("click", () => {
    let getAllQuestionTag = document.querySelectorAll(".questionTag");
    let getAllQuestionTag_arr = Array.from(getAllQuestionTag);
    let getQuestionBox = document.querySelector(".questionBox");

    getQuestionBox.appendChild(getAllQuestionTag_arr[0])
})

let getBtnOpenDescriptionForm = document.querySelector(".descriptionBtn");

getBtnOpenDescriptionForm.addEventListener("click", () => {
    document.querySelector(".descriptionPage").setAttribute("style", "display: flex;")
})

// -----------------------------------------------Xử lý các custom được cung cấp sẵn-----------------------------------------
document.querySelector(".board").setAttribute("style", "font-size: " + questionSize + "px; font-family: " + fontAll);

document.querySelectorAll(".answerContent").forEach(val => {
    val.setAttribute("style", "font-size: " + answerSize + "px; font-family: " + fontAll)
})

document.querySelector(".descriptionForm").setAttribute("style", "font-size: " + descriptionSize + "px; font-family: " + fontAll)
// -----------------------------------------------Set thời gian trả lời câu hỏi------------------------------------------------
document.querySelector(".timeNumber").innerHTML = setTime;
// ----------------------------------------------------Các chức năng chính của web---------------------------------------------------
let allQuestReped = localStorage.getItem("data") ? localStorage.getItem("data").split(",") : [];

let allLogicAffect = localStorage.getItem("dataLogic") ? localStorage.getItem("dataLogic").split(";") : [];
let temptArrLogicAffect = [];
let logicVarriable = "";

// Tạo thẻ câu hỏi theo số lượng câu hỏi đã thêm
questionForm.forEach((val, index) => {
    let getContainerQuestion = document.querySelector(".questionBox");
    let tagQuestion_Form = `
        <div id="${index + 1}" class="questionTag c${index + 1}">
    
            <div class="questionTag--banner">
                <img class="questionTag--banner__img" src="./img/planet3.png" alt="">
            </div>
    
            <div class="questionTag--info">
                <div class="questionTitleBox">
                    <h1 class="questionTitleBox__title">Câu hỏi ${index + 1}</h1>
                </div>
    
                <div class="questionBtnBox">
                    <button class="questionBtn">Chọn</button>
                </div>
            </div>
        </div>
    `;

    getContainerQuestion.innerHTML += tagQuestion_Form;

    if (index == questionForm.length - 1) {
        selectQuestion();
        loadQuest();
    }
})

// Tải câu hỏi đã trả lời
function loadQuest() {
    if (allQuestReped.length !== 0) {
        allQuestReped.forEach((val) => {
            const getQuestionId = document.querySelector(".c" + val);
            document.querySelector(".questionBox").removeChild(getQuestionId)
            setTimeout(() => {
                handleButton()
            }, 500)
        })
    }
}

// Chức năng chọn câu hỏi
function selectQuestion() {
    let getAllQuestionBtn = document.querySelectorAll(".questionBtn");
    getAllQuestionBtn.forEach(val => {
        val.addEventListener("click", () => {
            document.querySelector(".backForm").removeAttribute("style")
            let question_active = val.parentElement.parentElement.parentElement.id;
            let tagQuestion = val.parentElement.parentElement.parentElement;
            logicVarriable = question_active.toString();

            allQuestReped.push(question_active)

            setTimeout(() => {
                document.querySelector(".questionBox").removeChild(tagQuestion)
            }, 1000)

            let getQuestionForm = document.querySelector(".questionForm");
            getQuestionForm.setAttribute("style", "opacity: 1; transform: translateX(0);")

            setTimeout(() => {
                handleRequires(question_active)
            }, 1000)
        })
    })
}


// Xử lý câu hỏi
function handleRequires(a) {
    let getQuest = parseInt(a)
    let questActive = questionForm[getQuest - 1]

    let getQuestionContent = questActive.content;
    let getAnswer_A = questActive.a.trim();
    let getAnswer_B = questActive.b.trim();
    let getAnswer_C = questActive.c.trim();
    let getAnswer_D = questActive.d.trim();
    let getTrueAnswer = questActive.t.trim();
    let getDescription = questActive.des.trim();

    let timeDelay_CheckAnswer;
    timeAnimte_answer = [
        getAnswer_A.split("").length,
        getAnswer_B.split("").length,
        getAnswer_C.split("").length,
        getAnswer_D.split("").length
    ];

    for (let i = 0; i < timeAnimte_answer.length; i++) {
        for (let j = 0; j < i; j++) {
            if (timeAnimte_answer[i] < timeAnimte_answer[j]) {
                let temp = timeAnimte_answer[i];
                timeAnimte_answer[i] = timeAnimte_answer[j];
                timeAnimte_answer[j] = temp;
            }
        }
    }

    timeDelay_CheckAnswer = timeAnimte_answer[timeAnimte_answer.length - 1] - 1;

    let getboardQuestion = document.querySelector(".board");
    let getAnswerForm_A = document.querySelector(".answerContentA")
    let getAnswerForm_B = document.querySelector(".answerContentB")
    let getAnswerForm_C = document.querySelector(".answerContentC")
    let getAnswerForm_D = document.querySelector(".answerContentD")
    let getDescriptionBase = document.querySelector(".descriptionForm")

    animateWrite(getQuestionContent, getboardQuestion);
    let timeDelay = getQuestionContent.split("").length + 1;

    setTimeout(() => {
        animateWrite(getAnswer_A, getAnswerForm_A);
        animateWrite(getAnswer_B, getAnswerForm_B);
        animateWrite(getAnswer_C, getAnswerForm_C);
        animateWrite(getAnswer_D, getAnswerForm_D);

        setTimeout(() => {
            checkAnswer(getTrueAnswer);
            timer()
        }, 100 * timeDelay_CheckAnswer)
    }, 100 * timeDelay)

    animateWrite(getDescription, getDescriptionBase);
}

// Tạo hiệu ứng gõ cho câu hỏi và câu trả lời
function animateWrite(content, tag) {
    const splitContent = content.split("");

    splitContent.forEach((val, index) => {
        setTimeout(() => {
            tag.innerHTML += val
        }, 100 * index)
    })
}

// Kiểm tra đáp án
function checkAnswer(trueAnswer) {
    let getAllAnswer = document.querySelectorAll(".answer");
    let getTrueAnswer = trueAnswer;
    let status = false;
    let answerClicked = [];

    getAllAnswer.forEach(val => {
        val.addEventListener("click", () => {
            if (status == false) {
                let answer = val.querySelector(".answerContent");
                let getOrderAnswer = val.querySelector(".order");
                let answerContent = answer.innerHTML;

                if (answerContent == getTrueAnswer) {
                    getOrderAnswer.setAttribute("style", "border: solid 10px transparent; background-color: lime; color: white;")
                    document.querySelector(".backForm").setAttribute("style", "display: block")

                    // Các phần xử lý việc cập nhật dữ liệu
                    setTimeout(() => {
                        allLogicAffect.push(logicVarriable);
                        localStorage.setItem("dataLogic", allLogicAffect.join(";"))
                        const dataQuestLocal = allQuestReped.join(",");
                        localStorage.setItem("data", dataQuestLocal)
                    }, 1000)
                    logicVarriable += "," + getOrderAnswer.innerHTML + "T"
                    clearInterval(intervalTime)
                    status = true;
                } else {
                    if (answerClicked.includes(val.id) == false) {
                        getOrderAnswer.setAttribute("style", "border: solid 10px transparent; background-color: red; color: white;")
                        logicVarriable += "," + getOrderAnswer.innerHTML + "F"
                        answerClicked.push(val.id)
                    }
                }
            }
        })
    })
}

// Ẩn các nút bấm khi chỉ còn 1 câu hỏi
function handleButton () {
    const getAllAnswerTag = document.querySelectorAll(".questionTag");
    if(getAllAnswerTag.length == 1) {
        document.querySelector(".changeBtnBox").setAttribute("style", "display: none")
    }
}

// Quay về menu câu hỏi
let getBtnCloseQuestionForm = document.querySelector(".backForm");
getBtnCloseQuestionForm.addEventListener("click", () => {
    let getQuestionForm = document.querySelector(".questionForm");
    getQuestionForm.removeAttribute("style");
    clearFormQuestion()

    setTimeout(() => {
        document.querySelector(".timeNumber").innerHTML = setTime;
        document.querySelector(".time").removeAttribute("style");
        handleResult()
        handleButton()
    }, 500)
})

// Clear Form câu hỏi
function clearFormQuestion() {
    let getBoard = document.querySelector(".board");
    getBoard.innerHTML = "";

    let getAllFormAnswer = document.querySelectorAll(".answerContent");
    getAllFormAnswer.forEach(val => {
        val.innerHTML = "";
    })

    let getAllAnswerCheck = document.querySelectorAll(".answer");
    getAllAnswerCheck.forEach(val => {
        val.removeAttribute("style");
        val.querySelector(".order").removeAttribute("style");
    })

    document.querySelector(".descriptionForm").innerHTML = ""
}

// Đóng phần giải thích
let getCloseBtn_description = document.querySelector(".closeDescription")

getCloseBtn_description.addEventListener("click", () => {
    let getDescriptionForm = document.querySelector(".descriptionPage");
    getDescriptionForm.removeAttribute("style");
})

// Bộ đếm thời gian trả lời câu hỏi
document.querySelector(".timeNumber").innerHTML = setTime;
let intervalTime;

function timer() {
    document.querySelector(".time").removeAttribute("style")
    document.querySelector(".timeNumber").innerHTML = setTime;
    intervalTime = setInterval(() => {
        let getSetTime = document.querySelector(".timeNumber").innerHTML;

        if (parseInt(getSetTime) > 0) {
            document.querySelector(".timeNumber").innerHTML = (parseInt(getSetTime) - 1).toString();

            if (getSetTime == 1) {
                document.querySelector(".time").setAttribute("style", "border-color: red;")
            }
        } else {
            clearInterval(intervalTime)
        }
    }, 1000)
}