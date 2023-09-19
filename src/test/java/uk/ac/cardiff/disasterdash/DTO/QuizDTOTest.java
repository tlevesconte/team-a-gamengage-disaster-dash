package uk.ac.cardiff.disasterdash.DTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class QuizDTOTest {
    @Test
    void QuizDTOTest(){
        QuizDTO quizDTO = new QuizDTO(104, "epidemics", 20, 4, "Test Question?", "A", "B", "C", "D", "hint");
        assertEquals(quizDTO.getID(), 104);
        assertEquals(quizDTO.getType(),"epidemics" );
        assertEquals(quizDTO.getquestionIndex(), 20);
        assertEquals(quizDTO.getChoiceNum(), 4);
        assertEquals(quizDTO.getQuestion(), "Test Question?");
    }
    }
