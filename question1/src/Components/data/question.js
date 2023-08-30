const Question = [
    {
     question: "de quel couleur est le ciel ?",
     reponce: "il est bleu"
    }
   ];

function getAllQuestion(){
    return Question;
}

function addQuestion(question, reponce){
    Question.push(
        {
            question,
            reponce
        }
    );
}


export { getAllQuestion, addQuestion}