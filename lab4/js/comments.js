import { cookieGetComments, cookieInit, cookieSaveComments } from './cookies.js';

let comments = new Array();
comments = [...cookieGetComments()];
console.log(comments);
if (comments.length === 0){
    cookieInit();
    comments = [...cookieGetComments()];
}
ShowComments(comments);

export function Comment(text, name, date, rating){
    this.text = text;
    this.name = name;
    this.date = date;
    this.rating = rating;
    this.id = comments.length
}

function numToStars(rating){
    return "★".repeat(rating) + "☆".repeat(5-rating);
}

function today(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function CommentHTML(comment){
    return (
        `<div class="comment">
                <div class="comment-header">
                    <p class="username">${comment.name}</p>
                    <p class="comment-date">${comment.date}</p>
                </div>
                <p class="comment-text">${comment.text}</p>
                <p class="rating">ОЦЕНКА: <span class="stars">${numToStars(comment.rating)}</span></p>
            </div>`
    );
}

function showComment(comment){
    document.getElementById("commentsContainer").innerHTML += CommentHTML(comment);
}

function ShowComments(comments){
    comments.forEach(comment => {
        showComment(comment);
    });
}

function addComment(comment){
    comments.push(comment);
    showComment(comment);
    cookieSaveComments(comments);
}

function getCommentFromForm(){
    let userName = document.getElementById('inputUsername').value;
    let date = today();
    let text = document.getElementById('inputComment').value;

    let rating;
    let ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(element => {
        if (element.checked) {
            rating = Number(element.value);
        }
    });

    return new Comment(text, userName, date, rating);
}

function clearForm(){
    document.getElementById('inputUsername').value = "";
    document.getElementById('inputComment').value = "";
    let ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(element => {
        element.checked = element.id == "rating1" ? true : false;
    });
}

function sendComment(){
    let comment = getCommentFromForm();
    if (comment.name === "" || comment.text === ""){
        document.getElementById('inputUsername').placeholder= "ИМЯ ВВЕДИТЕ";
        document.getElementById('NO').play();
        return;
    } else {
        clearForm();
        addComment(comment);
        return;
    }

}

document.getElementById("sendButton").onclick = sendComment;