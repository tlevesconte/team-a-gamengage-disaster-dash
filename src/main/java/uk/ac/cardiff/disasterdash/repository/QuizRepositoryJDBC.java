package uk.ac.cardiff.disasterdash.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;
import uk.ac.cardiff.disasterdash.model.AdminQuizMapper;
import uk.ac.cardiff.disasterdash.model.AnswerMapper;
import uk.ac.cardiff.disasterdash.model.QuizMapper;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class QuizRepositoryJDBC implements QuizRepository {
    private static final String INSERT_QUESTION = "INSERT INTO Quiz(type,questionIndex,choiceNum,question,choiceA,choiceB,choiceC,choiceD,correct,hint) values(?,?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE_QUESTION = "UPDATE Quiz SET type=?, questionIndex=?, choiceNum=?, question=?, choiceA=?, choiceB=?, choiceC=?, choiceD=?, correct=?, hint=? WHERE ID=?";
    private static final String GET_QUESTION_BY_ID = "SELECT * FROM Quiz WHERE ID=?";
    private static final String DELETE_QUESTION_BY_ID = "DELETE FROM Quiz WHERE ID=?";

    private JdbcTemplate jdbcTemplate;

    @Autowired(required = false)
    public QuizRepositoryJDBC(JdbcTemplate aTemplate) {
        jdbcTemplate = aTemplate;
    }

    @Override
    public List<AdminQuizDTO> getAllQuiz(String type) {//Get All quiz questions and answers.

        return jdbcTemplate.query(
                "select * from Quiz where type=?",
                new AdminQuizMapper(),
                new Object[]{type}
        );
    }

    @Override
    public List<QuizDTO> getQuestion(String type,String questionIndex) {//Get All quiz questions and answers.

        return jdbcTemplate.query(
                "select * from Quiz where type=? and questionIndex=?",
                new QuizMapper(),
                new Object[] {type,questionIndex}
        );
    }

    @Override
    public int getAnswer(int questionIndex, String answer) {
        int ans = jdbcTemplate.queryForObject(
                "select COUNT(*) from Quiz where questionIndex=? and correct=?",
                Integer.class,
                new Object[]{questionIndex, answer}
        );
        return ans;
    }

    @Override
    public void updateQuestionOrder(List<QuizDTO> questionList) {
        final String sql = "UPDATE Quiz SET questionIndex=? WHERE ID=?";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                QuizDTO question = questionList.get(i);
                ps.setInt(1,question.getquestionIndex());
                ps.setInt(2,question.getID());
            }
            @Override
            public int getBatchSize() {
                return questionList.size();
            }
        });
        return ;
    }

    @Override
    public List<AdminQuizDTO> getById(int id) {
        return jdbcTemplate.query(GET_QUESTION_BY_ID, new AdminQuizMapper(), id);
    }

    @Override
    public QuizDTO addQuestion(QuizDTO quizDTO) {
        jdbcTemplate.update(INSERT_QUESTION, quizDTO.getType(), quizDTO.getquestionIndex(), quizDTO.getChoiceNum(), quizDTO.getQuestion(), quizDTO.getChoiceA(),
                quizDTO.getChoiceB(), quizDTO.getChoiceC(), quizDTO.getChoiceD(), quizDTO.getCorrect(), quizDTO.getHint());
        return quizDTO;
    }

    @Override
    public QuizDTO updateQuestion(QuizDTO quizDTO) {
        jdbcTemplate.update(UPDATE_QUESTION, quizDTO.getType(), quizDTO.getquestionIndex(), quizDTO.getChoiceNum(),quizDTO.getQuestion(), quizDTO.getChoiceA(),
                quizDTO.getChoiceB(), quizDTO.getChoiceC(), quizDTO.getChoiceD(), quizDTO.getCorrect(), quizDTO.getHint(), quizDTO.getID());
        return quizDTO;
    }


    @Override
    public String deleteQuestion(int id) {
        jdbcTemplate.update(DELETE_QUESTION_BY_ID, id);
        return "Deleted question with id:" + id;
    }

}
