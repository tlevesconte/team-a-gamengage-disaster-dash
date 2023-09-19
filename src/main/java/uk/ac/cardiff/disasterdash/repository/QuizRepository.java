package uk.ac.cardiff.disasterdash.repository;

import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;

import java.util.List;


public interface QuizRepository {
    List<QuizDTO> getQuestion(String type, String questionIndex);
    void updateQuestionOrder(List<QuizDTO> questionList);
    int getAnswer(int questionIndex, String answer);
    List<AdminQuizDTO> getAllQuiz(String type);
    List<AdminQuizDTO> getById(int id);
    QuizDTO addQuestion(QuizDTO quizDTO);
    QuizDTO updateQuestion(QuizDTO quizDTO);
    String deleteQuestion(int id);

}
