package uk.ac.cardiff.disasterdash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;
import uk.ac.cardiff.disasterdash.DTO.Message;
import uk.ac.cardiff.disasterdash.repository.QuizRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class QuizController {

    private QuizRepository quizRepo;

    @Autowired
    public QuizController(QuizRepository pRepo) {
        quizRepo = pRepo;
    }

    @RequestMapping(path = "/GetAllQuestions", method = RequestMethod.GET)
    public List<AdminQuizDTO> getAllQuestions(@RequestParam(value = "type", defaultValue = "null") String str) {
        return quizRepo.getAllQuiz(str);
    }

    //get questions by questionIndex
    @RequestMapping(path = "/GetQuestion", method = RequestMethod.GET)
    public List<QuizDTO> getAllQuestions(@RequestParam(value = "type", defaultValue = "null") String type,
                                         @RequestParam(value = "questionIndex", defaultValue = "null") String questionIndex) {

        return quizRepo.getQuestion(type,questionIndex);
    }
    //Verify that the answer is correct
    @RequestMapping(path = "/SubmitAnswer", method = RequestMethod.POST)
    public Message submitAnswer(@RequestParam(value = "questionIndex", defaultValue = "null") int questionIndex,
                                @RequestParam(value = "answer", defaultValue = "null") String answer) {
        Message msg = new Message();
        int isTrue = quizRepo.getAnswer(questionIndex,answer);
        if (isTrue > 0){
            msg.setCode(200);
            msg.setMessage("success");
            msg.setData(quizRepo.getAnswer(questionIndex,answer));
        }else {
            msg.setCode(400);
            msg.setMessage("wrong");
            msg.setData(quizRepo.getAnswer(questionIndex,answer));
        }
        return msg;
    }

    //Update questionIndex based upon id
    @RequestMapping(path = "/updateQuestionOrder", method = RequestMethod.POST)
    public String updateQuestionOrder(@RequestParam("questionList") String[] quizList) {
        ArrayList<QuizDTO> questionList = new ArrayList<>();

        for (int i = 0; i < quizList.length/2;i++){
            QuizDTO question = new QuizDTO(Integer.parseInt(quizList[i*2]),Integer.parseInt(quizList[i*2+1]));
            questionList.add(question);
        }
        quizRepo.updateQuestionOrder(questionList);

        return "true";
    }

    //  Get by question by ID
    @GetMapping("/admingetbyid/{id}")
    public List<AdminQuizDTO> getQuestionByID(@PathVariable("id") int id) {
        return quizRepo.getById(id);
    }

    //    Add new questions
    @PostMapping("/adminadd")
    public QuizDTO addQuestion(@RequestBody QuizDTO quizDTO) {

        return quizRepo.addQuestion(quizDTO);
    }
//    Update Questions based upon id
    @PutMapping("/adminupdate")
    public QuizDTO updateQuestion(@RequestBody QuizDTO quizDTO) {

        return quizRepo.updateQuestion(quizDTO);
    }

//    Delete questions based upon id
    @DeleteMapping("/admindelete/{id}")
    public String deleteQuestion(@PathVariable("id") int id){
        return quizRepo.deleteQuestion(id);
    }

}
