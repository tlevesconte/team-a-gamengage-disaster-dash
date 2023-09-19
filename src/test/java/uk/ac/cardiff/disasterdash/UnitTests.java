package uk.ac.cardiff.disasterdash;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import uk.ac.cardiff.disasterdash.DTO.Message;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UnitTests {

    @Test
    void DTOTest() {
        QuizDTO quiz = new QuizDTO(1,"storm",1,4,"test quesion","test choiceA","test choiceB","test choiceC","test choiceD","test hint");
        QuizDTO quizForAnswer = new QuizDTO(1,"storm",1,4,"test question","test correct");
        assertEquals(quiz.getID(),1);
        assertEquals(quiz.getType(),"storm");
        assertEquals(quiz.getquestionIndex(),1);
        assertEquals(quiz.getChoiceNum(),4);
        assertEquals(quiz.getQuestion(),"test quesion");
        assertEquals(quiz.getChoiceA(),"test choiceA");
        assertEquals(quiz.getChoiceB(),"test choiceB");
        assertEquals(quiz.getChoiceC(),"test choiceC");
        assertEquals(quiz.getChoiceD(),"test choiceD");
        assertEquals(quiz.getHint(),"test hint");

        Message mes = new Message(200,"success",quizForAnswer);
        assertEquals(mes.getCode(),200);
        assertEquals(mes.getMessage(),"success");
        assertEquals(mes.getData(),quizForAnswer);
    }

}
